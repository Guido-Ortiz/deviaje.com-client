import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import Row from "./prebuild/Row";
import BillingDetails from "./prebuild/BillingDetails";
import SubmitButton from "./prebuild/SubmitButton";
import CheckoutError from "./prebuild/CheckoutError";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import s from './PaymentForm.module.css';
import visa from './assets/visa.png';
import master from './assets/master.jpg';
import american from './assets/american.png';
import discover from './assets/discover.png';
import diners from './assets/diners.png';
import jcb from './assets/jcb.png';
import union from './assets/union.png';
import { axiosWithOutToken } from '../../services/axios'
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { getPassengers, resetData } from "../../Redux/actions/actions";
import StepperHorizontal from '../Stepper/StepperHorizontal';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const PaymentForm = ({ price }) => {
  const history = useHistory()
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const handleCardDetailsChange = ev => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const passengersInfo = useSelector(state => state.passengersInfo)

  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value
      }
    };
    
    await axiosWithOutToken('/paymentForm', billingDetails, 'POST')
    setProcessing(true);

    const cardElement = elements.getElement("card");

    try {
      const { data: clientSecret } = await axios.post("http://localhost:4001/payment", {
        amount: price * 100
      });

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      if (paymentMethodReq.error) {
        setCheckoutError(paymentMethodReq.error.message);
        setProcessing(false);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id
      });

      if (error) {
        setCheckoutError(error.message);
        setProcessing(false);
        return;
      }    
      // await axiosWithOutToken('/passengersInfo', passengersInfo, 'POST')
      await swal({
        title: "Thank you!",
        text: "We have successfully processed your payment!",
        icon: "success",
        button: "Close",
      });

      history.push('/')
      dispatch(getPassengers(1))
      dispatch(resetData())
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  const iframeStyles = {
    base: {
      color: "grey",
      fontSize: "16px",
      iconColor: "grey",
      "::placeholder": {
        color: "grey"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <StepperHorizontal step={2}/>
      <form onSubmit={handleFormSubmit}>

        <div className={s.grid}>
          <div className={s.title}>Complete with the card information</div>
          <div>
            <Button onClick={handleOpen}>
              <CreditCardIcon />
              Check payment options
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Payment options
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <img src={visa} className={s.imagen} alt='imagen not found' />
                  <img src={master} className={s.imagen} alt='imagen not found' />
                  <img src={american} className={s.imagen} alt='imagen not found' />
                  <img src={discover} className={s.imagen} alt='imagen not found' />
                  <img src={diners} className={s.imagen} alt='imagen not found' />
                  <img src={jcb} className={s.imagen} alt='imagen not found' />
                  <img src={union} className={s.imagen} alt='imagen not found' />

                </Typography>
              </Box>
            </Modal>
          </div>
          <Row>
            <BillingDetails />
          </Row>

          <Row>
            <CardElementContainer>
              <CardElement
                options={cardElementOpts}
                onChange={handleCardDetailsChange}
              />
            </CardElementContainer>
          </Row>

          {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}

          <Row>
            <SubmitButton disabled={processing || !stripe}>
              {processing ? "Processing..." : `Pay $${price}`}
            </SubmitButton>
          </Row>
        </div>

      </form>
    </div>
  );
};

export default PaymentForm;

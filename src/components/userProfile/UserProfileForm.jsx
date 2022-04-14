import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import countries from './Countries';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { isNumberValid } from './Validations'
import { axiosWithOutToken } from '../../services/axios'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


const UserProfileForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [form, setForm] = useState({
    dni: '',
    age: new Date(),
    phone: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    genre: '',
    vaccinated: ''
  })
  //const dispatch = useDispatch();

  const [dniError, setDniError] = useState(false);
  const [dniErrorMsg, setDniErrorMsg] = useState('');
  const [value, setValue] = useState(new Date());
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');

  function handleChange(e) {
    if (e.target.value.length >= 0) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  function handleChangeDni(e) {
    if (e.target.value.length >= 0) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
      // VALIDACION DNI
      if (!isNumberValid(e.target.value)) {
        setDniError(true)
        setDniErrorMsg('Debe ser solo número')
      } else {
        setDniError(false)
        setDniErrorMsg('')
      }
    }
    else {
      setDniError(false)
      setDniErrorMsg('')
    }
  }

  function handleChangeAge(e) {
    if (e.target.value.length >= 0) {
      setForm({
        ...form,
        [e.target.name]: value
      })
    }
  }

  function handleChangePhone(e) {
    if (e.target.value.length >= 0) {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
      //VALIDACION PHONE
      if (!isNumberValid(e.target.value)) {
        setPhoneError(true)
        setPhoneErrorMsg('Debe ser solo número')
      } else {
        setPhoneError(false)
        setPhoneErrorMsg('')
      }
    } else {
      setPhoneError(false)
      setPhoneErrorMsg('')
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let {email} = user
    axiosWithOutToken('/updatepersonalinfo', form, email, 'POST')
      .then(res => {
        console.log(res.data)
        setForm({
          dni: '',
          age: new Date(),
          phone: '',
          country: '',
          state: '',
          city: '',
          zip: '',
          genre: '',
          vaccinated: ''

        });
        <Alert severity="success">Form created successufully</Alert>
      })
      .catch(err => {
        console.log(err.response)

      })

  }

  return (
    isAuthenticated && (
      <div>
        <CssBaseline />
        <Typography variant="h4" align='center' gutterBottom component="div" sx={{ m: 2 }}>
          PERSONAL INFO
        </Typography>

        <Container maxWidth="xl" align='center'>
          <FormControl>
            <Box component="form" sx={{ '& > :not(style)': { m: 1 }, display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', height: '70vh', width: '100vh' }} noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                  error={dniError}
                  helperText={dniErrorMsg}
                  InputLabelProps={{ shrink: true }}
                  id="standard-required"
                  label="DNI/Passport"
                  name='dni'
                  value={form.dni}
                  defaultValue=""
                  variant="standard"
                  color='success'
                  onChange={(e) => handleChangeDni(e)} />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Birthday"
                    value={value}
                    minDate={new Date('2017-01-01')}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} variant="standard"
                      sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                      name='age' onChange={(e) => handleChangeAge(e)} />}
                  />
                </LocalizationProvider>

              </div>

              <div>
                <TextField
                  required
                  sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                  error={phoneError}
                  helperText={phoneErrorMsg}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="standard-required"
                  label="Phone Number"
                  name='phone'
                  value={form.phone}
                  defaultValue=""
                  variant="standard"
                  color='success'
                  onChange={(e) => handleChangePhone(e)} />
              </div>

              <Autocomplete id="country-select-demo" sx={{ '& > :not(style)': { ml: 2 }, height: '25px', width: '320px' }} options={countries} autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`} alt="" />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    name={countries.label}
                    variant="standard" {...params}
                    label="Choose a country"
                    value={form.country}
                    inputProps={{ ...params.inputProps, autoComplete: 'new-password', }}
                    onChange={(e) => handleChange(e)} />
                )}
              />
              <div>
                <TextField
                  sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                  InputLabelProps={{ shrink: true }}
                  id="standard-required"
                  label="State"
                  name='state'
                  value={form.state}
                  defaultValue=""
                  variant="standard"
                  color='success'
                  onChange={(e) => handleChange(e)} />

              </div>

              <div>
                <TextField
                  sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                  InputLabelProps={{ shrink: true }}
                  id="standard-required"
                  label="City"
                  name='city'
                  value={form.city}
                  defaultValue=""
                  variant="standard"
                  color='success'
                  onChange={(e) => handleChange(e)} />
              </div>

              <div>
                <TextField
                  sx={{ '& > :not(style)': { m: 1, mr: 2 }, height: '25px', width: '350px' }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  id="standard"
                  label="Zip Code"
                  name='zip'
                  alue={form.zip}
                  defaultValue=""
                  variant="standard"
                  color='success'
                  onChange={(e) => handleChange(e)} />

              </div>
              <div style={{ "display": "flex", "marginLeft": "25px", "justifyContent": "space-between" }}>
                <div>
                  <FormControl onChange={(e) => handleChange(e)}>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"
                      color='success' row>
                      <FormControlLabel value="female" name='genre' control={<Radio />} label="Female" />
                      <FormControlLabel value="male" name='genre' control={<Radio />} label="Male" />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div>
                  <FormControl onChange={(e) => handleChange(e)}>
                    <FormLabel id="demo-radio-buttons-group-label">Vaccinated</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Yes"
                      color='success' row>
                      <FormControlLabel value="Yes" name='vaccinated' control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" name='vaccinated' control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <Box sx={{ '& button': { m: 3 } }}>
                <div style={{ "width": "450px", "position": "relative", "display": "flex", "justifyContent": "flex-end" }}>
                  <Button type='submit' size="medium" color="success" variant="contained"
                    endIcon={<SendIcon />} onClicke={(e) => handleSubmit(e)}>Submit</Button>
                </div>
              </Box>
            </Box>
          </FormControl>
        </Container>
      </div>
    )
  )
}


export default UserProfileForm;

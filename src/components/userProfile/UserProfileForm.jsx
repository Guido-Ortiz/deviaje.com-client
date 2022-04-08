import React, {useState} from 'react';
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
import {isNumberValid, isTwoNumberValid} from './Validations'
import {axiosWithOutToken} from '../../services/axios'



const UserProfileForm = () => {
const [form, setForm] = useState({
dni: '',
age: '',
phone: '',
country:'',
state: '',
city: '',
zip: '',
genre: '',
vaccinated: ''
})


const [dniError, setDniError] = useState(false);
const [dniErrorMsg, setDniErrorMsg] = useState('');
const [ageError, setAgeError] = useState(false);
const [ageErrorMsg, setAgeErrorMsg] = useState('');
const [phoneError, setPhoneError] = useState(false);
const [phoneErrorMsg, setPhoneErrorMsg] = useState('');

function handleChange(e) {
  if(e.target.value.length >= 0){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    // VALIDACION DNI
    if(!isNumberValid(e.target.value)){
      setDniError(true)
      setDniErrorMsg('Debe ser solo número')
    }else{
      setDniError(false)
      setDniErrorMsg('')
    }
    //VALIDACION EDAD
    if(!isNumberValid(e.target.value)){
      setAgeError(true)
      setAgeErrorMsg('Debe ser solo número')

    }else if(e.target.value < 18){
      setAgeError(true)
      setAgeErrorMsg('Debes ser mayor de edad')

    }else if(isTwoNumberValid(e.target.value)) {
      setAgeError(true)
      setAgeErrorMsg('La edad no puede tener mas de 2 digitos')
     
    }else{
      setAgeError(false)
      setAgeErrorMsg('')
    }
    //VALIDACION PHONE
    if(!isNumberValid(e.target.value)){
      setPhoneError(true)
      setPhoneErrorMsg('Debe ser solo número')
    }else{
    setPhoneError(false)
    setPhoneErrorMsg('')
    }
  }else{
    setDniError(false)
    setDniErrorMsg('')
  }

}


function handleSubmit(e){
  e.preventDefault();  
  axiosWithOutToken('/updatepersonalinfo', form, 'POST')
        .then(res => {
          console.log(res.data)
            setForm({
              dni: '',
              age: '',
              phone: '',
              country:'',
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
<div>

  <CssBaseline />
  <Typography variant="h4" align='center' gutterBottom component="div" sx={{m: 2}}>
    PERSONAL INFO
  </Typography>

  <Container maxWidth="xl" align='center'> 
    <FormControl>
    <Box component="form" sx={{ '& > :not(style)': { m: 1 }, display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)', height: '70vh', width: '100vh'}} noValidate autoComplete="off">  
    <div> 
      <TextField 
      required
      error={dniError} 
      helperText={dniErrorMsg}
      InputLabelProps={{ shrink: true }}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      id="standard-required" 
      label="DNI/Passport"
      name='dni' 
      value={form.dni} 
      defaultValue="" 
      variant="standard" 
      color='success' 
      onChange={(e) => handleChange(e)}/>
    </div>

    <div> 
      <TextField 
      required
      error={ageError} 
      helperText={ageErrorMsg}
      InputLabelProps={{ shrink: true }}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
      id="standard-required" 
      label="Age" 
      name='age' 
      value={form.age} 
      defaultValue="" 
      variant="standard" 
      color='success' 
      onChange={(e) => handleChange(e)}/>
    </div> 

    <div> 
      <TextField 
      required 
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
      onChange={(e) => handleChange(e)}/>
    </div>

    <Autocomplete id="country-select-demo" sx={{ m: 1, width: '25ch' }} options={countries} autoHighlight
      getOptionLabel={(option)=> option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`} alt="" />
          {option.label} ({option.code}) +{option.phone}
        </Box>
          )}
      renderInput={(params) => (
        <TextField 
          variant="standard" {...params} 
          label="Choose a country"
          value={form.country}
          inputProps={{...params.inputProps, autoComplete: 'new-password',}}
          onChange={(e)=> handleChange(e)}/>
          )}
            />      
    <div> 
      <TextField 
      InputLabelProps={{ shrink: true }} 
      id="standard-required" 
      label="State" 
      name='state' 
      value={form.state} 
      defaultValue="" 
      variant="standard" 
      color='success' 
      onChange={(e) => handleChange(e)}/>
      
    </div> 

    <div> 
      <TextField  
      InputLabelProps={{ shrink: true }}
      id="standard-required" 
      label="City" 
      name='city' 
      value={form.city} 
      defaultValue="" 
      variant="standard" 
      color='success' 
      onChange={(e) => handleChange(e)}/>
    </div> 

    <div> 
      <TextField 
      InputLabelProps={{ shrink: true }}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      id="standard" 
      label="Zip Code" 
      name='zip' 
      alue={form.zip} 
      defaultValue="" 
      variant="standard" 
      color='success' 
      onChange={(e) => handleChange(e)}/>
      
    </div> 
    <div> 
      <FormControl onChange={(e) => handleChange(e)}>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female"
            name="row-radio-buttons-group" color='success'row>
            <FormControlLabel value="female" name='genre' control={<Radio />} label="Female" />
            <FormControlLabel value="male" name='genre' control={<Radio />} label="Male" />
          </RadioGroup>
      </FormControl>
    </div> 

    <div>
      <FormControl onChange={(e) => handleChange(e)}>
        <FormLabel id="demo-radio-buttons-group-label">Vaccinated</FormLabel>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Yes" name="row-radio-buttons-group"
            color='success' row>
            <FormControlLabel value="Yes" name='vaccinated' control={<Radio />} label="Yes" />
            <FormControlLabel value="No" name='vaccinated' control={<Radio />} label="No" />
          </RadioGroup>
          </FormControl>
    </div>
         
    
    <Box sx={{ '& button': { m: 3 } }}>
    <div>     
        <Button type='submit' size="medium" color="success" variant="contained"
          endIcon={<SendIcon />} onChange={(e) => {handleSubmit(e)}}>Submit</Button>
      </div>
    </Box>
  </Box> 
    </FormControl>
  </Container>
</div>
)
}


export default UserProfileForm;

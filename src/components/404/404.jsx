import { useHistory } from 'react-router-dom'
import s from './styles.module.css'
import Button from '@mui/material/Button';

export default  function NoMatch(){

     const history = useHistory() 

     const handle = () => {
        history.push('/')
     }
     return(
      <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <h3 className={s.title2}>Sorry there is no route defined for what you are looking for!</h3>
      <Button size="small" variant="contained" style={{margin: '1rem'}} onClick={handle}>Back to Home</Button>
      </div>
     )
}
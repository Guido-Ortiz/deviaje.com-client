import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import s from './Landing.module.css';


function Landing() {
    
    return (
        <div className={s.fondo}>
            <h1 className={s.titulo}>Welcome to <span className={s.url}>deviaje.com</span></h1>
            <div className={s.flex}>
                <input type='text' placeholder='Enter departure city' className={s.input} />
                <input type='text' placeholder='Enter destination city' className={s.input} />
                <input type='date' placeholder="Date" className={s.date} />
                <input type='date' className={s.date} />
                <button className={s.btn}><SearchIcon />
                    Search</button>
            </div>
        </div>
    );
}

export default Landing;
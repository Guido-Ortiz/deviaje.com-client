import React, { useEffect } from "react";
import {useHistory} from 'react-router-dom'
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "./Nav.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";

//import axios from 'axios'

import { axiosWithOutToken } from '../../services/axios'

const Nav = () => {

  const history = useHistory();
  const { isAuthenticated, user, loginWithPopup, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  }

const handleForm = ()=> {
  history.push('/userconfig')
}

  const handleClickLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isAuthenticated) {
      axiosWithOutToken('/postUser', user, 'post')
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }, [user, isAuthenticated])


   return (
    <header className='header-container-general'>
      <div  style={{ borderBottom: '3px solid #d5e3e6' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems:'center',
            borderBottom:'1px, solid, black'
          }}
        >
          <div className='navbar-brand-box' style={{ background: '#FDFEFE' }}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <span className={styles.containerTitle}>
                <h2 className={styles.url}>deviaje.com</h2>
              </span>
            </Link> 
          </div>

          <div>
           <NavLink activeClassName={styles.active} className={styles.link} to='/home'>Home</NavLink>
            <NavLink activeClassName={styles.active} className={styles.link} to='/about'>About Us</NavLink>
            <NavLink activeClassName={styles.active} className={styles.link} to='/top'>Top Destinations</NavLink>
          </div>

          <div className={styles.containerButton}>

            {isAuthenticated ? (

              <div>
                <Button
                  id='basic-button'
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <img className={styles.imgLogin} src={user.picture} alt='UserPicture' />
                </Button>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button'
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleForm}>Settings</MenuItem>
                  <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button size="medium" variant='outlined' onClick={() => loginWithPopup()}>
                Log In / Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav

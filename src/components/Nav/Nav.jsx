import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styles from "./Nav.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

import axios from 'axios'
import { axiosWithOutToken } from '../../services/axios'

//axios.defaults.baseURL = 'http://localhost:3001/api'

const Nav = () => {
  const { isAuthenticated, user, loginWithPopup, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    logout();
  };

  let auth0User = async () => {
    const userpost = await axiosWithOutToken('/postUser', user, 'post')
    console.log(userpost.data)
    return userpost.data
  }

  return (
    <header className="header-container-general">
      <div
        className="navbar-header"
        style={{ borderBottom: "3px solid #d5e3e6" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "top",
          }}
        >
          <div className="navbar-brand-box" style={{ background: "#FDFEFE" }}>
            <Link to="/" style={{textDecoration: "none"}}>
              <span className={styles.containerTitle}>
                <h2 className={styles.url}>flyXworld</h2>
              </span>
            </Link>
          </div>

          <div className={styles.containerButton}>
            {isAuthenticated && auth0User() ? (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <img className={styles.imgLogin} src={user.picture} alt="" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button variant="outlined" onClick={() => loginWithPopup()}>
                Log In / Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

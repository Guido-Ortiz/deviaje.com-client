import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <header className="header-container-general">
      <div
        className="navbar-header"
        style={{ borderBottom: "3px solid #d5e3e6" }}
      >
        <div
          className={styles.headerContainer}
          //style={{display: 'flex', justifyContent:'space-between', alignItems:'top'}}
        >
          <div
            className={styles.navbarBrandBox}
            // style={{ background: "#FDFEFE" }}
          >
            <span className={styles.containerTitle}>
              <h2 className={styles.url}>deviaje.com</h2>
            </span>
          </div>
          <div className={styles.containerButton}>
            <button
              // color="none"
              type="button"
              // className="header-item noti-icon waves-effect"
              className={styles.headerBtn}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;

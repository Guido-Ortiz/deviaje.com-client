import {IoLogoWhatsapp} from 'react-icons/io'
import {BsFacebook} from 'react-icons/bs'
import {FaInstagramSquare} from 'react-icons/fa'
import s from './footer.module.css'


export function Footer(){
    return(
      <div className={s.container}>
        <div>
          <h2 style={{color:'#1F618D'}}>DeViaje.com</h2>
        </div>
         <div className={s.containerIcons}>
         <IoLogoWhatsapp className={s.iconsWhatapp}/>
          <BsFacebook className={s.iconsFace}/>
          <FaInstagramSquare className={s.icons}/>
         </div>
        <div className={s.containerText}>
        <div className={s.text}>
            <h4>Report abuse</h4>
             <p>If you believe that the website is violating your rights, file a compliant by filling out this form</p>
        </div>
         <div className={s.text}>
        <h4>How to contact our support</h4>
         <p>To find out more about the platform features, contact us via email deviaje@gmail.com.ar</p>
        </div>
        <div className={s.text}>
            <h4>Accounting docs</h4>
            <p>To get the supporting documentation and proof of payment, send your request to deviajepuntocom12@gmail.com</p>
        </div>
        </div>
        <div className={s.flex}>
          <p className={s.footerItem}>Terms & Conditions</p>
          <p className={s.footerItem}>Privacy Policy</p>
          <p className={s.footerItem}>Cookie Consent</p>
          <p>© 2022 DeViaje.com - All Rights Reserved.</p>
          
        </div>
      </div>
    )
}
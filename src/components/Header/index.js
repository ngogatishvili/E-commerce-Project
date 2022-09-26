import React from 'react'
import { Link } from 'react-router-dom'
import {signOut} from "firebase/auth"
import {auth } from '../../firebase/utils'

import logo from "../../assets/logo.jpg"
import "./styles.scss"

function Header(props) {
  const {currentUser}=props;
  return (
    <header className='header'>
        <div className="wrap">
          <Link to="/">
          <div className="logo">
                <img  src={logo} alt="EcommerceLogo"/>
            </div>
          </Link>
           
            <div className="links">
              {currentUser && (
                <ul>
                  <li><span onClick={()=>signOut(auth)}>LOGOUT</span></li>
                </ul>
              )}
              {!currentUser && (
                 <ul>
                 <li>
                   <Link to="/register">Register</Link>
                 </li>
                 <li>
                   <Link to="/login">Login</Link>
                 </li>
               </ul>
              ) }
             
            </div>
        </div>
    </header>
  )
}

Header.defaultProps={
  currentUser:null
}

export default Header;
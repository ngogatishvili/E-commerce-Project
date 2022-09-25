import React from 'react'
import { Link } from 'react-router-dom'

import logo from "../../assets/logo.jpg"
import "./styles.scss"

function Header() {
  return (
    <header className='header'>
        <div className="wrap">
          <Link to="/">
          <div className="logo">
                <img  src={logo} alt="EcommerceLogo"/>
            </div>
          </Link>
           
            <div className="links">
              <ul>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
        </div>
    </header>
  )
}

export default Header;
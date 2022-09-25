import React from 'react'
import logo from "../../assets/logo.jpg"
import "./styles.scss"

function Header() {
  return (
    <header className='header'>
        <div className="wrap">
            <div className="logo">
                <img  src={logo} alt="EcommerceLogo"/>
            </div>
        </div>
    </header>
  )
}

export default Header;
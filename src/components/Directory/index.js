import React from 'react'
import shopMen from "../../assets/shopMens.jpg";
import shopWomen from "../../assets/shopWomens.jpg";
import "./styles.scss"

const Directory = () => {
  return (
    <div className="directory">
        <div className="wrap">
        <div style={{backgroundImage:`url(${shopWomen})`}} className="item">
            <a href="/">Shop For Women</a>
        </div>
            <div style={{backgroundImage:`url(${shopMen})`}} className="item">
                <a href="/">Shop For Men</a>
            </div>
            
        </div>
    </div>
  )
}

export default Directory;
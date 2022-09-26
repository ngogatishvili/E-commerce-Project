import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


const HomeLayout = ({children,...props}) => {
  return (
    <div className="fullHeight">
          <Header {...props}/>
          {children}
          <Footer/>
    </div>
  )
}

export default HomeLayout
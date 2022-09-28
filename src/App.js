import React,{useEffect} from 'react'

import { Routes,Route,useNavigate } from "react-router-dom";
import {  onAuthStateChanged} from "firebase/auth"
import { handleUserProfile } from './firebase/utils';
import {connect} from "react-redux"


import { setCurrentUser } from './redux/User/user.action';

import "./default.scss"
// pages
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login";
import Recovery from './pages/Recovery';
// layouts
import MainLayout from "./layout/MainLayout"
import HomeLayout from "./layout/HomeLayout"
import { auth } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';






const App =({setCurrentUser})=>  {
  const pathname=window.location.pathname;
  const navigate=useNavigate();

  

  useEffect(()=>{
      const authListener=onAuthStateChanged(auth,userAuth=>{
          if(userAuth) {
            handleUserProfile(userAuth).then(userRef=>{
              onSnapshot(userRef,(doc)=>{
               setCurrentUser({id:doc.id,...doc.data()})
                  if(pathname==="/login"||pathname==="/register") {
                    navigate("/");
                  }
              })
            })
          }else{
            setCurrentUser(userAuth);
          }
      })

      return ()=>{
        authListener();
      }
  },[navigate,pathname])


    return (
      <div className="App">
          <Routes>
            <Route path="/" element={<HomeLayout><Home/></HomeLayout>}/>
            <Route path="/register" element={<MainLayout><Register/></MainLayout>}/>
            <Route path="/login" element={<MainLayout><Login /></MainLayout>}/>
            <Route path="/recovery" element={<MainLayout><Recovery/></MainLayout>}/>
          </Routes>
      </div>
    );
  
  
}

const mapStateToProps=({user})=>({
      currentUser:user.currentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);

import React,{useEffect,useState} from 'react'

import { Routes,Route,useNavigate } from "react-router-dom";
import {  onAuthStateChanged} from "firebase/auth"
import { handleUserProfile } from './firebase/utils';


import "./default.scss"
// pages
import Home from "./pages/Home";
import Register from "./pages/Register"
import Login from "./pages/Login";
// layouts
import MainLayout from "./layout/MainLayout"
import HomeLayout from "./layout/HomeLayout"
import { auth } from './firebase/utils';
import { onSnapshot } from 'firebase/firestore';






const App =()=>  {
  const pathname=window.location.pathname;
  const navigate=useNavigate();

  const [currentUser,setCurrentUser]=useState(null);
  

  useEffect(()=>{
      const authListener=onAuthStateChanged(auth,userAuth=>{
          if(userAuth) {
            handleUserProfile(userAuth).then(userRef=>{
              onSnapshot(userRef,(doc)=>{
                setCurrentUser({id:doc.id,...doc.data()})
                  if(pathname==="/login"||pathname==="/register") {
                    navigate("/")
                  }
              })
            })
          }else{
            setCurrentUser(null);
          }
      })

      return ()=>{
        authListener();
      }
  },[navigate,pathname])


    return (
      <div className="App">
          <Routes>
            <Route path="/" element={<HomeLayout currentUser={currentUser}><Home/></HomeLayout>}/>
            <Route path="/register" element={<MainLayout currentUser={currentUser}><Register/></MainLayout>}/>
            <Route path="/login" element={<MainLayout currentUser={currentUser}><Login /></MainLayout>}/>
          </Routes>
      </div>
    );
  
  
}

export default App;

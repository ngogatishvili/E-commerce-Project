import React,{ useState} from "react"
import {Navigate, useNavigate} from "react-router-dom"
import {sendPasswordResetEmail} from "firebase/auth"

import "./styles.scss"

import {auth} from "../../firebase/utils"


import AuthWrapper from "./../AuthWrapper"
import FormInput from "../../forms/FormInput"
import Button from "../../forms/Button"




const EmailPassword=()=> {
    const navigate=useNavigate();
    const [formFields,setFormFields]=useState({
        email:"",
        errors:new Set()
    });

   

    const handleChange=e=> {
        const {name,value}=e.target;
        setFormFields({
            ...formFields,[name]:value
        })
        
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const {email}=formFields;
        await sendPasswordResetEmail(auth,email,{
            url:"http://localhost:3000/login"
        }).then(()=>{
            navigate("/login");
        })
        .catch(()=>{
            setFormFields({
                ...formFields,
                errors:formFields.errors.add("Email not found,try again")
            })
        })
        
    }
    
       
        const configWrapper={
            headline:"Reset Password"
        }
        return (
            <AuthWrapper {...configWrapper}>
                <div className='formWrap'>
                    {Array.from(formFields.errors).length>0 && (
                        <ul>
                            {Array.from(formFields.errors).map((error,index)=>{
                                   return  <li key={index}>{error}</li>
                            })}
                        </ul>
                    )}
                    <form onSubmit={handleSubmit}>
                    <FormInput type="email" name="email" value={formFields.email} placeholder="Email" onChange={handleChange}/>
                    <Button type="submit">Reset Password</Button>
                    </form>
                </div>
            </AuthWrapper>
        )
    
}

export default EmailPassword;
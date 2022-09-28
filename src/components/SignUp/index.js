import React,{Component} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase/utils";


import Button from "../../forms/Button"
import FormInput from "../../forms/FormInput";
import AuthWrapper from "../AuthWrapper";

import {handleUserProfile} from "../../firebase/utils"

import { PASSWORDS_NOT_MATCH_VALIDATION,EMPTY_FIELD_VALIDATION } from "../../utils/constants";


const initialState={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:"",
    errors:new Set()
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            ...initialState
        }

        this.changeHandler=this.changeHandler.bind(this);
    }

    changeHandler(e) {
        const {name,value}=e.target;
        this.setState({
            [name]:value
        })
    }

    handleFormSubmit=async event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword}=this.state;

        // if(displayName.trim()===""||email.trim()===""||password.trim()==="") {
        //         this.setState({
        //             errors:this.state.errors.add(EMPTY_FIELD_VALIDATION)
        //         })

        //         if(password===confirmPassword&&password.trim()!==""&&confirmPassword.trim()!=="") {
        //             console.log("xo")
        //             this.setState({
        //                 errors:new Set(Array.from(this.state.errors).filter(error=>error!==PASSWORDS_NOT_MATCH_VALIDATION))
        //             },()=>{
        //                 console.log(this.state.errors)
        //             })

        //             return;
        //         }
        // }else{
        //     const newError=new Set(Array.from(this.state.errors).filter(error=>error!==EMPTY_FIELD_VALIDATION))
        //     this.setState({
                
        //         errors:newError
        //     })
        //     console.log("daje aqac")
        // }

        if(password!==confirmPassword) {
            this.setState({
                errors:this.state.errors.add(PASSWORDS_NOT_MATCH_VALIDATION)
            })
            return;
        }

        try {
        const {user}=await createUserWithEmailAndPassword(auth,email,password);
        await handleUserProfile(user,{displayName});
        this.setState({
            ...initialState
        })
        }catch(err) {
            this.setState({
                errors:this.state.errors.add(err.message)
            })
        }

    }
    render() {
     
        const {displayName,email,password,confirmPassword,errors}=this.state;
        const configurationWrapper={
            headline:"register"
        }
        return (
            <AuthWrapper {...configurationWrapper}>
                <div className="formWrap">
                {Array.from(errors).length>0 && (
                    <ul>
                       {Array.from(errors).map((error,index)=>(
                        <li className="error" key={index}>{error}</li>
                       ))}
                    </ul>
                )}
                <form onSubmit={this.handleFormSubmit}>
                <FormInput type="text" name="displayName" value={displayName} placeholder="Full Name" onChange={this.changeHandler}/>
                <FormInput type="email" name="email" value={email} placeholder="E-mail" onChange={this.changeHandler}/>
                <FormInput type="password" name="password" value={password} placeholder="Password" onChange={this.changeHandler}/>
                <FormInput type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" onChange={this.changeHandler}/>
                <Button type="submit">Register</Button>
                
                </form>
                </div>
                </AuthWrapper>
                
          
        )
    }
}

export default SignUp;
import React,{Component} from 'react'
import {Link} from "react-router-dom"
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from '../../firebase/utils'

import "./styles.scss"
import Button from '../../forms/Button'
import FormInput from "../../forms/FormInput";
import { SignInWithGoogle } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'



const initialState={
  email:"",
  password:"",
  errors:new Set()
}

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state={
      ...initialState
    }

    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(e) {
    const {name,value}=e.target;
    this.setState({
      [name]:value
    })
  }

  handleSubmit=async e=> {
    e.preventDefault();
    const {email,password}=this.state;
    if(email.trim()===""||password.trim()==="") {
      this.setState({
        errors:this.state.errors.add("Please add all the required fields")
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth,email,password);
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
    const {email,password,errors}=this.state;
    const configuraionWrapper={
      headline:"login"
    }
    return (
        <AuthWrapper {...configuraionWrapper}>
              <div className="formWrap">
                {Array.from(this.state.errors).length>0 &&
                  <ul>
                    {(
                    Array.from(this.state.errors).map((error,index)=>(
                        <li className="error" key={index}>{error}</li>
                    ))
                  )}
                  </ul> }
                <form onSubmit={this.handleSubmit}>
                  <FormInput type="email" name="email" value={email} placeholder="E-mail" onChange={this.handleChange}/>
                  <FormInput type="password" name="password" value={password} placeholder="password" onChange={this.handleChange}/>
                  <Button type="submit">login</Button>
                  <div className="social-btn">
                    <div className="row">
                      <Button type="button" onClick={SignInWithGoogle}>Sign in With Google</Button>
                    </div>
                  </div>

                  <div className="link">
                    <Link to="/recovery">Reset Password</Link>
                  </div>
                  
                </form>
              </div>
              </AuthWrapper>
          
    )
  }
  
}

export default SignIn;
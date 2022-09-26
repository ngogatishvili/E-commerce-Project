import React,{Component} from 'react'
import "./styles.scss"
import Button from '../../forms/Button'
import { SignInWithGoogle } from '../../firebase/utils'

class SignIn extends Component {
  handleSubmit=async e=> {
    e.preventDefault();
  }
  render() {
    return (
      <div className="signin">
          <div className="wrap">
            <h2>Login</h2>
              <div className="formWrap">
                <form onSubmit={this.handleSubmit}>
                  <div className="social-btn">
                    <div className="row">
                      <Button onClick={SignInWithGoogle}>Sign in With Google</Button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
      </div>
    )
  }
  
}

export default SignIn;
import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth,provider } from './firebase';
import { useStateValue} from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{ user }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(res => {
              dispatch({
                    type: actionTypes.SET_USER,
                    user: res.user
                })
            })
            .catch(err => alert(err.mesage));
    };
    
    return (
        <div className="login">
            <div className="cont">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" alt=""/>
                <div className="text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login

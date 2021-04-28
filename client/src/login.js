import * as React from 'react';
import { loginToken } from './api';

import { useForm } from "react-hook-form";

const Login = ({ setToken }) => {

    const { register, handleSubmit } = useForm();
    const API_URL = process.env.REACT_APP_APIURL; 

    const  onSubmit = async (data) => {
       
        
        const created =  await loginToken(API_URL,data);
        
        console.log(created); 
        
        setToken(created);
       
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <div className="login-wrapper">
          <h1>Please Log In</h1>
         
            <label>
              <p>Username</p>
              <input {...register("UserName")} type="text" />
            </label>
            <label>
              <p>Password</p>
              <input {...register("Password")} type="password" />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
         
        </div>
        </form>
      )
}

export default Login;
import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });


const handleChange = e => {
  e.preventDefault();
  setCredentials({   
      ...credentials,
      [e.target.name] : e.target.value    
  })
};

const login = e => {
  e.preventDefault();
  axiosWithAuth()
  .post('/login', credentials)
  .then(res => {
    localStorage.setItem('token', res.data.payload);
    props.history.push('/BubblePage')
  })
  .catch(err => console.log('Login Error', err))
}

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={login}>
        <label>User Name</label>
        <input 
        type="text"
        name="username"
        placeholder="username"
        value={credentials.username}
        onChange={handleChange}
        />
        <label>Password</label>
        <input 
        type="password"
        name="password"
        placeholder="password"
        value={credentials.password}
        onChange={handleChange}
        />
        <button>Log In</button>
      </form>
      
    </div>
  );
};

export default Login;

 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
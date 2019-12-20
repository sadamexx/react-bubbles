import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setData({
      ...data, [e.target.name] : e.target.value
    });
    console.log(data);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', data)
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubble-page')        
      })
      .catch(err => console.log('Login Error', err));    
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please login below</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
          />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          />  

        <button type="submit">Submit</button>  
      </form>
    </>
  );
};

export default Login;

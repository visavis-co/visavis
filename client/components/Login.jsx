import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Login = props => {
  return (
    <div>
      <input type='email' onChange={props.enterEmail} placeholder='Email'/><br />
      <input type='password' onChange={props.enterPassword} placeholder='Password'/><br />
      <button onClick={() => props.userLogin(props.email, props.password)}>Log in</button>
      OR
      <div className='gitButton'>
        <a href='/auth/github' className='btn btn-block btn-social btn-github'>
          <span className='github' />
          Sign in with Github
        </a>
      </div>
    </div>
  );
};
export default Login;
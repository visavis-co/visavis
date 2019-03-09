import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// login with email & pw
// if a user goes to "/", that will check if user is authenticated and redirect here if not

const Login = props => {
  return (
    <div>
      <input />
      Enter your email <br />
      OR
      <button onClick={props.logIn}>Log in</button>
      <div>
        <a href="/auth/github" className="btn btn-block btn-social btn-github">
          <span className="github" />
          Sign in with Github
        </a>
      </div>
    </div>
  );
};
export default Login;
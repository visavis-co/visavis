import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Login = props => {
  return (
    <div>
      <input onChange={props.enterEmail} />
      Enter your email <br />
      <input onChange={props.enterPassword} />
      Enter your password <br />
      <button onClick={() => props.userLogin(props.email, props.password)}>Log in</button>
      OR
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
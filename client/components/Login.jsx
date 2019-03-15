import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';

const Login = props => {
  if (props.isLoggedIn === true) {
    return <Redirect to='/' />
  }

  return (
    <div className='formLogin'>
      <img src='./../client/assets/visavis.jpg' width='250'></img>
      <Form id='login-form'>
        <Form.Group controlId='formEmail'>
          <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control type='password' placeholder='Password' onChange={props.enterPassword} />
          <p style={{color: 'red', textAlign: 'center'}} id="login-error-msg">{props.loginError}</p>
        </Form.Group>
        <div id='login-buttons'>
          <Button id='login-button' variant='secondary' type='submit' className='btnLogin' onClick={(e) => {e.preventDefault(); props.userLogin(props.email, props.password)}}>Log in</Button>
          <a id='login-github' href="https://github.com/login/oauth/authorize?client_id=ce5a1d21ebdafdc7ed4b&redirect_uri=http://localhost:8080/oauth" className="btn btn-block btn-social btn-github"><FontAwesomeIcon className='picGithub' size="2x" icon={['fab', 'github']} /> Sign in with Github </a>
          <hr/>
          <Link to="/signup" className="linkButton"><Button id='create-account' variant='secondary'>Create an account</Button></Link>
        </div>
      </Form>
    </div>
  );
};
export default Login;

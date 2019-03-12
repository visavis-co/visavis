import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Login = props => {
  return (
    <div className='formLogin'>
      <img src='./../client/assets/visavis.jpg' width='250'></img>
      <Form id='login-form'>
        <Form.Group controlId='formEmail'>
          <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail} />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Control type='password' placeholder='Password' onChange={props.enterPassword} />
        </Form.Group>
        <div id='login-buttons'>
          <Button id='login-button' variant='primary' type='submit' className='btnLogin' onClick={(e) => {e.preventDefault(); props.userLogin(props.email, props.password)}}>Log in</Button>
          <a id='login-github' href="https://github.com/login/oauth/authorize?client_id=ce5a1d21ebdafdc7ed4b&redirect_uri=http://localhost:8080/oauth" className="btn btn-block btn-social btn-github"><FontAwesomeIcon className='picGithub' size="2x" icon={['fab', 'github']} /> Sign in with Github </a>
          <Button id='create-account' variant='primary' href="/signup">Create an account</Button>
        </div>
      </Form>
    </div>
  );
};
export default Login;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = props => {
  return (
    <div className='form'>
    <Form>
      <Form.Group controlId='formEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placholder='Enter email' onChange={props.enterEmail}/>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placholder='Password' onChange={props.enterPassword}/>
      </Form.Group>
      <div>
      <Button  variant='primary' type='submit' className='btnLogin'
        onClick={(e) => {e.preventDefault(); props.userLogin(props.email, props.password)}}>Log in</Button> 
      </div>
      <a href="/auth/github" className="btn btn-block btn-social btn-github">
        <FontAwesomeIcon className='picGithub' size="2x" icon={['fab', 'github']} />
          Sign in with Github
      </a>
    </Form>
    </div>
  );
};
export default Login;
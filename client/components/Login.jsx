import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

      <Link to='/match'>Testing: MATCH DETAILS</Link>
const Login = props => {
  return (
    <div className='formLogin'>
    <Form>
      <Form.Group controlId='formEmail'>
        <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail}/>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Control type='password' placeholder='Password' onChange={props.enterPassword}/>
      </Form.Group>
      <div>
      <Button  variant='primary' type='submit' className='btnLogin'
        onClick={(e) => {e.preventDefault(); props.userLogin(props.email, props.password)}}>Log in</Button> 
      </div>
      <a href="/auth/github" className="btn btn-block btn-social btn-github">
        <FontAwesomeIcon className='picGithub' size="2x" icon={['fab', 'github']} />
          Sign in with Github
      </a>
      <Link to='/signup'>Sign up</Link>
    </Form>
    </div>
  );
};
export default Login;
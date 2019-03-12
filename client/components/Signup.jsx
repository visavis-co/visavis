import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// this page will be linked to '/login' if user has not yet created a username

const Home = (props) => {
  return (
    <div className="formLogin">
    <img src='./../client/assets/visavis.jpg' width='250'></img>
      <Form id='login-form'>
      <Form.Group controlId='formFullName'>
        <Form.Control type='text' placeholder='Enter full name' onChange={props.enterFullName}/>
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail}/>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Control type='password' placeholder='Password' onChange={props.enterPassword}/>
      </Form.Group>
        <Button id='login-button' variant='primary' type='submit' className='btnLogin'
        onClick={(e) => {e.preventDefault();
        props.userSignup(props.fullName, props.email, props.password)}}>Sign up</Button><br/><br/>
        <hr />
        <Link to="/login" className="linkButton"><Button id='create-account' variant='primary'>Back to Login</Button></Link>
    </Form>
    </div>
  );
}

export default Home;
import React from 'react';
import {Form, Button} from 'react-bootstrap';

// this page will be linked to '/login' if user has not yet created a username

const Home = (props) => {
  return (
    <div className="formSignup">
    <Form>
      <Form.Group controlId='formFullName'>
        <Form.Control type='text' placeholder='Enter full name' onChange={props.enterFullName}/>
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail}/>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Control type='password' placeholder='Password' onChange={props.enterPassword}/>
      </Form.Group>
      <Button  variant='primary' type='submit' className='btnLogin'
        onClick={(e) => {e.preventDefault(); 
        props.userSignup(props.fullName, props.email, props.password)}}>Sign up</Button> 
    </Form>
    </div>
  );
}

export default Home;
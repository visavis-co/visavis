import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// this page will be linked to '/login' if user has not yet created a username

const Home = (props) => {
  const [error, setError] = useState('');
  
  function handleSignUp(e) {
    e.preventDefault();
    // testing for valid email address below
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(props.email)) {
      setError('');
      props.userSignup(props.fullName, props.email, props.password);
    } else {
      setError('Invalid Email Address');
    }
  }

  return (
    <div className="formLogin">
    <img src='./../client/assets/visavis.jpg' width='250'></img>
      <Form id='login-form'>
      <Form.Group controlId='formFullName'>
        <Form.Control type='text' placeholder='Enter first name' onChange={props.enterFullName}/>
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Control type='email' placeholder='Enter email' onChange={props.enterEmail}/>
        <p style={{color: 'red'}}>{error}</p>
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Control type='password' placeholder='Password' onChange={props.enterPassword}/>
        <p style={{color: 'red', textAlign: 'center'}}>{props.signupError}</p>
      </Form.Group>
        <Button id='login-button' variant='primary' type='submit' className='btnLogin'
        onClick={handleSignUp}>Sign up</Button><br/><br/>
        <hr />
        <Link to="/login" className="linkButton"><Button id='create-account' variant='primary'>Back to Login</Button></Link>
    </Form>
    </div>
  );
}

export default Home;
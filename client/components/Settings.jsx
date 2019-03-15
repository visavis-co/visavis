import React, { Component } from 'react';
import {Nav, ListGroup, InputGroup, Col, Row, FormControl, Tab, Button, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { enterEmail } from '../actions/actions';
import SettingsTableau from './SettingsTableau.jsx';


const Settings = props => {
  let alert;
  let message;
  const successMessage = props.successMessage
  const fullName = props.fullName;
  const password = props.password;
  const email = props.email;
  const userLogout = props.userLogout;
  const userInfo = props.userInfo;
  const changeName = props.changeName;
  const changeEmail = props.changeEmail;
  const enterFullName = props.enterFullName;
  const imageUrl = props.imageUrl;
  const handleSelectedFile = props.handleSelectedFile;
  const handleUpload = props.handleUpload;
  const enterEmail = props.enterEmail;
  const enterPassword = props.enterPassword;
  const enterPasswordOld = props.enterPasswordOld;
  const changePassword = props.changePassword;
  const passwordOld = props.passwordOld;
  const serverResponse = props.serverResponse

  function provideAlertMessage(){
    if (serverResponse) return "Success!"
    if (!serverResponse) return "Could not update your information"
  }

  function provideAlertColor(){
    if (serverResponse) return "success"
    if (!serverResponse) return "danger"
  }

  return ( successMessage ? 
      <div className="settings-container">
        <SettingsTableau fullName={fullName} email={email} password={password} userInfo={userInfo}
         userLogout={userLogout} changeName={changeName} enterFullName={enterFullName}
         enterEmail={enterEmail} changeEmail={changeEmail} handleSelectedFile={handleSelectedFile}
         handleUpload={handleUpload} passwordOld={passwordOld} enterPassword={enterPassword} 
         enterPasswordOld={enterPasswordOld} changePassword={changePassword} />  
        
        <Alert variant = {provideAlertColor()}>
          {provideAlertMessage()}
        </Alert>
      </div>
      
    : <div className="settings-container"> <SettingsTableau fullName={fullName} email={email} password={password} userInfo={userInfo}
      userLogout={userLogout} changeName={changeName} enterFullName={enterFullName}
      enterEmail={enterEmail} changeEmail={changeEmail} handleSelectedFile={handleSelectedFile}
      handleUpload={handleUpload} passwordOld={passwordOld} enterPassword={enterPassword} 
      enterPasswordOld={enterPasswordOld} changePassword={changePassword} /></div>
      
)


}




export default Settings
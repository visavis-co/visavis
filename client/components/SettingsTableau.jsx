import React, { Component } from 'react';
import {Nav, ListGroup, InputGroup, Col, Row, FormControl, Tab, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { enterEmail } from '../actions/actions';

const SettingsTableau = props => {


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
  const successMessage = props.successMessage

  
  return (
    <div>    
      <div className="centerElements">

      </div>

    <Tab.Container id="left-tabs" defaultActiveKey="first">
    <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">Change Name</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Change Email</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Change Password</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Add Photo</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>

          <Tab.Pane eventKey="first" className="pane">
          <div className={'inline'}>
            <InputGroup size="md">
              <InputGroup.Prepend>
                <InputGroup.Text  id="inputGroup-sizing-lg">New Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter New Name" onChange={enterFullName} aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>
             {/* button */}
             <Button className="left-side-button" onClick={e => {
               e.preventDefault(); changeName(userInfo, fullName)}} variant="secondary">Update</Button>
             </div>
          </Tab.Pane>

          <Tab.Pane eventKey="second" className="pane"> 
          <div className={'inline'}>
          <InputGroup size="md">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">New Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={enterEmail} aria-label="Enter New Email" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>
             {/* Button */}
             <Button onClick={e => {e.preventDefault(); console.log('1', 'clicked button also userInfo -> ', userInfo) ; changeEmail(userInfo, email)}} className="left-side-button" variant="secondary">Update</Button>
          </div>
          </Tab.Pane>
          <div className={"password-container"}>
          <Tab.Pane eventKey="third" className="pane">
          {/* password pane takes two inputs old and new password */}
          
          <InputGroup size="md" className="text-field-100">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Old Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={enterPasswordOld} aria-label="Enter Old Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>
             <div className={'inline'}>
             <InputGroup className="text-field-100" size="md">
              <InputGroup.Prepend>
                <InputGroup.Text   id="inputGroup-sizing-lg">New Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={enterPassword} aria-label="Enter New Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>
             {/* button  */}
             <Button onClick={e => {e.preventDefault(); changePassword(userInfo, password, passwordOld)}} className="left-side-button" variant="secondary">Update</Button>
          </div>
          </Tab.Pane>
          </div>
          <Tab.Pane eventKey="fourth" className="pane">
          {/* password pane takes two inputs old and new password */}
       
              <form formEncType="multipart/form-data">
              <div>
                <input className="photo-input" type="file" id="profilePic" name="profilePic" onChange={handleSelectedFile}/>
                <Button className="left-side-button" onClick={e => {e.preventDefault(); handleUpload(props.userInfo);}} variant="secondary">Upload</Button>
                <div>
                  
                </div>
              </div>           
              </form>
          </Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
    </Tab.Container>

    </div>




  )
}

export default SettingsTableau
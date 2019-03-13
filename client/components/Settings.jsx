import React, { Component } from 'react';
import {Nav, ListGroup, InputGroup, Col, Row, FormControl, Tab, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Header from  '../Components/Header.jsx'


const Settings = props => {

  const fullName = props.fullName;
  const password = props.password;
  const email = props.eamil;
  const userLogout = props.userLogout;
  const userInfo = props.userInfo;
  const changeName = props.changeName;
  const enterFullName = props.enterFullName;
  


  return (
    <div> 
      <Header userInfo={props.userInfo} userLogout={props.userLogout} />
    

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
          <Tab.Pane eventKey="first">
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
          <Tab.Pane eventKey="second">
          <div className={'inline'}>
          <InputGroup size="md">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">New Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter New Email" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>  
             {/* Button */}
             <Button className="left-side-button" variant="secondary">Update</Button>   
          </div>  
          </Tab.Pane>
          <Tab.Pane eventKey="third">
          {/* password pane takes two inputs old and new password */}
          <InputGroup size="md" className="text-field-100">
              <InputGroup.Prepend>
                <InputGroup.Text  id="inputGroup-sizing-lg">Old Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter Old Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup> 
             <div className={'inline'}>
             <InputGroup className="text-field-100" size="md">
              <InputGroup.Prepend>
                <InputGroup.Text  id="inputGroup-sizing-lg">New Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter New Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>  
             {/* button  */}
             <Button className="left-side-button" variant="secondary">Update</Button>   
          </div>
          </Tab.Pane>
          <Tab.Pane eventKey="fourth">
          {/* password pane takes two inputs old and new password */}
          <InputGroup size="md" className="text-field-100">
              <InputGroup.Prepend>
                <InputGroup.Text  id="inputGroup-sizing-lg">Old Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter Old Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup> 
             <div className={'inline'}>
             <InputGroup className="text-field-100" size="md">
              <InputGroup.Prepend>
                <InputGroup.Text  id="inputGroup-sizing-lg">New Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Enter New Password" aria-describedby="inputGroup-sizing-sm" />
             </InputGroup>  
             {/* button  */}
             <Button className="left-side-button" variant="secondary">Update</Button>   
          </div>
          </Tab.Pane>


        </Tab.Content>
      </Col>
    </Row>
    </Tab.Container>;
    
    </div>  




  )
}

export default Settings
import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';



import "./LandingPage.scss";

class LandingPage extends React.Component {


  render() {
    return (
        <div className="LandingPage PageComp">

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer class="reg-con">
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    Sign up right now!
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                    veniam sapien te, fugiat! Commodi sequi non animi ea dolor
                    molestiae, quisquam iste, maiores. Nulla.
                  </h6>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Register:
                        </h3>
                        <hr className="hr-light" />
                        
                        <AvForm className="user-form col" onValidSubmit={this.handleSubmit}>
                        <h1 className="col">Register!</h1>
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="emailInput">Email</Label>
                                <AvInput
                                name="emailInput"
                                id="emailInput"
                                type="email"
                                required/>
                                <AvFeedback>Please enter a valid email!</AvFeedback>
                            </AvGroup>
        
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="pwInput">Password</Label>
                                <AvInput name="pwInput" id="pwInput" type="password" required />
        
                                <Label className="form-label fg" for="pwValidationInput">Re-Enter Password</Label>
                                <AvInput name="pwValidationInput" id="pwValidationInput" type="password" validate={{match:{value:'pwInput'}}} />
                                <AvFeedback>Passwords Don't match!</AvFeedback>
                            </AvGroup>
        
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="userNameInput">User Name</Label>
                                <AvInput name="userNameInput" id="userNameInput" type="text" minLength={5} maxLength={20} required/>
                                <AvFeedback>Please enter a user name! (Between 5-20 characters)</AvFeedback>
                            </AvGroup>
        
                            <FormGroup className="col email-fg fg">
                                <Button>Submit</Button>
                                <br />
                                <br />
                                <Button onClick={this.gmailLoginClickEvent}>Login With Google</Button>
                            </FormGroup>
                        </AvForm>


                        <div className="text-center mt-4">
                          <MDBBtn color="indigo">Sign Up</MDBBtn>
                          <hr className="hr-light" />
                          <div className="text-center d-flex justify-content-center white-label">
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab
                                icon="twitter"
                                className="white-text"
                              />
                            </a>
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab
                                icon="linkedin"
                                className="white-text"
                              />
                            </a>
                            <a href="#!" className="p-2 m-2">
                              <MDBIcon
                                fab
                                icon="instagram"
                                className="white-text"
                              />
                            </a>
                          </div>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
        </div>
    );
  }
}

export default LandingPage;

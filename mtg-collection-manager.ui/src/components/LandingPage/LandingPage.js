import React from "react";
import {
  //MDBNavbar,
  //MDBNavbarBrand,
  //MDBNavbarNav,
  //MDBNavItem,
  MDBNavLink,
  //MDBNavbarToggler,
  //MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  //MDBIcon,
  //MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  //MDBInput,
  //MDBFormInline,
  MDBAnimation
} from "mdbreact";
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';
import Auth from '../../auth/auth';



//import "./LandingPage.scss";

class LandingPage extends React.Component {
  handleSubmit(event, values) {
    const userInfoToSend = {
        userName: values.userNameInput,
        email: values.emailInput,
        password: values.pwInput,
    }

    Auth.registerUser(userInfoToSend);
}

gmailLoginClickEvent = (e) => {
    e.preventDefault();
    Auth.loginWithGmail()
        .then(() => this.props.history.push('/home'))
        .catch(error => console.error('there was an error in registering', error));
};

  render() {
    return (
        <div className="LandingPage comp page">

        <MDBView className="MDB-view">
          <MDBMask className="d-flex justify-content-center align-items-center sing-up-con">
            <MDBContainer className="reg-view">
              <MDBRow>
              {
                /*
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
                */
    }

                <MDBCol md="6" xl="5" className="mb-4 sign-up-con">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h1 className="landing-header">
                          Welcome To Deckord
                        </h1>
                        
                        <AvForm className="user-form sign-up-con" onValidSubmit={this.handleSubmit}>
                        <h4 className="landing-header">Register Here</h4>
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="emailInput">Email</Label>
                                <AvInput
                                className="input-link"
                                name="emailInput"
                                id="emailInput"
                                type="email"
                                required/>
                                <AvFeedback>Please enter a valid email!</AvFeedback>
                            </AvGroup>
        
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="pwInput">Password</Label>
                                <AvInput name="pwInput" id="pwInput" type="password" className="input-link" required />
        
                                <Label className="form-label fg" for="pwValidationInput">Re-Enter Password</Label>
                                <AvInput className="input-link" name="pwValidationInput" id="pwValidationInput" type="password" validate={{match:{value:'pwInput'}}} />
                                <AvFeedback>Passwords Don't match!</AvFeedback>
                            </AvGroup>
        
                            <AvGroup className="col email-fg fg">
                                <Label className="form-label" for="userNameInput">User Name</Label>
                                <AvInput className="input-link" name="userNameInput" id="userNameInput" type="text" minLength={5} maxLength={20} required/>
                                <AvFeedback>Please enter a user name! (Between 5-20 characters)</AvFeedback>
                            </AvGroup>
        
                            <FormGroup className="col email-fg fg">
                                <Button className="landing-submit-btn external-link">Submit</Button>
                            </FormGroup>
                        </AvForm>
                        <div className="user-sign-in-landing">
                        <h5>Already A User?</h5>
                        <Button className="external-link"><MDBNavLink to={'./login'}>Sign In</MDBNavLink></Button>
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

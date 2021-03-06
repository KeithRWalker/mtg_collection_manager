import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';
//import { NavLink } from 'react-router-dom';

import Auth from '../../auth/auth';

import './Login.scss';

class Login extends React.Component {

    handleSubmit(e, values) {
        const userInfoToSend = {
            email: values.emailInput,
            password: values.pwInput,
        }
        Auth.loginUser(userInfoToSend);
    }

    gmailLoginClickEvent = (e) => {
        Auth.loginWithGmail()
            .then(() => this.props.history.push('/home'))
            .catch(error => console.error('there was an error in registering', error));
    };

    render() {
        return(
            <div className="Login page comp">
              <div className="PageCon">
                <AvForm className="user-form col" onValidSubmit={this.handleSubmit}>
                <h1 className="col">Login</h1>
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
                    </AvGroup>

                    <FormGroup className="col email-fg fg">
                        <Button className="external-link">Submit</Button>
                            <br />
                            <br />
                    </FormGroup>
                </AvForm>

                </div>
            </div>
        );
    }
}

export default Login;
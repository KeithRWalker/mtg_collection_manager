import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';


import Auth from '../../auth/auth';

import './RegisterUser.scss';

class RegisterUser extends React.Component {

    handleSubmit(event, values) {
        console.log(values);
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
            <div className="RegisterUser">
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
            </div>
        );
    }
}

export default RegisterUser;
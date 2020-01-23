import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, FormGroup } from 'reactstrap';

import './RegisterUser.scss';

const defaultUser = {
    email: '',
    password: '',
    'passwordValidate': '',
    userName: '',
    'firstNme': '',
    'lastName': '',
    'city': '',
    'state': '',
};

class RegisterUser extends React.Component {
    state = {
        userInfo: defaultUser,
    }

    handleSubmit(e) {

    }

    emailUpdate = (e) => {
    }

    render() {

        return (
            <div className="RegisterUser">
                <AvForm className="user-form col" onSubmit={this.handleSubmit}>
                <h1 className="col">Register!</h1>
                    <AvGroup className="col email-fg fg">
                        <Label className="form-label" for="email">Email</Label>
                        <AvInput name="email" id="email" type="email" required/>
                        <AvFeedback>Please enter a valid email!</AvFeedback>
                    </AvGroup>

                    <AvGroup className="col email-fg fg">
                        <Label className="form-label" for="pw">Password</Label>
                        <AvInput name="pw" id="pw" type="password" required />

                        <Label className="form-label fg" for="pwVal">Re-Enter Password</Label>
                        <AvInput name="pwVal" id="pwVal" type="password" validate={{match:{value:'pw'}}} />
                        <AvFeedback>Passwords Don't match!</AvFeedback>
                    </AvGroup>

                    <AvGroup className="col email-fg fg">
                        <Label className="form-label" for="userName">User Name</Label>
                        <AvInput name="userName" id="userName" type="text" minLength={5} maxLength={20} required/>
                        <AvFeedback>Please enter a user name! (Between 5-20 characters)</AvFeedback>
                    </AvGroup>

                    <FormGroup className="col email-fg fg">
                        <Button>Submit</Button>
                    </FormGroup>
                </AvForm>
            </div>
        );
    }
}

export default RegisterUser;
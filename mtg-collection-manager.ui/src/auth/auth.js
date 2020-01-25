import firebase from 'firebase';
import 'firebase/auth';
import axios from 'axios';
import { createConfigItem } from '@babel/core';
import connectionInfo from './connectionInfo.js';

const baseUrl = 'https://localhost:44392/api';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
    const token = sessionStorage.getItem('token');

    if (token != null) {
            request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, function (err) {
    return Promise.reject(err);
});

const registerUser = (user) => {

    //sub out whatever auth method firebase provides that you want to use.
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(cred => {
    
        //get email from firebase
        let userInfo = {email: cred.user.email};

        //get token from firebase
        cred.user.getIdToken()
            //save the token to the session storage
            .then(token => sessionStorage.setItem('token',token))

            //save the user to the the api
            //.then(() => axios.post(`${baseUrl}/users`, userInfo));
    });
};

const loginUser = (user) => {
    //sub out whatever auth method firebase provides that you want to use.
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
        //get token from firebase
        cred.user.getIdToken()
                //save the token to the session storage
            .then(token => sessionStorage.setItem('token',token));
    });
};

const loginWithGmail = () => {
    //sub out whatever auth method firebase provides that you want to use.
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(cred => {
        //get token from firebase
        cred.user.getIdToken()
            //save the token to the session storage
        .then((token) => {
            sessionStorage.setItem('token',token)
            const fbUserInfo = firebase.auth().currentUser;
            const name = fbUserInfo.displayName.split(" ");

            const userInfoForDb = {
                email: fbUserInfo.email,
                firstName: name[0],
                lastName: name[1]
            }

        });
    });

    
};

const logoutUser = () => {
    return firebase.auth().signOut();
};

const getUid = () => {
    return firebase.auth().currentUser.uid;
};

export default {
    getUid,
    loginUser,
    loginWithGmail,
    logoutUser,
    registerUser
};

import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';

const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
};

const firebaseLogin = () => {
    const user = firebase.auth().currentUser;
}

const getAuth = () => {
    return firebase.auth();
};

const githubOAuth = () => {
    return firebase.auth().GithubAuthProvider();
};

const twitterOAuth = () => {
    return firebase.auth().TwitterAuthProvider();
};

const facebookOAuth = () => {
    return firebase.auth().FacebookAuthProvider();
};

export default { 
    firebaseInit,
    getAuth,
    githubOAuth,
    twitterOAuth,
    facebookOAuth,
};
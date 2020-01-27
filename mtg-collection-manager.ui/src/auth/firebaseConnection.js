import firebase from 'firebase/app';
import connectionInfo from './connectionInfo.js';

const firebaseConfig = connectionInfo.firebaseConfig;

const firebaseApp = () => {
    firebase.initializeApp(firebaseConfig);
};

export default firebaseApp;
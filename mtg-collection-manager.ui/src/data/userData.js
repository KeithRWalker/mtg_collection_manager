import Axios from 'axios';

const sendNewUserData = userData => Axios.post(userData);

export default sendNewUserData;
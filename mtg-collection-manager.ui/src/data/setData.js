import Axios from 'axios';
const baseUrl = 'https://localhost:44306/api/set';

const getSetNames = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/names`)
  .then((resp => {
    const response = resp.data;
    resolve(response);
  })).catch(err => reject("error in symbolData.js/getSetNames()", err));
})

export default { getSetNames };
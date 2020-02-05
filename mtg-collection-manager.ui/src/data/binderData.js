import Axios from 'axios';
const baseUrl = 'https://localhost:44306/api/binder';


const getUserBinders = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/userbinders`)
      .then((resp) => {
        const binders = resp.data;
        resolve(binders);
      })
      .catch(err => reject(console.error("Error in binderData.js/getUserBinders()", err)))
});

const getBinderById = (binderId) => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/${binderId}`)
  .then((resp) => {
    const binder = resp.data;
    resolve(binder);
  })
  .catch(err => reject(console.error("Error in binderData.js/getUserBinders()", err)))
});

const postNewBinder = binder => Axios.post(`${baseUrl}`, binder);

export default { getUserBinders, getBinderById, postNewBinder }
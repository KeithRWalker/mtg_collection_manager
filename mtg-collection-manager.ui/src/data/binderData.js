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

const getCardsForBinder = (binderId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/cards/${binderId}`)
      .then((resp) => {
        const cards = resp.data;
        resolve(cards)
      }).catch(err => reject(console.error("error in binderData.js/getCardsForBinder")));
});

const getBinderByBinderId = (binderId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/${binderId}`)
      .then(resp => resolve(resp.data))
      .catch(err => reject(console.error("error in binderData / getBinderByBinderId()")))
});

export default { getUserBinders, getBinderById, postNewBinder, getCardsForBinder, getBinderByBinderId }
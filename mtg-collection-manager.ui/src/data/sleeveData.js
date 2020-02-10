import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/sleeve';

const getBinderCards = (binderId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/binder/${binderId}`)
      .then(resp => resolve(resp.data))
      .catch(err => reject(console.error("error in sleeveData.js => getBinderCards()", err)));
});

const getDeckCards = (deckId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/deck/${deckId}`)
      .then(resp => resolve(resp.data))
      .catch(err => reject(console.error("error in sleeveData.js => getDeckCards()", err)));
});

export default { getBinderCards, getDeckCards }
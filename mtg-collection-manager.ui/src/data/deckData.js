import Axios from 'axios';
const baseUrl = 'https://localhost:44306/api/deck';


const getUserDecks = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/userdecks`)
      .then((resp) => {
        const decks = resp.data;
        resolve(decks);
      })
      .catch(err => reject(console.error("Error in deckData.js/getUserDecks()", err)))
});

const getDeckById = (deckId) => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/${deckId}`)
  .then((resp) => {
    const deck = resp.data;
    resolve(deck);
  })
  .catch(err => reject(console.error("Error in deckData.js/getUserDecks()", err)))
});

const postNewDeck = deck => Axios.post(`${baseUrl}`, deck);

export default { getUserDecks, getDeckById, postNewDeck }
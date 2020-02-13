import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/card';

var getRandomCard = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/random`)
        .then(resp => resolve(resp.data))
        .catch(err => reject(console.error("error in cardData/getRandomCard()"), err))
});

var getPage = (pageNum) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/browse/${pageNum}`)
        .then(resp => resolve(resp.data))
        .catch(console.error("error in cardData/getPage()"), err => reject(err))
});

var getCardDetails = (cardId) => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/id/${cardId}`)
    .then((resp) => {

      for(let[key, value] of Object.entries(resp.data)){

        if(value === null || value === undefined){
          resp.data[key] = 'Not Avalible'
        }

        if(typeof value === 'object' && value !== null){
          for(let[nestedKey, nestedValue] of Object.entries(value)){

            if(nestedValue === null){
              const parent = resp.data[key]
              parent[nestedKey] = 'Not Avalible';
            }
          }
        }
      }
      resolve(resp.data);
    }).catch(err => reject(console.error("error in cardData/getCardDetails()"), err))
})

const getCardByScryId = (scryId) => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/scryfall/${scryId}`)
      .then(resp => resolve(resp.data))
      .catch(err => reject(console.error("error in cardData.js => getCardByScryId()")));
});

var addCardToUser = additionInfo => Axios.post(`${baseUrl}/usercard`, additionInfo);

export default { getRandomCard, getPage, getCardDetails, addCardToUser, getCardByScryId }

import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/catalog';



const getCreatureTypes = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/creature-types`)
    .then(resp => resolve(resp.data))
    .catch(err => reject(console.error("Error in catalogData.js/getCreatureTypes()", err)))
}) 

const getPlaneswalkerTypes = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/planeswalker-types`)
    .then(resp => resolve(resp.data))
    .catch(err => reject(console.error("Error in catalogData.js/getPlaneswalkerTypes()", err)))
})

export default { getCreatureTypes, getPlaneswalkerTypes }


/* 
/catalog/card-names
/catalog/artist-names
/catalog/word-bank
/catalog/creature-types
/catalog/planeswalker-types
/catalog/land-types
/catalog/artifact-types
/catalog/enchantment-types
/catalog/spell-types
/catalog/powers
/catalog/toughnesses
/catalog/loyalties
/catalog/watermarks
*/
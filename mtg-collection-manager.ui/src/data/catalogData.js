import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/catalog';

const getCreatureTypes = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/creatures`)
    .then(resp => resolve(resp.data))
    .catch(err => reject(console.error("Error in catalogData.js/getCreatureTypes()", err)))
}) 

export default { getCreatureTypes }


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
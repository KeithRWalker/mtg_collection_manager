import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/search';

var submitSearch = (searchObject) => new Promise((resolve, reject) => {
  Axios.post(`${baseUrl}/search`, searchObject)
    .then((resp) => {
      var results = resp.data;
      if( results.object==="error" || results.totalCards === 0 || results.data === null){
        resolve(false);
      }
      resolve(resp.data)
    })
    .catch(err => reject(console.error("error in cardData/basicSearch()"), err))
})

var translateSearch = (searchObject) => {
  Object.keys(searchObject).forEach((key) => {
    searchObject[key] = searchObject[key].replace(/ /g, "+")
  })
  return searchObject;
}

export default { submitSearch, translateSearch }
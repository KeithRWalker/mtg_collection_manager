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

var submitSearch = (searchObject) => new Promise((resolve, reject) => {
  Axios.post(`${baseUrl}/search`, searchObject)
    .then(resp => resolve(resp.data))
    .catch(err => reject(console.error("error in cardData/basicSearch()"), err))
})

var translateSearch = (searchObject) => {
  Object.keys(searchObject).forEach((key) => {
    searchObject[key] = searchObject[key].replace(/ /g, "+")
  })
  return searchObject;
}

export default { getRandomCard, getPage, submitSearch, translateSearch }
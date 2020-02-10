import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/symbol';

const getAllSymbolData = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}`)
  .then((resp => {
    const response = resp.data;
    resolve(response);
  })).catch(err => reject("error in symbolData.js/getAllSymbols()", err));
})

const getSimpleSymbolData = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/simple`)
  .then((resp => {
    const response = resp.data;
    resolve(response);
  })).catch(err => reject("error in symbolData.js/getSimpleSymbols()", err));
})

const getBasicMana = () => new Promise((resolve, reject) => {
  Axios.get(`${baseUrl}/simple/basic`)
  .then((resp => {
    const response = resp.data;
    resolve(response);
  })).catch(err => reject("error in symbolData.js/getSimpleSymbols()", err));
})

const getUrisForSymbols = (symbols) => new Promise((resolve, reject) => {
    Axios.post(`${baseUrl}/codes`, symbols)
      .then(resp => resolve(resp.data))
      .catch(err => reject(err));
});

export default { getAllSymbolData, getSimpleSymbolData, getBasicMana, getUrisForSymbols }
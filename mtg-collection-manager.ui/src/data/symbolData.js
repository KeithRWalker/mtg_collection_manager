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

export default { getAllSymbolData, getSimpleSymbolData }
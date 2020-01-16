import Axios from 'axios';

const baseUrl = 'https://localhost:44306/api/card';

var getRandomCard = () => new Promise((resolve, reject) => {
    Axios.get(`${baseUrl}/random`)
        .then(resp => resolve(resp.data))
        .catch(err => reject(err))
})

export default { getRandomCard }
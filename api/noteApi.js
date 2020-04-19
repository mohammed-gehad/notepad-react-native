const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://8eb15660.ngrok.io',
  });

export default instance;
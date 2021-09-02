import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.zp.ru/v1'
});

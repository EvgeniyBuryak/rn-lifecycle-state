import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.zp.ru/v1/vacancies',
    params: {
        limit: 10,
        city_id: 826,
        header_facets: true
    },
    /*data: {

    }*/
});

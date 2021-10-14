import React, { useState } from 'react';
import axios from 'axios';

const request = axios.create({
    baseURL: 'https://api.zp.ru/v1/vacancies',
    params: {
        limit: 10,
        city_id: 826,
        header_facets: true
    },
});

const getVacancies = async () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    try {
        const response = await request.get();

        setResults(response.data.vacancies);
        console.log(response.data.vacancies);
        setErrorMessage('Вакансии успешно загружены');
        
    } catch (error) {
        setErrorMessage('Ошибка загрузки вакансии');
        throw new Error('Ошибка');
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
    }
}
const wrapped = () => {
};


export { getVacancies };
//export default [results, errorMessage];
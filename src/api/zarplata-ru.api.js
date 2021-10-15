import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getVacancies = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    const sendRequest = async () => {

        const requestApiZarplataRu = axios.create({
            baseURL: 'https://api.zp.ru/v1/vacancies',
            params: {
                limit: 10,
                city_id: 826,
                header_facets: true
            },
        });
        
        try {
            const response = await requestApiZarplataRu.get();

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

    useEffect(()=>{
        sendRequest();
    });

    return [sendRequest, errorMessage, results];
};


export { getVacancies };
//export default [results, errorMessage];
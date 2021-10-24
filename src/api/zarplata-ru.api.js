//import React, { useState, useEffect } from 'react';
//import HomeScreenView from '../screens/home-screen/home-screen.view';
import axios from 'axios';

const getVacancies = async () => {
    //const [errorMessage, setErrorMessage] = useState('');
    //const [results, setResults] = useState([]);

    //const requestFromApi = async () => {

        
        try {
            const requestApiZarplataRu = axios.create({
                baseURL: 'https://api.zp.ru/v1/vacancies',
                params: {
                    limit: 10,
                    city_id: 826,
                    header_facets: true
                },
            });

            const response = await requestApiZarplataRu.get();
            return response.data.vacancies;
            //setResults(response.data.vacancies);
            //console.log(response.data.vacancies);
            //setErrorMessage('Вакансии успешно загружены');
            
        } catch (error) {
            //setErrorMessage('Ошибка загрузки вакансии');
            throw new Error('Ошибка');
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);
        }

    //}

    /*useEffect(()=>{
        requestFromApi();
    });*/

    //return [sendRequest, errorMessage, results];
    /*return (
        <HomeScreenView
            results={results}
            errorMessage={errorMessage}
        />
    );*/
};


export { getVacancies };
//export default [results, errorMessage];
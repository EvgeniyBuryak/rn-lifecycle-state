import { useEffect, useState } from 'react';
import zpRu from '../api/zarplata-ru.api';

export default () => { // самописный хук (hook)
    const [onLoader, setOnLoader] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    const vacancyApi = async () => {
        setOnLoader(true);
        //console.log('Hi there!');

        try {// в api перенести как утилиту
            const response = await zpRu.get('/vacancies/', {
                params: {
                    limit: 10,
                    geo_id: 826
                }
            }); // в api перенести как утилиту

            //const vacancies = response.data.vacancies;

            /*
             * const updateResults = Array.from(new Set([...results, ...vacancies.map(
             */ //вместо map лучше reduce, в каких случаях его удобно использовать????????????
            /*const updateResults = [...results, ...vacancies.map((vacancy, index) => {

                return {
                    id: index, // айди ненужны
                    zp_id: vacancy.id, // это тоже не нужно
                    header: vacancy.header // нужно только это
                }
            })];*/

            //setResults(updateResults);
            setResults(response.data.vacancies);
            setErrorMessage('Вакансии успешно загружены');            
        } catch (error) {
            setErrorMessage('Ошибка загрузки вакансии');
        } finally {
            setOnLoader(false);
        }
    }

    useEffect(() => {
        vacancyApi();
        /*return () => {
            setResults([...results]);
        };*/
    }, []);

    return [vacancyApi, results, onLoader, errorMessage];
};
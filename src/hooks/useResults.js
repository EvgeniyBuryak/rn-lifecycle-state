import { useEffect, useState } from 'react';
import zpRu from '../api/zarplataRu';

export default () => {
    const [onLoader, setOnLoader] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);

    const vacancyApi = async () => {
        setOnLoader(true);
        //console.log('Hi there!');

        try {
            const response = await zpRu.get('/collapsed_vacancies/', {
                params: {
                    limit: 10,
                    geo_id: 826
                }
            });

            const vacancies = response.data.vacancies;

            /*
             * const updateResults = Array.from(new Set([...results, ...vacancies.map(
             */
            const updateResults = [...results, ...vacancies.map((vacancy, index) => {

                return {
                    id: index,
                    zp_id: vacancy.id,
                    header: vacancy.header
                }
            })];

            setResults(updateResults);
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
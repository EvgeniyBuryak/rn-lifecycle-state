import { useEffect, useState } from 'react';
import zpRu from '../api/zarplataRu';

export default () => {
    const [onLoader, setOnLoader] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([
        {
            id: 0,
            zp_id: 0,
            header: ''
        }
    ]);

    const vacancyApi = async () => {
        setOnLoader(true);
        //console.log('Hi there!');

        try {
            const response = await zpRu.get('/collapsed_vacancies/', {
                params: {
                    limit: 5,
                    geo_id: 826
                }
            });

            const vacancies = response.data.vacancies;

            vacancies.forEach((vacancy, index) => {

                //console.log(index);
                //console.log(vacancy.id);

                setResults([
                    ...results,
                    {
                        id: results.length + 1,
                        zp_id: vacancy.id,
                        header: vacancy.header
                    }                    
                ]);
            });
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
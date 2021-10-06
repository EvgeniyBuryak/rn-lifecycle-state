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
    try {
        const response = await request.get('/');

        //setResults(response.data.vacancies);

        //setErrorMessage('Вакансии успешно загружены');

        

    } catch (error) {
        //setErrorMessage('Ошибка загрузки вакансии');
        throw Error('Ошибка');
    }
    return response.data.vacancies;
}

export { getVacancies };
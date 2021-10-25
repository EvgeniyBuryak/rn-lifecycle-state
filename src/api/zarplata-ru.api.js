import axios from 'axios';

const getVacancies = async () => {    
        
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
        
    } catch (error) {
        throw new Error('Ошибка');
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
    }
};

export { getVacancies };
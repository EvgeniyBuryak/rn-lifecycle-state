import axios from 'axios';

const getVacancies = async () => {    
        
    try {
        const response = await axios.get( 'https://api.zp.ru/v1/vacancie', {
            params: {
                limit: 10,
                city_id: 826
            }
        });

        return response.data.vacancies;        
    } catch (error) {
        throw new Error('Ошибка');
    }
};

export { getVacancies };
import zpRu from '../api/zarplata-ru.api';

export default async () => {
    return await zpRu.get('/vacancies/', {
        params: {
            limit: 10,
            geo_id: 826
        }
    });
};
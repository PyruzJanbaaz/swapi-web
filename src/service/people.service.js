import api from './api.service';

class PeopleService {

    getPeople(search, pageNumber) {
        return api.get('/v1/people?search=' + search + '&pageNumber=' + pageNumber);
    }

}

export default new PeopleService();

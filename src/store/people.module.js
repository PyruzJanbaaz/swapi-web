import PeopleService from '@/service/people.service';

export const people = {
    namespaced: true,
    state: {
        searchResult: {results: [], count: 0, totalPages: 0},
        searchParams: {search: '', pageNumber: 1}
    },
    actions: {
        async getPeople({commit}, data) {
            await PeopleService.getPeople(data.search, data.pageNumber).then(
                (result) => {
                    console.log(result.data)
                    commit('searchResult', result.data);
                }
            );
        },
    },
    mutations: {
        searchResult(state, result) {
            result.totalPages = (result.count % 10 === 0 ? parseInt(result.count / 10) : parseInt(result.count / 10) + 1);
            state.searchResult = result;
        },
        searchParams(state, data) {
            state.searchParams = data;
        },
    },
    getters: {
        getSearchResult: (state) => state.searchResult
    }
};

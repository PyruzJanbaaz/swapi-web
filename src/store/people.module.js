import PeopleService from '@/service/people.service';

export const people = {
    namespaced: true,
    state: {
        searchResult: {meta: {}, data: {results: [], count: 0, totalPages: 0}},
        searchParams: {search: '', pageNumber: 1}
    },
    actions: {
        async getPeople({commit}, data) {
            await PeopleService.getPeople(data.search, data.pageNumber).then(
                (result) => {
                    commit('searchResult', result.data);
                }
            );
        },
    },
    mutations: {
        searchResult(state, data) {
            data.data.totalPages = (data.data.count % 10 === 0 ? parseInt(data.data.count / 10) : parseInt(data.data.count / 10) + 1);
            state.searchResult = data;
        },
        searchParams(state, data) {
            state.searchParams = data;
        },
    },
    getters: {
        getSearchResult: (state) => state.searchResult
    }
};

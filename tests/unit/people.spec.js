import {people} from "@/store/people.module";

describe('People.vue', () => {
    it("add search params to the state", () => {
        people.mutations.searchParams(people.state, {search: 'Test', pageNumber: 2})
        expect(people.state.searchParams).toEqual({
            search: 'Test',
            pageNumber: 2
        })
    })
})
import {people} from './people.module';
import {createStore} from "vuex";

export const repository = createStore({
    modules: {
        people
    },
});
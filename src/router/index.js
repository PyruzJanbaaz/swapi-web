import {createWebHistory, createRouter} from "vue-router";
import People from "@/views/People.vue";
import NotFound from "@/views/client/NotFound.vue";
import ServerError from "@/views/client/ServerError";

const routes = [
    {
        path: "/",
        name: "People",
        component: People,
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
    {
        path: "/500",
        component: ServerError,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
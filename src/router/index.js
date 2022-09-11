import {createWebHistory, createRouter} from "vue-router";
import People from "@/views/People.vue";
import NotFound from "@/views/client/NotFound.vue";

const routes = [
    {
        path: "/",
        name: "People",
        component: People,
    },
    {
        path: "/:catchAll(.*)",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/TheLogin.vue'
import TheBooking from '../pages/TheBooking.vue'
import TheMovies from '../pages/TheMovies.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld,
    },
    {
        path: '/movie/booking/:id',
        name: 'TheBooking',
        component: TheBooking,
    },
    {
        path: '/movies',
        name: 'TheMovies',
        component: TheMovies,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

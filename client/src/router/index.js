import {
    createRouter,
    createWebHistory
} from 'vue-router';
import TheBooking from '../pages/TheBooking.vue'
import TheMovies from '../pages/TheMovies.vue'
import LoginRegisterPage from '../pages/LoginRegisterPage.vue'

const token = localStorage.getItem("token")

const routes = [{
        path: '/',
        name: 'Home',
        component: LoginRegisterPage,
    },
    {
        path: '/movie/booking/:name',
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


// router.beforeEach((to, from, next) => {
//     if (to.name !== 'Home' && !token) next({
//         name: 'Home'
//     })
//     else next()
// })
export default router;
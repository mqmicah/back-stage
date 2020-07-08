import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>
    import ('page/login/Login')

const Home = () =>
    import ('page/home/Home')



const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        const tok = window.sessionStorage.getItem('token');
        if (!tok) {
            next('/login')
        }
    }
    next();
})

export default router
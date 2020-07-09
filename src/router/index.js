import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () =>
    import ('page/login/Login')

const Home = () =>
    import ('page/home/Home')

const WeLC = () =>
    import ('page/aside/welcome/welCome')

const User = () =>
    import ('page/aside/user/User')


const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: WeLC
        }, {
            path: '/users',
            component: User
        }]
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

//解决双击路由时会报错（路由冗余）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
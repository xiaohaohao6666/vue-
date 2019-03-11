import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '../components/login.vue'
import index from '../components/index.vue'
import users from '../components/users.vue'
let routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: index,
        children: [
            {
                path: 'users',
                component: users
            }
        ]
    },

]

let router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path=='/login'){
        next();
    } else{
        if(window.sessionStorage.getItem('token')){
            // 存在token
            next();   
        } else{
            Vue.prototype.$message.info("要登录,才能访问啊!");
            next('/login');
        }
    }
})

export default router

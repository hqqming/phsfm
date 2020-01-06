import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import subject from '../views/index/subject.vue'
import enterprise from '../views/index/enterprise.vue'
import user from '../views/index/user.vue'
import question from '../views/index/question.vue'
import chart from '../views/index/chart.vue'
//注册 vue-router
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    //这里就是路由的配制项
    routes: [
        {
            path: '/',
            component: login
        },
        {
            path: '/login',
            component: login
        },
        {
            path: '/index',
            component: index,
            children: [
                {
                    path: '/',
                    component:index,
                },
                {
                    path: 'subject',
                    component: subject,
                },
                {
                    path: 'enterprise',
                    component: enterprise,
                },
                {
                    path: 'user',
                    component: user,
                },
                {
                    path: 'question',
                    component: question,
                },
                {
                    path: 'chart',
                    component: chart,
                },
            ]


        },
    ]
})
export default router
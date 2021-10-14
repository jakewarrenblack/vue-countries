import { hasOwnMetadata } from 'core-js/fn/reflect'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AllCountries from '@/components/AllCountries'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/countries/all',
            // snake_case is most common for names
            name: 'all_countries',
            component: AllCountries,
        }
    ]
})
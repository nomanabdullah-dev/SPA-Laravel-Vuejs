import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//Category Route
import Home from '../pages/home.vue'
import CategoryList from '../pages/category/index.vue'
import CreateCategory from '../pages/category/create.vue'
import EditCategory from '../pages/category/edit.vue'
//Product Route
import ProductList from '../pages/product/index.vue'
import CreateProduct from '../pages/product/create.vue'
import EditProduct from '../pages/product/edit.vue'
//Authentication Route
import Login from '../pages/auth/login.vue'
//Dashboard Route
import Dashboard from '../pages/dashboard/index.vue'
import UserProfile from '../pages/dashboard/profile.vue'


const routes = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home'
        },
        //Category Route
        {
            path: '/category',
            component: CategoryList,
            name: 'category-list'
        },
        {
            path: '/category/create',
            component: CreateCategory,
            name: 'create-category'
        },
        {
            path: '/category/edit/:id',
            component: EditCategory,
            name: 'edit-category'
        },
        //Product Route
        {
            path: '/product',
            component: ProductList,
            name: 'product-list'
        },
        {
            path: '/product/create',
            component: CreateProduct,
            name: 'create-product'
        },
        {
            path: '/product/edit/:id',
            component: EditProduct,
            name: 'edit-product'
        },
        //Authentication Route
        {
            path: '/auth/login',
            component: Login,
            name: 'login',
            meta: {
                requiresVisitor: true
            }
        },
        //Dashboard Route
        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard',
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/dashboard/profile',
            component: UserProfile,
            name: 'user-profile',
            meta: {
                requiresAuth: true
            }
        }
    ]
});
export default routes;

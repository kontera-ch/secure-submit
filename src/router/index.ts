import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Encrypt from '../views/Encrypt.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'encrypt',
    component: Encrypt
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

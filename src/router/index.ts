import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Encrypt from '../views/Encrypt.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'encrypt',
    props: (route) => ({
      publicKey: route.query.publicKey
    }),
    component: Encrypt
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

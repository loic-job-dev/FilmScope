import { createRouter, createWebHistory } from 'vue-router'
import FilmDetailView from '../views/FilmDetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/1',
    },
    {
      path: '/:page',
      name: 'home',
      component: () => import('../views/HomeView.vue'), //On peut aussi mettre component: HomeView avec l'import
    },
    {
      path: '/film/:id',
      name: 'film',
      component: FilmDetailView,
    },
    {
      path: '/favorites',
      name: 'favoris',
      component: FavoritesView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: AboutView,
    // },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import SongList from '../views/SongList'
import ArtistsList from '../views/ArtistList.vue'
import AddArtist from '../views/AddArtist'
import AddSong from '../views/AddSong'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/artists',
    name: 'Artists',
    component: ArtistsList,

  },
  {
    path: '/songs',
    name: 'Songs',
    component: SongList
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login

  },
  {
    path: '/addArtist',
    name: 'AddArtist',
    component: AddArtist
  },
  {
    path: '/addSong',
    name: 'AddSong',
    component: AddSong
  },
]
const router = createRouter({history: createWebHistory(process.env.BASE_URL),routes})



router.beforeEach((to, from, next) => {
  if (to.name === 'Register' || to.name === 'Login' || to.name === 'Home') {
    next();
  } else if (to.name !== 'Login' && !store.state.Authen) {
    next({ name: 'Login' });
  } else {
    next();
  }
})

export default router

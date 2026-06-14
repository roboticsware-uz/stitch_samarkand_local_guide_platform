import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import './index.css'

export const createApp = ViteSSG(
  App,
  {
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
      },
    ],
  },
  ({ app, router, isClient }) => {
    // Custom initialization
  }
)

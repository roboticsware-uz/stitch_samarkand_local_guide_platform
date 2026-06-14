import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import Home from './views/Home.vue'
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
    ],
  },
  ({ app, router, isClient }) => {
    // Custom initialization
  }
)

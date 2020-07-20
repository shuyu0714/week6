import Vue from 'vue'
import VueRouter from 'vue-router'
import Rooms from '../views/Rooms.vue'
import RoomInfo from '../views/RoomInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Rooms
  },
  {
    name: 'RoomInfo',
    path: '/room/:id',
    component: RoomInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, savedPosition) {
    if (to.name === 'Home') {
      return { x: savedPosition.x, y: savedPosition.y }
    }
    return { x: 0, y: 0 }
  }
})

export default router

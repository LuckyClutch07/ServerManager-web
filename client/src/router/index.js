import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FileManager from '../views/fileManager/FileManager.vue'
import FileManagerServers from '../views/fileManager/FileManagerServers.vue'
import Server from '../views/fileManager/Server.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/fileManager',
    name: 'FileManager',
    component: FileManager
  },
  {
    path: '/fileManager/:fileManager',
    name: 'FileManagerServers',
    component: FileManagerServers
  },
  {
    path: '/:fileManager/:server',
    name: 'Server',
    component: Server
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

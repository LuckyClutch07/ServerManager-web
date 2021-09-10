import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue';
import FileManager from '../views/fileManager/FileManager.vue';
import FileManagerServers from '../views/fileManager/FileManagerServers.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/file-manager',
        name: 'FileManager',
        component: FileManager,
        beforeEnter: (to, from, next) => {
            
        }
    },
    {
        path: '/file-manager/:fileManager',
        name: 'FileManagerServers',
        component: FileManagerServers
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
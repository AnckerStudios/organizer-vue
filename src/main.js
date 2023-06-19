import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import HomePage from './router/HomePage.vue'
import CalendarPage from './router/CalendarPage.vue'
import ToDoPage from './router/ToDoPage.vue'
import ProfilePage from './router/ProfilePage.vue'
import { createPinia } from 'pinia'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// import ProfilePage from './router/ProfilePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
const pinia = createPinia()
const routes = [
    { path: '/', component: HomePage },
    { path: '/calendar', component: CalendarPage },
    { path: '/todo', component: ToDoPage },
    { path: '/profile', component: ProfilePage },
  ]
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })
  const app = createApp(App)
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .use(pinia)
    .mount('#app')

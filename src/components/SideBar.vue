<template lang="">
    <div class=" fixed top-16 bottom-0 bg-white group w-12 hover:w-60 transition-all duration-200 flex flex-col gap-4 p-1 justify-between shadow-md z-10">
      <div class="flex flex-col gap-2">
        <router-link v-for="(item, index) in menuItems" :key="item.name" :to="item.link" v-slot="{isActive}">
          <div class="flex gap-3 items-center p-1 w-full rounded-lg h-10" :class="isActive && ' bg-gradient-to-t from-sky-400 to-blue-800'">
            <span class="material-symbols-rounded text-3xl" :class="isActive ? ' text-white' : 'bg-gradient-to-b from-sky-400 to-blue-800 bg-clip-text text-transparent'">
              {{ item.name }}
            </span>
            <div class=" whitespace-nowrap overflow-hidden " :class="isActive && ' text-white font-bold'">{{ item.title }}</div>
          </div>

        </router-link>
      </div>
      
      <router-link to="/profile" v-slot="{isActive}">
          <div class="flex gap-3 items-center p-1 w-full rounded-lg h-10" :class="isActive && ' bg-gradient-to-t from-sky-400 to-blue-800'">
            <span class="material-symbols-rounded text-3xl" :class="isActive ? ' text-white' : 'bg-gradient-to-b from-sky-400 to-blue-800 bg-clip-text text-transparent'">
              person
            </span>
            <div class=" whitespace-nowrap overflow-hidden " :class="isActive && ' text-white font-bold'">Личный кабинет</div>
          </div>

        </router-link>
    </div>
</template>
<script setup>
const menuItems = [
  {name: 'home', title: 'Главная страница', link: '/'},
  {name: 'calendar_month', title: 'Календарь', link: '/calendar'},
  {name: 'wysiwyg', title: 'Список заданий', link: '/todo'}
]
</script>
<style lang="">
    
</style>
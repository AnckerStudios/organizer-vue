<script setup>
import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/SideBar.vue'



</script>

<template>
  <div>
    <header class=" w-full bg-blue-400 h-16 sticky top-0 p-2">
      <router-link to="/" v-slot="{isActive}" >
          <div class=" text-4xl h-full text-white font-bold">🧙🏽‍♂️ organizer</div>

        </router-link>
    </header>
    <div class="flex relative">
      <SideBar/>
      <div class=" mx-auto flex ">
        <RouterView />
      </div>
    </div>

    <!-- <h1 class=" bg-zinc-500">djdjd</h1>
    <RouterView/> -->
  </div>
</template>

<style>
body{
  background-color: rgb(234, 236, 238);
}
</style>

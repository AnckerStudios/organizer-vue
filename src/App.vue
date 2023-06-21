<script setup>
import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/SideBar.vue'



</script>

<template>
  <div class="h-screen ">
    <header class=" w-full bg-blue-400 h-16 fixed top-0 p-2 z-10">
      <router-link to="/">
          <div class=" text-4xl h-full text-white font-bold">🧙🏽‍♂️ organizer</div>

        </router-link>
    </header>
    <div class="flex relative min-h-full">
      <SideBar/>
      <div class="ml-12 mt-16 w-full p-4 ">
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

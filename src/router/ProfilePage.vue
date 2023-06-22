<template>
    <div class=" max-w-7xl mx-auto flex gap-4 pt-10 justify-center">
        <ProfileCard/>
        <div class=" bg-white rounded-3xl p-4 shadow-md ">
            <!-- <img src="https://hr-portal.ru/files/mini/analiz1.jpg" class="h-[500px]"/>  -->
            <Chart />
        </div>
    </div>
</template>
<script setup>
import Chart from '../components/Chart.vue';
import ProfileCard from '../components/ProfileCard.vue'

</script>
<style>
    
</style>
<template lang="">
    <div class="bg-blue-300 px-2 py-1 rounded text-white flex flex-col w-full cursor-pointer" 
    :style="{
        backgroundColor: event.color,
        opacity: !(event.timeIn || event.timeExp) ? 0.7 : 1
        }">
        <span class="font-bold text-sm overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {{event.timeIn ? event.timeExp ? `${event.timeIn}-${event.timeExp}` : 
            `Начало в ${event.timeIn}` : event.timeExp ? `Конец в ${event.timeExp}` : 'Продолжение'}}</span>
        {{event.title || 'Ой, название потерялось'}}
    </div>
</template>
<script setup>
const props = defineProps({
    event: Object
})


</script>
<style lang="">
    
</style>
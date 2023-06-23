<template lang="">
    <div class=" bg-white rounded">
    <div class="bg-blue-300 w-full h-full rounded px-2 py-1 text-white flex flex-col  cursor-pointer" 
    :style="{
        backgroundColor: event.color,
        opacity: !(event.timeIn || event.timeExp) ? 0.7 : 1
        }">
        <span v-if="isEditable" class="font-bold text-sm overflow-ellipsis whitespace-nowrap overflow-hidden ">
            {{event.timeIn ? event.timeExp ? `${event.timeIn}-${event.timeExp}` : 
            `Начало в ${event.timeIn}` : event.timeExp ? `Конец в ${event.timeExp}` : 'Продолжение'}}</span>
        <p class=" overflow-ellipsis whitespace-nowrap overflow-hidden">{{event.title || 'Ой, название потерялось'}}</p>
    </div>
</div>
</template>
<script setup>
const props = defineProps({
    event: Object,
    isEditable: Boolean
})


</script>
<style lang="">
    
</style>
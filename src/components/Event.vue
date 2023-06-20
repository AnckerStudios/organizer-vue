<template lang="">
    <div class="bg-blue-300 px-2 py-1 rounded text-white flex flex-col w-full">
        <span class="font-bold text-sm overflow-ellipsis whitespace-nowrap overflow-hidden ">{{event.dateIn ? event.dateExp ? '10-10' : 'Начало' : event.dateExp ? 'Конец' : 'Продолжение'}}</span>
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
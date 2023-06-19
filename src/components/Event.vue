<template lang="">
    <div class="bg-blue-300 px-2 py-1 rounded text-white flex flex-col">
        <span class="font-bold text-sm">{{event.dateIn.getHours()}}:{{event.dateIn.getMinutes()}} - {{event.dateExp.getHours()}}:{{event.dateExp.getMinutes()}}</span>
        {{event.title}}
    </div>
</template>
<script setup>
const props = defineProps({
    event: Object
})
</script>
<style lang="">
    
</style>
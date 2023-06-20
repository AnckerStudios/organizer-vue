<template lang="">
    <div class="relative w-full min-h-full h-60 rounded-2xl border-4 border-dashed " :class="dragEl ? 'border-gray-400' :'border-transparent'" 
    @mousedown.self="dragStart" 
    @mouseup="dragEnd" 
    @mouseleave="dragEnd"
    @mousemove.self="mouseMove">
        <Widget v-for="(item, index) in widgets" :key="index" :prop="item" :isDrag="dragEl === item.id" @isDrag="drag"/>
    </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue';

import Widget from '../components/Widget.vue';
import HelloWorld from '../components/HelloWorld.vue';
const dragEl = ref(0);
const mouseEvent = ref({x: 0, y: 0});
const dragStart = ($event)=>{
  
  console.log('1', $event.offsetX,$event.offsetY)
}
const dragEnd = ()=>{
  dragEl.value = 0;
  console.log('22222222')
}
const mouseMove = ($event)=>{
  if(dragEl.value){
    console.log('Move,', $event.offsetX,$event.offsetY)
    widgets.value[dragEl.value-1].pos = {x: $event.offsetX, y: $event.offsetY};
    // mouseEvent.value = {x: $event.offsetX, y: $event.offsetY}
  }
}
const drag = (id, x, y) => {
  
  console.log("ssssssssssssssssssssss",id);
  widgets.value[id-1].pos = {x: x, y: y}
  dragEl.value = id;
  
  console.log("ssssssssssssssssssssss",id,dragEl.value, dragEl.value===id);
}

const widgets = ref([{id:1, content: './Calendar.vue', pos: {x:0,y:0}},{id:2, content: './HelloWorld.vue', pos: {x:200,y:10}}])

</script>
<style lang="">
    
</style>
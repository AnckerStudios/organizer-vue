<template lang="">
    <div class="relative w-full min-h-full h-60 rounded-2xl border-4 border-dashed " :class="dragEl ? 'border-gray-400' :'border-transparent'" 
    @mousedown.self="dragStart" 
    @mouseup="dragEnd" 
    @mouseleave="dragEnd"
    @mousemove.self="mouseMove">
        <Widget v-for="(item, index) in widgets" :key="index" :prop="item" :isDrag="dragEl" @isDrag="drag"/>
    </div>
</template>
<script setup>
import { ref, onMounted,watch } from 'vue';

import Widget from '../components/Widget.vue';
import { useWidgetStore } from "../stores/widget";
import { storeToRefs } from 'pinia';
const widgetStore = useWidgetStore();
const { widgets } = storeToRefs(widgetStore)
const dragEl = ref(0);
const mouseEvent = ref({x: 0, y: 0});
const dragStart = ($event)=>{
  
  // console.log('1', $event.offsetX,$event.offsetY)
}
const dragEnd = ()=>{
  dragEl.value = 0;
  // console.log('22222222')
}
const mouseMove = ($event)=>{
  if(dragEl.value){
    // console.log('Move,', $event.offsetX,$event.offsetY)
    // widgetStore.widgets.value[dragEl.value-1].pos = {x: $event.offsetX, y: $event.offsetY};

    widgetStore.setCoord(dragEl.value, $event.offsetX, $event.offsetY)
    // mouseEvent.value = {x: $event.offsetX, y: $event.offsetY}
  }
}
const drag = (id, x, y) => {
  
  // console.log("ssssssssssssssssssssss",id);
  // widgetStore.widgets.value[id-1].pos = {x: x, y: y}
  widgetStore.setCoord(id, x, y)
  dragEl.value = id;
  
  // console.log("ssssssssssssssssssssss",id,dragEl.value, dragEl.value===id);
}

// const widgets = ref([{id:1, content: Calendar, pos: {x:0,y:0}},{id:2, content: HelloWorld, pos: {x:200,y:10}}])

</script>
<style lang="">
    
</style>
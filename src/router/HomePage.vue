<template lang="">
    <div class="relative w-full min-h-full h-60 rounded-2xl border-4 border-dashed " :class="dragEl ? 'border-gray-400' :'border-transparent'"
    @mouseup="dragEnd" 
    @mouseleave="dragEnd"
    @mousemove.self="mouseMove">
        <Widget v-for="(item, index) in widgets" :key="index" :prop="item" :isDrag="dragEl" @isDrag="drag"/>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import Widget from '../components/Widget.vue';
import { useWidgetStore } from "../stores/widget";
import { storeToRefs } from 'pinia';
const widgetStore = useWidgetStore();
const { widgets } = storeToRefs(widgetStore)
const dragEl = ref(0);
const mouseOffset = ref({ x: 0, y: 0 });
const dragEnd = () => {
  dragEl.value = 0;
  mouseOffset.value = { x: 0, y: 0 };
}
const mouseMove = ($event) => {
  if (dragEl.value) {
    const x = $event.offsetX - mouseOffset.value.x;
    let resX = x;
    if(x < 0){
      resX = 0;
    }else{
      resX=Math.min(x, document.documentElement.clientWidth-88- widgets.value.find(x=> x.id === dragEl.value).size.x);
    }

    const y = $event.offsetY - mouseOffset.value.y;
    let resY = y;
    if(y < 0){
      resY = 0;
    }else{
      resY = Math.min(y, document.documentElement.clientHeight-105 - widgets.value.find(x=> x.id === dragEl.value).size.y);
    }
    widgetStore.setCoord(dragEl.value, resX, resY)
    console.log("window",document.documentElement.clientWidth,document.documentElement.clientHeight);
  }
}
const drag = (id, x, y) => {
  dragEl.value = id;
  mouseOffset.value = { x: x, y: y }
}
</script>
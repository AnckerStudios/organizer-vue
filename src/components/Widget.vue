<template lang="">
  <div class="min-h-40 min-w-40 bg-gray-100 absolute rounded-xl shadow-md select-none" :style="{
        left: (prop.pos.x ) +'px' ,
        top: (prop.pos.y )+'px',
        pointerEvents: isDrag ? 'none' : 'auto',
        width: prop.size.x+'px',
        height: prop.size.y+'px',
  }">
    <div class="bg-blue-300 w-full h-6 p-2 rounded-t-xl cursor-pointer" @mousedown="dragStart" @mouseup="dragEnd">
      <div class="w-full h-full border-4 border-dashed border-blue-200/40">
      </div>    
    </div>
    <div class="p-4 relative">
      <component :is="prop.content"/>
        <router-link :to="prop.link">
          <div class=" absolute inset-0 " ></div>
        </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits, watch, defineAsyncComponent } from 'vue';
const emit = defineEmits(['isDrag']);
const topOffset = ref(0);
const leftOffset = ref(0);

const props = defineProps({
  isDrag: Number,
  prop: Object
})
const dragStart = ($event) => {
  // console.log('dragStart', $event);
  topOffset.value = $event.offsetY;
  leftOffset.value = $event.offsetX;
  emit('isDrag', props.prop.id, leftOffset,  topOffset);


}

// const Content = defineAsyncComponent(() =>
//   import(props.prop.content)
// )

// watch([() => props.mouseEvent], ([newEvent]) => {
//   console.log(`dragEl ${newEvent}`)
// })
// const dragEnd = ($event) => {
//   // console.log('drag Stop')
// }
</script>
<style lang="">
    
</style>
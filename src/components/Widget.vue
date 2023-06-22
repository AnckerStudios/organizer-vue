<template lang="">
    <div class="min-h-40 min-w-40 bg-gray-100 absolute  rounded-lg shadow-md" :style="{
        left: (prop.pos.x - leftOffset) +'px' ,
        top: (prop.pos.y - topOffset)+'px',
        pointerEvents: isDrag ? 'none' : 'auto'
}">
          <div class="bg-blue-300 w-full h-6 p-2 rounded-t-lg cursor-pointer" @mousedown="dragStart" @mouseup="dragEnd">
            <div class="w-full h-full border-4 border-dashed border-blue-200/40">

            </div>    
        </div>
          <div class="p-4">
            <component :is="prop.content"/>
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
const dragStart = ($event)=>{
    // console.log('dragStart', $event);
    topOffset.value = $event.offsetY;
    leftOffset.value = $event.offsetX;
    emit('isDrag', props.prop.id, props.prop.pos.x-leftOffset, props.prop.pos.y-topOffset);
  

}

// const Content = defineAsyncComponent(() =>
//   import(props.prop.content)
// )

// watch([() => props.mouseEvent], ([newEvent]) => {
//   console.log(`dragEl ${newEvent}`)
// })
const dragEnd = ($event)=>{
  // console.log('drag Stop')
}
</script>
<style lang="">
    
</style>
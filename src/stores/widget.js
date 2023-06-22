import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import ToDoList from '../components/ToDoList.vue';
import Calendar from '../components/Calendar.vue';

export const useWidgetStore = defineStore('widgetStore', () => {
  const calendar = shallowRef(Calendar)
  const todo = shallowRef(ToDoList)
    const widgets = ref([{id:1, content: calendar, pos: {x:0,y:0}},{id:2, content: todo, pos: {x:200,y:10}}]);
    
    function setCoord(id, x, y){
      const widget = widgets.value.find(x=> x.id === id);
      if(widget)
        widget.pos = {x: x, y: y}
    }
    return { widgets, setCoord}
})
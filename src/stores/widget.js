import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'
import ToDoList from '../components/ToDoList.vue';
import Calendar from '../components/Calendar.vue';

export const useWidgetStore = defineStore('widgetStore', () => {
  const calendar = shallowRef(Calendar)
  const todo = shallowRef(ToDoList)
    const widgets = ref([{id:1, content: calendar, pos: {x:0,y:0}, size: {x:800,y:640},link: '/calendar'},{id:2, content: todo, pos: {x:600,y:10}, size: {x:600,y:300},link: '/todo'}]);
    
    function setCoord(id, x, y){
      const widget = widgets.value.find(x=> x.id === id);
      if(widget)
        widget.pos = {x: x, y: y}
    }
    return { widgets, setCoord}
})
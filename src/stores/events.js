import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEventsStore = defineStore('events', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const eventsObj = ref({
        2023: {
            5: {
                18: [{
                    id: 1,
                    title: "Ужин",
                    dateIn: new Date(),
                    dateExp: new Date()
                  }]
            }
        }
    })
    const getEventsObj = computed(() => {
      console.log("fd");
      return eventsObj.value;
    });
  
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++;
    }
    function ee(event) {
      const year = event.dateIn.getFullYear();
      const month = event.dateIn.getMonth();
      const day = event.dateIn.getDate();
      const lastObj = eventsObj.value;
      lastObj[year] = lastObj[year] || {};
      lastObj[year][month] = lastObj[year][month] || {};
      lastObj[year][month][day] = lastObj[year][month][day] || {};
      console.log(lastObj, eventsObj.value);
    }
    return { count, name, getEventsObj, doubleCount, eventsObj, increment, ee }
})
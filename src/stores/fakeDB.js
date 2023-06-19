import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFakeDBStore = defineStore('fakeDB', () => {
    const count = ref(0)
    const name = ref('Eduardo')
    const events = ref([{
        id: 1,
        title: "Ужин",
        dateIn: new Date(),
        dateExp: new Date()
      }])
    const profile = ref({
        img: "",
        firstName: "Илья",
        lastName: "Ермолин",
        patronymic: "Сергеевич",
        birthdate: new Date(2001,8,26),
        age: 20
    })
    const getEvents = computed(() => {
      console.log("fd");
    });
    const getEventsByDate = computed(() => {
        return events.value.filter((x)=>x.dateIn <= date && x.dateExp >= date)
      });
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++;
    }
    function saveEvent(event) {
        events.value.push(event);
        return event;
    }
    return { count, name, events, profile, getEvents,getEventsByDate, doubleCount, increment, saveEvent }
})
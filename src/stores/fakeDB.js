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
      },{
        id: 2,
        title: "рррррр",
        dateIn: new Date(2023,5),
        dateExp: new Date(2023,5,26)
      },{
        id: 3,
        title: "KeK",
        dateIn: new Date(2022,5,2),
        dateExp: new Date(2023,10,23)
      }])
    const profile = ref({
        img: "",
        firstName: "Илья",
        lastName: "Ермолин",
        patronymic: "Сергеевич",
        birthDate: "2001-09-26"
    })
    const getEvents = computed(() => {
      return events.value
    });
    const getProfile = computed(() => {
      return JSON.parse(JSON.stringify(profile.value));
    });
    const getEventsByDate = computed(() => {
        return (year, month) => {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month+1, 0);
            return events.value.filter((x)=>x.dateIn <= lastDay && x.dateExp >= firstDay)
    }});
    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++;
    }
    function saveEvent(event) {
        events.value.push(event);
        return event;
    }
    
    function saveProfile(newProfile) {
      profile.value = newProfile;
    }
    return { count, name, events, profile, getEvents,getEventsByDate, getProfile, doubleCount, increment, saveEvent, saveProfile }
})
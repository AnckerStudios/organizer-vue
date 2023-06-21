import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';

export const useFakeDBStore = defineStore('fakeDB', () => {
    const count = ref(0)
    const toDo = ref([{
      id:"1",
      name:"Убраться",
      description: "sdasdasdasdas",
      event: 3,
      status: false
  }])
    const events = ref([{
        id: 1,
        title: "Ужин",
        dateIn: "2023-05-09",
        timeIn: "22:21",
        dateExp: "2023-07-01",
        timeExp: "22:21",
        color: "#ef4444"
      },{
        id: 2,
        title: "Рыбалка\nна Волге",
        dateIn: "2023-06-09",
        timeIn: "10:21",
        dateExp: "2023-06-09",
        timeExp: "12:21",
        color: "#34d399"

      },{
        id: 3,
        title: "Отдых",
        dateIn: "2023-06-09",
        timeIn: "22:21",
        dateExp: "2023-06-11",
        timeExp: "23:21",
        color: "#38bdf8"

      },{
        id: 4,
        title: "Test",
        dateIn: "2023-05-09",
        timeIn: "22:21",
        dateExp: "2023-05-09",
        timeExp: "23:21",
        color: "#e879f9"
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
        return (firstDay, lastDay) => {
            return events.value.filter((x)=>new Date(x.dateIn) <= lastDay && new Date(x.dateExp) >= firstDay)
    }});
    const saveToDo = computed(() => {
      
      return (jsonDoTo) => {
        console.log("json",jsonDoTo);
        const newToDo = JSON.parse(jsonDoTo);
        console.log("newToDo",newToDo);

        if(!newToDo.id){
          newToDo.id = uuidv4();
          console.log(newToDo);
        }
        toDo.value = toDo.value.filter(x=>x.id!==newToDo.id);
        newToDo.status = false;
        toDo.value.push(JSON.parse(JSON.stringify(newToDo)));
        console.log("11",newToDo);

        const event = events.value.find(e => e.id === newToDo.event);
        newToDo.event = event ? JSON.parse(JSON.stringify(event)) : null;
        console.log("22",newToDo);
        return JSON.stringify(newToDo);
  }});
  const findAllToDo = computed(() => {
    return () => {
      const newToDo = toDo.value.map(x=>{
        let y = JSON.parse(JSON.stringify(x));
        const event = events.value.find(e => e.id === x.event);
        y.event = event ? JSON.parse(JSON.stringify(event)) : null;
        return y;
      } )
      console.log("find newToDo",newToDo);
      return JSON.stringify(newToDo);
}});
const delToDo = computed(() => {
  return (id) => {
    toDo.value = toDo.value.filter(x=>x.id!==id);
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
    function add(){
      return ()=>{
        return 1;
      }
    }
    return { count, toDo, events, profile, getEvents,getEventsByDate,findAllToDo, saveToDo,delToDo, getProfile, doubleCount, increment, saveEvent, saveProfile, add }
})
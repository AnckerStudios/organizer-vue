<template lang="">
    <div class=" bg-white p-4 rounded-2xl">
      <div class="flex justify-between items-center mb-2">
        <div class="flex justify-between items-center w-60">
          <span @click="calendarStore.decrementMonth" class="material-symbols-rounded select-none cursor-pointer text-4xl text-blue-500"> chevron_left </span>
        <p class="font-bold">{{ monthInYear[month] }} {{ year }} </p>
        <span @click="calendarStore.incrementMonth" class="material-symbols-rounded select-none cursor-pointer text-4xl text-blue-500"> chevron_right </span>
        </div>
        
        <button class="px-4 p-2 bg-blue-500 rounded-full" @click="onCreate">Создать</button>
      </div>
      <div class="grid grid-cols-7 w-full border-b border-r border-blue-500 ">
        <div v-for="day in weekArray" :key="day" class="text-center border-t border-l border-blue-500 bg-blue-500 text-white font-bold">{{day}}</div>
        <div v-for="(day, index) in firstDayInCurMonth" :key="day" class="border-t border-l border-blue-500 min-w-8 min-h-10 bg-gray-200">
        
        </div>
        <div v-for="(day, index) in daysInCurMonth" class="border-t border-l border-blue-500 min-w-8 pb-1 min-h-10 px-1 max-h-72 overflow-hidden" :key="day">
        <p :class="day===curDay && new Date().getMonth() === month && 'text-red-500 font-bold'">{{day}}</p>
          <div v-if="calendarObj[day]"  class="flex flex-col gap-1 overflow-y-auto box-content">
            <Event v-for="(event, index) in calendarObj[day]" @click="onEdit(event.id)" :key="event.id" :event="event"/>
          </div>
      

        </div>
        <div v-for="(item, index) in 42-daysInCurMonth-firstDayInCurMonth" class="border-t border-l min-h-10 border-blue-500 min-w-8  bg-gray-200">

        </div>
      </div>
      <Modal v-if="isModalOpen" :event="editableEvent" @close="isModalOpen=false" @saveEvent="saveEvent" :read="false"/>
    </div>
</template>
<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";
import Event from "./Event.vue";
import { storeToRefs } from 'pinia';
import { useFakeDBStore } from "../stores/fakeDB";
import { useCalendarStore } from "../stores/calendarStore.js";
const fakeDB = useFakeDBStore();
const calendarStore = useCalendarStore();
import Modal from "./Modal.vue";
import MyButton from "./MyButton.vue";
import { colorArray } from "../config.js"
import { monthInYear } from "../config.js"
import { weekArray } from "../config.js"

const { getEventsByDate } = storeToRefs(fakeDB)
const { year, month, curDay } = storeToRefs(calendarStore)
// let now = new Date();
// const year = ref(now.getFullYear());
// const month = ref(now.getMonth());
// const curDay = ref(now.getDate());
const daysInCurMonth = ref(0);
const firstDayInCurMonth = ref(0);


onMounted(() => {
  // setCalendarObj();
})
const calendarObj = ref({})
const events = ref({})
watch([() => year.value, () => month.value], ([newYear, newMonth]) => {
  console.log(`${monthInYear[newMonth]} ${newYear} `)
  getDaysInMonth();
  getFirstDayOfMonth();
  updateEvents();
})
onBeforeMount(() => {
  getDaysInMonth();
  getFirstDayOfMonth();
  updateEvents();
});

const updateEvents = () => {
  const firstDay = new Date(year.value, month.value, 1);
  const lastDay = new Date(year.value, month.value + 1, 0, 23, 59, 59);
  events.value = JSON.parse(fakeDB.getEventsByDate(firstDay, lastDay));
  setCalendarObj();
}

const setCalendarObj = () => {
  calendarObj.value = {};
  const firstDay = new Date(year.value, month.value, 1);
  const lastDay = new Date(year.value, month.value + 1, 0, 23, 59, 59);
  for (let event of events.value) {
    let startDay = new Date(event.dateIn) < firstDay ? firstDay : new Date(event.dateIn);
    let startTime = new Date(event.dateIn) < firstDay ? null : event.timeIn;
    let endDay = new Date(event.dateExp) > lastDay ? lastDay : new Date(event.dateExp); //? min max?
    let endTime = new Date(event.dateExp) > lastDay ? null : event.timeExp;
    for (let i = startDay.getDate(); i <= endDay.getDate(); i++) {
      let newItem = {
        id: event.id,
        title: event.title,
        color: event.color,
        timeIn: startDay.getDate() === i ? startTime : null,
        timeExp: endDay.getDate() === i ? endTime : null
      }
      calendarObj.value[i] ? calendarObj.value[i].push(newItem) : calendarObj.value[i] = [newItem];
    }
  }
}
const getDaysInMonth = () => {
  daysInCurMonth.value = new Date(
    year.value,
    month.value + 1,
    0
  ).getDate();
};
const getFirstDayOfMonth = () => {
  firstDayInCurMonth.value = new Date(
    year.value,
    month.value,
    0
  ).getDay();
};
// const incrementMonth = () => {
//   month.value === 11 ? (month.value = 0, year.value++) : month.value++;
// }
// const decrementMonth = () => {
//   month.value === 0 ? (month.value = 11, year.value--) : month.value--;
// }

const isModalOpen = ref(false);
const editableEvent = ref(null)

const onCreate = () => {
  const now = new Date();
  editableEvent.value = {
    id: "",
    title: "",
    dateIn: `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`,
    timeIn: `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`,
    dateExp: `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`,
    timeExp: `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`,
    color: colorArray[0]
  };
  isModalOpen.value = true
}
const onEdit = (id) => {
  const event = events.value.find(x => x.id === id);
  if (event) {
    editableEvent.value = JSON.parse(JSON.stringify(event));
    isModalOpen.value = true
  }
}
const saveEvent = () => {
  isModalOpen.value = false;
  let a = JSON.parse(fakeDB.saveEvent(JSON.stringify(editableEvent.value)))
  events.value = events.value.filter(x => x.id !== a.id);
  events.value.push(a);
  setCalendarObj();
};
</script>
<style lang="">
    
</style>
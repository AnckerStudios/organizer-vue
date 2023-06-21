<template lang="">
    <div class=" bg-white">
      <div class="flex justify-between">
        <span @click="decrementMonth" class="material-symbols-rounded select-none cursor-pointer"> chevron_left </span>
        {{ monthInYear[month] }} {{ year }}
        <span @click="incrementMonth" class="material-symbols-rounded select-none cursor-pointer"> chevron_right </span>
      </div>
      <div class="grid grid-cols-7 w-full border-b border-r border-blue-500 ">
        <div v-for="(day, index) in firstDayInCurMonth" :key="day" class="border-t border-l border-blue-500 min-w-8 bg-gray-200">
        
        </div>
        <div v-for="(day, index) in daysInCurMonth" class="border-t border-l border-blue-500 min-w-8 pb-1 px-1 max-h-72 overflow-hidden" :key="day">
        {{day}}
          <div v-if="calendarObj[day]"  class="flex flex-col gap-1 overflow-y-auto box-content">
            <Event v-for="(event, index) in calendarObj[day]" :key="event.id" :event="event"/>
          </div>
      

        </div>
        <div v-for="(item, index) in 42-daysInCurMonth-firstDayInCurMonth" class="border-t border-l border-blue-500 min-w-8 bg-gray-200">

        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";
import Event from "./Event.vue";
import { storeToRefs } from 'pinia';
import { useEventsStore } from "../stores/events";
import { useFakeDBStore } from "../stores/fakeDB";

const store = useEventsStore();
const fakeDB = useFakeDBStore();
const { getEventsObj } = storeToRefs(store)
const { getEventsByDate } = storeToRefs(fakeDB)
let now = new Date();
const year = ref(now.getFullYear());
const month = ref(now.getMonth());
const curDay = ref(now.getDate());
const daysInCurMonth = ref(0);
const firstDayInCurMonth = ref(0);
const monthInYear = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

onMounted(() => {
  setCalendarObj();
  // console.log("загрузка", year.value, month.value);
  // let arr = fakeDB.getEventsByDate(year.value,month.value);
  // console.log("sss",arr)

  // console.log(Math.min(new Date("2023-05-09"),new Date()));

  // const firstDay = new Date(year.value, month.value, 1);
  //   const lastDay = new Date(year.value, month.value+1, 0);
  // for(let item of arr){
  //   console.log(item);
  //   let start = item.dateIn < firstDay ? firstDay : item.dateIn;
  //   let last = item.dateExp > lastDay ? lastDay : item.dateExp; //?

  //   for(let i = start.getDate(); i <= last.getDate(); i++){
  //      let newItem = {
  //       id: item.id,
  //       title: item.title,
  //       dateIn: item.dateIn < new Date(year.value, month.value, i) ? null : item.dateIn,
  //       dateExp: item.dateExp > new Date(year.value, month.value, i) ? null : item.dateExp,
  //   }
  //       testObj.value[i] ? testObj.value[i].push(newItem) : testObj.value[i] = [newItem];
  //   }
  //   // if(item.dateIn.getDate() < firstDay){
  //   //     testObj.value[firstDay] ? testObj.value[firstDay].push(item) : testObj.value[item.dateIn.getDate()] = [item];
  //   // }
  //   // testObj.value[item.dateIn.getDate() < firstDay ? firstDay : item.dateIn.getDate()] ? testObj.value[item.dateIn.getDate()].push(item) : testObj.value[item.dateIn.getDate()] = [item];
  // }
  // console.log("test",testObj);
})
const calendarObj = ref({})
watch([() => year.value, () => month.value], ([newYear, newMonth]) => {
  console.log(`${monthInYear[newMonth]} ${newYear} `)
  getDaysInMonth();
  getFirstDayOfMonth();
  setCalendarObj();
})
onBeforeMount(() => {
  getDaysInMonth();
  getFirstDayOfMonth();
});

const setCalendarObj = () => {
  calendarObj.value = {};
  const firstDay = new Date(year.value, month.value, 1);
  const lastDay = new Date(year.value, month.value + 1, 0, 23, 59, 59);
  let events = fakeDB.getEventsByDate(firstDay, lastDay);
  for (let event of events) {
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
const incrementMonth = () => {

  month.value === 11 ? (month.value = 0, year.value++) : month.value++;
}
const decrementMonth = () => {
  month.value === 0 ? (month.value = 11, year.value--) : month.value--;
}
</script>
<style lang="">
    
</style>
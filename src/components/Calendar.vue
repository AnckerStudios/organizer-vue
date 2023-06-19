<template lang="">
    <div class=" bg-emerald-50">
      <div class="flex justify-between">
        <span @click="decrementMonth" class="material-symbols-rounded select-none cursor-pointer"> chevron_left </span>
        {{ monthInYear[month] }} {{ year }}
        <span @click="incrementMonth" class="material-symbols-rounded select-none cursor-pointer"> chevron_right </span>
      </div>
      <div class="grid grid-cols-7 w-full border-b border-r border-emerald-600">
        <div v-for="(day, index) in firstDayInCurMonth" :key="day" class="border-t border-l border-emerald-600 w-40">
        
        </div>
        <div v-for="(day, index) in daysInCurMonth" class="border-t border-l border-emerald-600 w-40 pb-1 px-1 max-h-72 overflow-hidden" :key="day">
        {{day}}
          <div v-if="getEventsObj[year] && getEventsObj[year][month] && getEventsObj[year][month][day]"  class="flex flex-col gap-1 overflow-y-auto box-content">
            <Event v-for="(event, index) in getEventsObj[year][month][day]" :key="event.id" :event="event"/>
          </div>
      

        </div>
        <div v-for="(item, index) in 42-daysInCurMonth-firstDayInCurMonth" class="border-t border-l border-emerald-600 w-40">

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

onMounted(()=>{
  console.log("загрузка",getEventsByDate(new Date(year,month)));
  console.log()
})

watch([() => year.value, () => month.value], ([newYear, newMonth]) => {
  console.log(`x is ${newYear} ${newMonth}`)
  getDaysInMonth();
  getFirstDayOfMonth();
})
onBeforeMount(() => {
  getDaysInMonth();
  getFirstDayOfMonth();
});
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
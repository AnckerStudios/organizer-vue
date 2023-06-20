<template lang="">
  <div>
    <Calendar/>
    <div class="p-2 border">
      <MyButton @click="isModalOpen=true">Create</MyButton>
    </div>
    <div class="p-2 border">
      <div v-for="(e, index) in getEvents" :key="e.id">{{e.title}}</div>
    </div>
    <Modal v-if="isModalOpen" @close="isModalOpen=false" @saveEvent="saveEvent"/>
    
  </div>
</template>
<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";

import Modal from "../components/Modal.vue";
import MyButton from "../components/MyButton.vue";
import Calendar from "../components/Calendar.vue";
import { storeToRefs } from 'pinia';
import { useEventsStore } from "../stores/events";
import { useFakeDBStore } from "../stores/fakeDB";

const store = useEventsStore();
const fakeDB = useFakeDBStore();
onMounted(()=>{
  console.log("загрузка");
  console.log("ff", fakeDB.$subscribe);
})
const newEvent = ref({
  title: "",
  range: {
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10),
}
})
const curDay = ref(new Date().getDate());
const daysInCurMonth = ref(0);
const firstDayInCurMonth = ref(0);

const { getEventsObj } = storeToRefs(store)
const { getEvents } = storeToRefs(fakeDB)
console.log("fsd",store);

// const { name, doubleCount } = storeToRefs(store);
// const { increment } = store;
const isModalOpen = ref(false);
const dataObj = store.getEventsObj;




const saveEvent = (event) => {
  isModalOpen.value = false;
  console.log("event",event);
  console.log("new event", fakeDB.saveEvent(event));
};

</script>
<style lang=""></style>

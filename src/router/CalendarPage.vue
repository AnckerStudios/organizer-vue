<template lang="">
  <div class="max-w-4xl mx-auto">
    <Calendar/>
    <!-- <div class="p-2 border">
      <MyButton @click="isModalOpen=true">Create</MyButton>
    </div> -->
    <!-- <div class="p-2 border">
      <div v-for="(e, index) in getEvents" :key="e.id">{{e.title}}</div>
    </div> -->
    <!-- <Modal v-if="isModalOpen" :event="editableEvent" @close="isModalOpen=false" @saveEvent="saveEvent"/> -->
    
  </div>
</template>
<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";

import Modal from "../components/Modal.vue";
import MyButton from "../components/MyButton.vue";
import Calendar from "../components/Calendar.vue";
import { storeToRefs } from 'pinia';
import { useFakeDBStore } from "../stores/fakeDB";

const fakeDB = useFakeDBStore();
// onMounted(() => {
//   console.log("загрузка");
//   console.log("ff", fakeDB.$subscribe);
// })
// const editableEvent = ref(null)

// const onCreate = () => {
//   const now = new Date();
//   editableEvent.value = {
//     id: "",
//     title: "",
//     dateIn: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
//     timeIn: `${now.getHours()}:${now.getMinutes()+1}`,
//     dateExp: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
//     timeExp: `${now.getHours()}:${now.getMinutes()+1}`,
//     color: "#fdba74"
//   };
//   isModalOpen.value = true
// }
// const onEdit = (event) => {
//   editableRecord.value = JSON.parse(JSON.stringify(event));
//   isModalOpen.value = true
// }
// const newEvent = ref({
//   title: "",
//   range: {
//     start: new Date(2020, 0, 6),
//     end: new Date(2020, 0, 10),
//   }
// })


// const curDay = ref(new Date().getDate());
// const daysInCurMonth = ref(0);
// const firstDayInCurMonth = ref(0);
// const { getEvents } = storeToRefs(fakeDB)
// console.log("fsd", store);

// // const { name, doubleCount } = storeToRefs(store);
// // const { increment } = store;
// const isModalOpen = ref(false);
// const dataObj = store.getEventsObj;




// const saveEvent = (event) => {
//   isModalOpen.value = false;
//   console.log("event", event);
//   console.log("new event", fakeDB.saveEvent(event));
// };

</script>
<style lang=""></style>

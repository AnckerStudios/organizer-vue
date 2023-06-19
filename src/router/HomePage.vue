<template lang="">
    <div class="flex gap-10 justify-center h-[1000px]">
        <div class=" bg-indigo-200 rounded-md h-40 w-40">

        </div>
        <div class=" bg-indigo-200 rounded-md h-40 w-40">
            <DatePicker v-model.range="newEvent.range" mode="dateTime" is24hr />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
const newEvent = ref({
  title: "",
  range: {
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 10),
}
})
const date = ref();
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})
</script>
<style lang="">
    
</style>
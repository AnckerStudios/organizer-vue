<template lang="">
    <div class="bg-black/70 fixed inset-0 z-20" @click.self="close">
        <div class="bg-white max-w-sm mx-auto my-20 rounded-2xl p-4 flex flex-col gap-2">
            <h1 class=" text-2xl font-bold">Создание события</h1>
            <textarea class="w-full p-1 px-2" placeholder="введите название события" v-model="event.title" maxlength="256" ></textarea>
            <!-- <VueDatePicker :model-value="event.dateIn" @update:model-value="changeDateIn" locale="ru" auto-apply :format="format"/>
            <VueDatePicker :readonly="isFullDay" v-model="event.dateExp" locale="ru" auto-apply :format="format"/> -->
            <div class="flex gap-4">            
                <input type="date" class=" outline-none border-b-2 border-b-transparent focus:border-blue-500" v-model="event.dateIn"/>
                в
                <input type="time"  v-model="event.timeIn"/>
            </div>
 
            <div class="">
                <input type="checkbox" id="checkbox" :value="isFullDay" @click="clickFullDay"> Весь день
            </div>
            <div>
                {{event}}
            </div>
            <div class="flex gap-2">
                <button class="w-1/2 bg-gray-100 rounded px-4 p-2">Отмена</button>
            <button class="w-1/2 bg-blue-100 rounded px-4 p-2" @click="submit">Сохранить</button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFakeDBStore } from "../stores/fakeDB";
const fakeDB = useFakeDBStore();
const emit = defineEmits(['close','saveEvent']);
const isFullDay = ref(false);
const test = (event)=>{
    console.log(event);
}
const event = ref({
    title: "",
    dateIn: new Date(),
    timeIn: null,
    dateExp: new Date(new Date().setDate(new Date().getDate() + 7)),
    timeIn: null
})
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const min = date.getMinutes();
  const addZero = (num) => (num > 9 ? num : "0"+num);
  return `${addZero(day)}.${addZero(month)}.${year} | ${addZero(hours)}:${addZero(min)}`;
}

const clickFullDay = ()=>{
    event.value.dateIn.setHours(23,59);
    event.value.dateExp = event.value.dateIn;
    isFullDay.value = !isFullDay.value
}

const changeDateIn = (e) => {
    console.log(e);
    event.value.dateIn = e;
    if(isFullDay.value){
        event.value.dateExp = e
    }
}
const close = () => {
    emit('close')
}
const submit = () => {
    emit('saveEvent', event);
}
</script>
<style lang="">
    
</style>
<template lang="">
<div class="bg-black/70 fixed inset-0 z-20" @click.self="close">
        <div class="bg-white max-w-lg mx-auto my-20 rounded-2xl p-8 flex flex-col gap-2">
            <h1 class=" text-2xl font-bold">Создание задания</h1>
            <textarea class="w-full p-1 px-2" placeholder="Название" v-model="record.name" maxlength="256" ></textarea>
            <textarea class="w-full p-1 px-2" placeholder="Описание" v-model="record.description" maxlength="2048" ></textarea>
            <div>
                <div v-if="load" class="">
                    Загрузка
                </div>
                <select v-else-if="events.length" class="w-full p-1 px-2" v-model="todo.event" >
                    <option value="null">Нет</option>
                    <option v-for="(event, index) in events" :key="event.id" :value="event.id">{{event.title}}</option>
                </select>
                {{todo}}
            </div>
            
            <!-- <VueDatePicker :model-value="event.dateIn" @update:model-value="changeDateIn" locale="ru" auto-apply :format="format"/>
            <VueDatePicker :readonly="isFullDay" v-model="event.dateExp" locale="ru" auto-apply :format="format"/> -->
            
            <div class="flex gap-2">
                <button class="w-1/2 bg-gray-100 rounded px-4 p-2">Отмена</button>
            <button class="w-1/2 bg-blue-100 rounded px-4 p-2" @click="submit">Сохранить</button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { useFakeDBStore } from "../stores/fakeDB";
import { responseDelay } from "../config";
const fakeDB = useFakeDBStore();
const emit = defineEmits(['close','save']);
const load = ref("download");
const events = ref([]);
const props = defineProps({
    record: Object
})
onMounted(() => {
const myPromise = new Promise((resolve, reject) => {
    load.value = "download";
    setTimeout(() => {
        resolve(fakeDB.events);
    }, responseDelay);
});
myPromise.then(res => {
    console.log("dsad", res);
    events.value = JSON.parse(JSON.stringify(res));
    load.value = "";
});

})

const todo = ref({
    name: "",
    description: "",
    event: null,
})

const close = () => {
    emit('close')
}
const submit = () => {
    emit('save', todo);
}
</script>
<style lang="">
    
</style>
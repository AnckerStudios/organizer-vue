<template lang="">
    <div class="rounded-2xl bg-white p-4 shadow-md w-full">
        <div class="flex justify-between gap-4 px-4">
            <div class=" min-w-[10rem] max-w-sm w-40 p-1 py-2 border-r">Наименование</div>
            <div class="flex-grow min-w-[10rem] p-1 py-2 border-r">Описание</div>
            <div class="flex-grow min-w-[7rem] max-w-[12rem] p-1 py-2 border-r">Событие</div>
            <div class="w-20 p-1 py-2 ">Статус</div>
            <div v-if="isEditable" class="w-40 p-1 py-2 "><MyButton @click="onCreate">Создать</MyButton></div>
        </div>
        <div v-if="todos.length" class="flex flex-col">
            <div v-for="(todo, index) in todos" :key="todo.id" class="py-1 "> 
                <div class="flex justify-between items-center px-4  rounded-2xl"  :class="todo.status && 'bg-green-100'">
                    <div class=" min-w-[10rem] max-w-sm w-40 p-1 py-2 font-bold">{{todo.name}}</div>
                    <div class="flex-grow min-w-[10rem] p-1 py-2 ">{{todo.description}}</div>
                    <div class="flex-grow min-w-[7rem] max-w-[12rem] p-1 py-2 ">
                        <div v-if="todo.event" @click="onViewEvent(todo.event)" class="px-4 rounded-lg text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap" :style="{
                            backgroundColor: todo.event.color,
                        }">{{todo.event.title}}</div>
                    </div>
                    <div class="w-20 p-1 py-2 ">{{todo.status}}</div>
                    <div v-if="isEditable" class="w-40 p-1 py-2 flex gap-2">
                        <MyButton @click="onEdit(todo)">Р</MyButton>
                        <MyButton @click="delToDo(todo.id)">Х</MyButton>
                    </div>
                </div>

            </div>
        </div>
        <div v-else>Задач пока нет </div>
        <ModalToDo v-if="isModalToDoOpen" :record="editableRecord" @close="isModalToDoOpen=false" @save="saveToDo"/>
        <Modal v-if="isModalEventOpen" :event="editableEvent"  @close="isModalEventOpen=false" :read="true"/>
        {{editableRecord}}
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import MyButton from './MyButton.vue';
import ModalToDo from './ModalToDo.vue'
import Modal from './Modal.vue';
import { useFakeDBStore } from "../stores/fakeDB";
import { responseDelay } from "../config.js";
import { storeToRefs } from 'pinia';
const fakeDB = useFakeDBStore();


const props = defineProps({
    isEditable: Boolean
});
const isModalToDoOpen = ref(false);
const isModalEventOpen = ref(false);
const todos = ref([]);
const load = ref("download")
const editableRecord = ref(null)
const editableEvent = ref(null)
onMounted(() => {
    const myPromise = new Promise((resolve, reject) => {
        load.value = "download";
        setTimeout(() => {
            resolve(fakeDB.findAllToDo());
        }, responseDelay);
    });
    myPromise.then(res => {
        console.log("dsad", res);
        todos.value = JSON.parse(res);
        load.value = "";
    });

})
const saveToDo = () => {
    isModalToDoOpen.value = false;
    console.log("value",editableRecord.value);
    let a = JSON.parse(fakeDB.saveToDo(JSON.stringify(editableRecord.value)))
    console.log("a",a);
    todos.value = todos.value.filter(x=>x.id!==a.id);
    todos.value.push(a)
};

const delToDo = (id) => {
    console.log("хы");
    todos.value = todos.value.filter(x => x.id !== id);
    fakeDB.delToDo(id);
}
const onCreate = () => {
    editableRecord.value = {
        id: "",
        name: "",
        description: "",
        event: null,
    };
    isModalToDoOpen.value=true
}
const onEdit = (todo) => {
    editableRecord.value = JSON.parse(JSON.stringify(todo));
    editableRecord.value.event = todo.event.id

    isModalToDoOpen.value=true
}
const onViewEvent = (event) => {
    editableEvent.value = JSON.parse(JSON.stringify(event));
    isModalEventOpen.value=true
}
const editToDo = (todo) => {
    console.log(todo);
    editRecord.value = todo;
    console.log(editRecord);

    isModalToDoOpen.value = true;
    // todos.value = todos.value.filter(x=>x.id !== id);
    // fakeDB.delToDo(id);
}
</script>
<style lang="">
    
</style>
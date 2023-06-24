<template lang="">
    <div class="rounded-2xl bg-white p-4 shadow-md w-full h-full">
        <div class="flex justify-between px-4">
            <div class=" min-w-[10rem] max-w-sm w-40 p-2 py-2 border-r font-bold">Наименование</div>
            <div class="flex-grow min-w-[10rem] p-2 py-2 border-r font-bold">Описание</div>
            <div class="flex-grow min-w-[7rem] max-w-[12rem] p-2 py-2 border-r font-bold">Событие</div>
            <div class="w-20 p-2 py-2 font-bold">Статус</div>
            <div v-if="isEditable" class="w-36 p-2 py-2 "><MyButton @click="onCreate">Создать</MyButton></div>
        </div>
        <div v-if="todos.length" class="flex flex-col">
            <div v-for="(todo, index) in (isEditable ? todos : todos.slice(0,3))" :key="todo.id" class="py-1 "> 
                <div class="flex justify-between items-center px-4  rounded-2xl"  :class="todo.completionDate && 'bg-green-100'">
                    <div class=" min-w-[10rem] max-w-sm w-40 p-2 py-2 font-bold border-r">{{todo.name}}</div>
                    <div class="flex-grow min-w-[10rem] p-2 py-2  border-r">{{todo.description}}</div>
                    <div class="flex-grow min-w-[7rem] max-w-[12rem] p-2 py-2  border-r">
                        <div v-if="todo.event" @click="onViewEvent(todo.event)" class="px-4 rounded-lg text-white font-bold overflow-hidden text-ellipsis whitespace-nowrap" :style="{
                            backgroundColor: todo.event.color,
                        }">{{todo.event.title}}</div>
                    </div>
                    <div class="w-20 p-2 py-2 ">
                        <input class="w-4 h-4" type="checkbox" id="checkbox" :checked="!!todo.completionDate" @change="statusChange(todo)"> 
                    </div>
                    <div v-if="isEditable" class="w-36 p-1 py-2 flex gap-2">
                        <MyButton @click="onEdit(todo)"><span class="material-symbols-rounded">edit</span></MyButton>
                        <MyButton @click="delToDo(todo.id)"><span class="material-symbols-rounded">delete</span></MyButton>
                    </div>
                </div>

            </div>
            <div v-if="!isEditable && todos.length - 3 > 0" class="text-center font-bold">И еще  {{todos.length - 3}}</div>
            
        </div>
        <div v-else>Задач пока нет</div>
        <ModalToDo v-if="isModalToDoOpen" :record="editableRecord" @close="isModalToDoOpen=false" @save="saveToDo"/>
        <Modal v-if="isModalEventOpen" :event="editableEvent"  @close="isModalEventOpen=false" :read="true"/>
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
const statusChange = (todo) => {
    console.log("todo",todo);
    editableRecord.value = JSON.parse(JSON.stringify(todo));
    if(editableRecord.value.event){
        editableRecord.value.event = editableRecord.value.event.id;
    }
    const now = new Date();
    // editableRecord.value.status = !todo.status;
    editableRecord.value.completionDate = todo.completionDate ? "" : `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)}`;
    saveToDo();
    // todos.value = todos.value.filter(x=>x.id !== id);
    // fakeDB.delToDo(id);
}
</script>
<style lang="">
    
</style>
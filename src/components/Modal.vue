<template lang="">
    <div class="bg-black/70 fixed inset-0 z-20" @click.self="close">
        <div class="bg-white max-w-sm mx-auto my-20 rounded-2xl px-6 py-4 flex flex-col gap-2">
            <h1 class=" text-2xl font-bold">Создание события</h1>
            <div >
                <p class=" text-sm">Событие</p> 
                <textarea :readonly="read" class="w-full p-1 px-4 bg-blue-50 rounded-t-2xl  border-b-2  border-blue-500 outline-none" placeholder="Введите название" v-model="event.title" maxlength="256" ></textarea>
            </div>
            <div class=" ">
                <p class=" text-sm">Цвет</p> 
                <div class="flex justify-between px-4">
                    <div v-for="(color, index) in colorArray" @click="changeColor(color)" :key="color" class="material-symbols-rounded w-8 h-8 rounded-lg font-bold text-xl text-white flex justify-center items-center" :style="{
                        backgroundColor: color,
                        cursor: read ? 'auto' : 'pointer'
                    }">{{color === event.color ? 'done':''}}</div>
                </div>
            </div>
            <!-- <VueDatePicker :model-value="event.dateIn" @update:model-value="changeDateIn" locale="ru" auto-apply :format="format"/>
            <VueDatePicker :readonly="isFullDay" v-model="event.dateExp" locale="ru" auto-apply :format="format"/> -->
            <div class=" ">
                <p class=" text-sm">Начало</p> 
            <div class="flex gap-4 justify-between px-4 py-2 bg-blue-50 rounded-t-2xl  border-b-2 border-blue-500 ">   
                         
                <input :readonly="read" type="date" class=" outline-none bg-transparent" :value="event.dateIn" @change="changeDateIn"/>
                <div>
                    в
                <input :readonly="read" type="time" class=" outline-none bg-transparent" v-model="event.timeIn"/>
                </div>
                
            </div>
            </div>
            
            <div class=" ">
                <p class=" text-sm">Конец</p> 
            <div class="flex gap-4 justify-between px-4 py-2 bg-blue-50 rounded-t-2xl  border-b-2 border-blue-500 ">   
                         
                <input :readonly="read || event.isFullDay" type="date" class=" outline-none bg-transparent" v-model="event.dateExp"/>
                <div>
                    в
                <input :readonly="read || event.isFullDay" type="time" class=" outline-none bg-transparent" v-model="event.timeExp"/>
                </div>
                
            </div>
            </div>
            <div class="flex justify-center items-center gap-2">
                <input v-if="!read" class="w-4 h-4" type="checkbox" id="checkbox" :value="event.isFullDay" @click="clickFullDay"> Весь день
            </div>
            
            <div>
                {{event}}
            </div>
            <div v-if="!read" class="flex gap-2">
                <button class="w-1/2 bg-gray-100 rounded px-4 p-2" @click="close">Отмена</button>
            <button class="w-1/2 bg-blue-100 rounded px-4 p-2" @click="submit">Сохранить</button>
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFakeDBStore } from "../stores/fakeDB";
import {colorArray} from "../config.js"
const fakeDB = useFakeDBStore();
const emit = defineEmits(['close','saveEvent']);
const isFullDay = ref(false);
const test = (event)=>{
    console.log(event);
}

const props = defineProps({
    event: Object,
    read: Boolean
})
// const event = ref({
//     title: "",
//     dateIn: new Date(),
//     timeIn: null,
//     dateExp: new Date(new Date().setDate(new Date().getDate() + 7)),
//     timeIn: null
// })

const clickFullDay = ()=>{
    props.event.timeExp = '23:59';
    props.event.dateExp = props.event.dateIn;
    props.event.isFullDay = !props.event.isFullDay
}

const changeDateIn = (e) => {
    props.event.dateIn = e.target.value;
    if(props.event.isFullDay)
        props.event.dateExp = e.target.value
}
const close = () => {
    emit('close')
}
const submit = () => {
    if(!props.event.timeExp)
        return
    if(!props.event.timeIn)
        return
    if(!props.event.dateExp)
        return
    if(!props.event.dateIn)
        return
    if(!props.event.timeExp)
        return
    if(!props.event.title)
        return
    emit('saveEvent');
}
const changeColor = (color) => {
    if(!props.read) 
        props.event.color=color 
}
</script>
<style lang="">
    
</style>
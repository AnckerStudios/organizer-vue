<template lang="">
    <div class=" bg-white rounded-3xl p-4 shadow-md w-[17rem] relative min-h-[120px]">
        <div v-if="load" class="absolute inset-0 bg-white/80 z-10 rounded-3xl flex justify-center items-center">
            <div class="h-20 w-20 rounded-full border-4 border-x-transparent  border-y-blue-500 animate-spin">
                
            </div>
            <span class="material-symbols-rounded absolute text-5xl text-blue-500">
                    {{load}}
            </span>
        </div>
        <div v-if="profile" class="flex flex-col gap-4">
            <div>
                <div class="h-60 w-60 relative">
                    <img :src="previewImage" class="rounded-2xl object-cover h-60 w-60 bg-blue-200" /> 
                    <input class="hidden" type="file" accept="image/jpeg" @change="changeImage" ref="inputEl"/>
                    <div class="absolute bottom-2 left-2 right-2">
                        <MyButton v-if="state" @click="func2" >
                        Загрузить <span class="material-symbols-rounded">download</span>
                    </MyButton>
                    </div>
                    
                </div>
                

                <div class="border-b-2 py-1 group" :class="state && 'border-blue-400'" >
                    <p class=" text-sm text-gray-400">Фамилия:</p>
                    <input :readonly="!state" class=" text-xl outline-none" v-model="profile.lastName"/>
            
                </div>
                <div class="border-b-2 py-1" :class="state && 'border-blue-400'">
                    <p class=" text-sm text-gray-400">Имя:</p>
                    <input :readonly="!state" class=" text-xl outline-none" v-model="profile.firstName"/>

                </div>
                <div class="border-b-2 py-1" :class="state && 'border-blue-400'">
                    <p class=" text-sm text-gray-400">Отчество:</p>
                    <input :readonly="!state" class=" text-xl outline-none" v-model="profile.patronymic"/>

                </div>
                <div class="flex gap-2 justify-between">
                    <div class="border-b-2 py-1 mt-4" :class="state && 'border-blue-400'">
                        <p class=" text-sm text-gray-400">Дата рождения:</p>
                        <input type="date" :readonly="!state" class=" text-xl outline-none" v-model="profile.birthDate"/>

                    </div>
                    <div class="border-b-2 py-1 mt-4">
                        <p class=" text-sm text-gray-400">Возраст:</p>
                        <p class=" text-xl text-end">{{Math.floor((new Date()-new Date(profile.birthDate))/(1000*60*60*24*365.25))}}</p>
                    </div>
                </div>
                
            </div>
            <MyButton v-if="!state" @click="func">Редактировать</MyButton>
            <div v-else class="flex gap-2">
                <MyButton @click="cancel" class="w-14">✕</MyButton>
                <MyButton @click="save">Сохранить</MyButton>
            </div>
        </div>
            
            
        </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import MyButton from '../components/MyButton.vue'
import { useFakeDBStore } from "../stores/fakeDB";
import { responseDelay } from "../config.js";
const fakeDB = useFakeDBStore();

const state = ref(false)
const load = ref("download")
const currentImage = ref(undefined);
const previewImage = ref(undefined);
const inputEl = ref(null);
const profile = ref(undefined);
const oldProfile = ref(undefined);
onMounted(() => {

    const myPromise = new Promise((resolve, reject) => {
        load.value = "download";
        setTimeout(() => {
            resolve(fakeDB.profile);
        }, responseDelay);
    });
    myPromise.then(res => {
        console.log("dsad", res);
        profile.value = JSON.parse(JSON.stringify(res));
        previewImage.value = profile.value.img || 'https://placekitten.com/800/800'
        oldProfile.value = JSON.parse(JSON.stringify(res));
        load.value = "";
    });
    
})

const changeImage = (event) => {
    console.log("event",event);
    profile.value.img = URL.createObjectURL(event.target.files[0]);
    previewImage.value = URL.createObjectURL(event.target.files[0]);
}
const func = () => {
        state.value = true;
        console.log("dsdsds");
}
const func2 = () => {
        console.log(inputEl);
        inputEl.value.click();
}
const save = () => {
    state.value = false;
    const myPromise = new Promise((resolve, reject) => {
        load.value = "save";
        setTimeout(() => {
            fakeDB.saveProfile(profile.value);
            resolve(profile.value);
        }, responseDelay);
    });
    myPromise.then(res => {
        console.log("dsad", res);
        profile.value = JSON.parse(JSON.stringify(res));
        oldProfile.value = JSON.parse(JSON.stringify(res));
        load.value = "";
    });
}
const cancel = () => {
    state.value = false;
    profile.value = JSON.parse(JSON.stringify(oldProfile.value));
    previewImage.value = profile.value.img || 'https://placekitten.com/800/800';
}
</script>
<style lang="">
    
</style>
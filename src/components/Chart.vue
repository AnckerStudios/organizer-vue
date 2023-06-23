<template>
    
    <div class="w-[1000px]">
        <Bar v-if="load"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    </div>
  </template>
  
  <script setup>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { responseDelay } from '../config'
import { useFakeDBStore } from "../stores/fakeDB";
import { onMounted, ref } from 'vue';
const fakeDB = useFakeDBStore();
  ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)
  
  const load = ref("");
  const gg= ref({});
        const chartData = ref( {
            labels: [ ],
          datasets: [ { data: [] } ]
        });
        const chartOptions = ref({
          responsive: true
        });

    onMounted(()=>{
        const myPromise = new Promise((resolve, reject) => {
        // load.value = "download";
        setTimeout(() => {
            resolve(JSON.parse(fakeDB.findAllToDo()));
        }, responseDelay);
    });
    myPromise.then(res => {
        console.log("res",res);
        const arr = res.filter(x=> x.completionDate)
        for(let todo of arr){
            // gg.value[todo.completionDate] ? gg.value[todo.completionDate].push(todo) : gg.value[todo.completionDate] = [todo]; 
            if(gg.value[todo.completionDate]){
                gg.value[todo.completionDate].push(todo);
            }else{
                gg.value[todo.completionDate] = [todo];
                
            }
            
        }
        for(let key in gg.value){
            chartData.value.labels.push(new Date(key).toLocaleDateString());
            chartData.value.datasets[0].data.push(gg.value[key].length)
            console.log("g",gg.value[key]);
        }
        chartData.value.labels.sort();
        console.log("gg",gg);
        load.value = "load"
    });
    })
  
  </script>
<style lang="">
    
</style>
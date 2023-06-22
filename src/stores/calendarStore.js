import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCalendarStore = defineStore('calendarStore', () => {
    let now = new Date();
    const year = ref(now.getFullYear());
    const month = ref(now.getMonth());
    const curDay = ref(now.getDate());

    const getYear = computed(() => year.value);
    const getMonth = computed(() => month.value);
    const getDay = computed(() => curDay.value);

    function incrementMonth(){
      month.value === 11 ? (month.value = 0, year.value++) : month.value++;
    }
    function decrementMonth(){
      month.value === 0 ? (month.value = 11, year.value--) : month.value--;
    }
    function setMonth(val) {
      month.value = val;
    }
  
    function setYear(val) {
      year.value = val;
    }
  
    function resetDate() {
      year.value = new Date().getFullYear();
      month.value = new Date().getMonth();
      curDay.value = new Date().getDate();
    }
    
    return { year, month, curDay, getYear, getMonth, getDay, incrementMonth, decrementMonth, setMonth, setYear, resetDate }
})
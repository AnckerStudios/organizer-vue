import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

export const useFakeDBStore = defineStore("fakeDB", () => {
  const count = ref(0);
  const toDo = ref([
    {
      id: "1",
      name: "Убраться",
      description: "sdasdasdasdas",
      event: 3,
      status: false,
    },
  ]);
  const events = ref([
    {
      id: 1,
      title: "Ужин",
      dateIn: "2023-05-09",
      timeIn: "22:21",
      dateExp: "2023-07-01",
      timeExp: "22:21",
      color: "#fdba74",
    },
    {
      id: 2,
      title: "Рыбалка\nна Волге",
      dateIn: "2023-06-09",
      timeIn: "10:21",
      dateExp: "2023-06-09",
      timeExp: "12:21",
      color: "#fdba74",
    },
    {
      id: 3,
      title: "Отдых",
      dateIn: "2023-06-09",
      timeIn: "22:21",
      dateExp: "2023-06-11",
      timeExp: "23:21",
      color: "#fdba74",
    },
    {
      id: 4,
      title: "Test",
      dateIn: "2023-05-09",
      timeIn: "22:21",
      dateExp: "2023-05-09",
      timeExp: "23:21",
      color: "#fdba74",
    },
  ]);
  const profile = ref({
    img: "",
    firstName: "Илья",
    lastName: "Ермолин",
    patronymic: "Сергеевич",
    birthDate: "2001-09-26",
  });
  const getEvents = computed(() => {
    return events.value;
  });
  const getProfile = computed(() => {
    return JSON.parse(JSON.stringify(profile.value));
  });
  const getEventsByDate = computed(() => {
    return (firstDay, lastDay) => {
      return JSON.stringify(
        events.value.filter(
          (x) =>
            new Date(x.dateIn) <= lastDay && new Date(x.dateExp) >= firstDay
        )
      );
    };
  });
  const saveToDo = computed(() => {
    return (jsonDoTo) => {
      console.log("json", jsonDoTo);
      const newToDo = JSON.parse(jsonDoTo);
      console.log("newToDo", newToDo);

      if (!newToDo.id) {
        newToDo.id = uuidv4();
        console.log(newToDo);
      }
      console.log(toDo.value);
      toDo.value = toDo.value.filter((x) => x.id !== newToDo.id);

      newToDo.status = false;
      toDo.value.push(JSON.parse(JSON.stringify(newToDo)));
      console.log("11", newToDo);

      const event = events.value.find((e) => e.id === newToDo.event);
      newToDo.event = event ? JSON.parse(JSON.stringify(event)) : null;
      console.log("22", newToDo);
      return JSON.stringify(newToDo);
    };
  });
  const findAllToDo = computed(() => {
    return () => {
      const newToDo = toDo.value.map((x) => {
        let y = JSON.parse(JSON.stringify(x));
        const event = events.value.find((e) => e.id === x.event);
        y.event = event ? JSON.parse(JSON.stringify(event)) : null;
        return y;
      });
      console.log("find newToDo", newToDo);
      return JSON.stringify(newToDo);
    };
  });
  const delToDo = computed(() => {
    return (id) => {
      toDo.value = toDo.value.filter((x) => x.id !== id);
    };
  });
  const doubleCount = computed(() => count.value * 2);

  function increment() {
    count.value++;
  };
  const saveEvent = computed(() => {
    return (jsonEvent) => {
      const newEvent = JSON.parse(jsonEvent);
      if (!newEvent.id) {
        newEvent.id = uuidv4();
      }
      events.value = events.value.filter((x) => x.id !== newEvent.id);
      events.value.push(JSON.parse(JSON.stringify(newEvent)));
      return JSON.stringify(newEvent);
    };
  });

  function saveProfile(newProfile) {
    profile.value = newProfile;
  }
  function add() {
    return () => {
      return 1;
    };
  }
  return {
    count,
    toDo,
    events,
    profile,
    getEvents,
    getEventsByDate,
    findAllToDo,
    saveToDo,
    delToDo,
    getProfile,
    doubleCount,
    increment,
    saveEvent,
    saveProfile,
    add,
  };
});

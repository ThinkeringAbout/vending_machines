<template>
  <div class="schedule_container">
    <div class="close_container" @click="this.$emit('buttonClose')">
      Закрыть
    </div>
    <h2>Время работы</h2>
    <p>{{ getTodayAvailability() }}</p>
    <div class="schedule">
      <div
        class="day"
        :class="{ active: this.checkToday(key) }"
        v-for="(item, key) of this.$store.getters.getMachineAddress(
          tradePointId
        )?.workingTime"
      >
        <p class="week_day">{{ getWeekDay(key) }}</p>
        <p class="day_time">{{ getTime(item) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleTimeComponent",
  props: ["tradePointId"],
  emits: ["buttonClose"],
  methods: {
    getWeekDay(key) {
      switch (key) {
        case "mon":
          return "Понедельник";
        case "tue":
          return "Вторник";
        case "wed":
          return "Среда";
        case "thu":
          return "Четверг";
        case "fri":
          return "Пятница";
        case "sat":
          return "Суббота";
        case "sun":
          return "Воскресенье";
        default:
          break;
      }
    },
    getTime(time) {
      if (time) {
        return time.replace(";", " - ");
      }
      return "Выходной";
    },
    getTodayAvailability() {
      const transformedToday = this.getActiveDay;
      const workTime = this.$store.getters.getMachineAddress(this.tradePointId)
        ?.workingTime[transformedToday];
      if (!workTime) {
        return "Закрыто";
      }
      const date = new Date();
      const timeHour = date.getHours();
      const timeMinutes = date.getMinutes();
      if (
        timeHour > Number(workTime.slice(-5, -3)) ||
        timeHour < Number(workTime.slice(0, 2)) ||
        (timeHour == Number(workTime.slice(-5, -3)) &&
          timeMinutes >= Number(workTime.slice(-2, workTime.length)))
      ) {
        return "Закрыто";
      }
      return `Открыто до ${workTime.slice(-5)}`;
    },
    checkToday(day) {
      return this.getActiveDay == day ? true : false;
    },
  },
  computed: {
    getActiveDay() {
      const date = new Date();
      const today = date.getDay();
      const daysObject = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      return daysObject[today];
    },
  },
};
</script>

<style>
.schedule_container {
  padding: 25px;
  margin: 25px;
  color: black;
  position: absolute;
  border: 2px solid black;
  width: 90vw;
  height: 90vh;
  border-radius: 15px;
  background: #fff;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 12px;
}

.schedule {
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.day {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0px 6px;
}

.week_day {
  text-align: left;
  width: 50%;
}

.day_time {
  width: 50%;
  text-align: right;
  font-weight: bold;
}

.active::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgb(66, 110, 231);
  position: absolute;
  left: 0;
  transform: translate(10px, 3px);
}

.close_container {
  position: absolute;
  right: 15px;
  top: 22px;
  width: 60px;
  height: 20px;
  font-weight: bold;
  background-color: rgb(235, 49, 49);
  color: #fff;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
  border-radius: 5px;
}

.close_container:hover {
  cursor: pointer;
  box-shadow: 0 0 5px red;
}
</style>

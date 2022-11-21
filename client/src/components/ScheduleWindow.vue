<template>
  <div class="schedule_mask">
    <div class="schedule_container">
      <div class="close_container" @click="this.$emit('buttonClose')">
        Закрыть
      </div>
      <h2>Время работы</h2>
      <p>{{ getTodayAvailability }}</p>
      <div class="schedule">
        <div
          class="day"
          :class="{ active: this.checkToday(key) }"
          v-for="(item, key) of workingTime"
        >
          <p class="week_day">{{ getWeekDay(key) }}</p>
          <p class="day_time">{{ getTime(item) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleTimeComponent",
  props: ["workingTime"],
  emits: ["buttonClose"],
  methods: {
    getWeekDay(key) {
      const weekDays = {
        "mon": "Понедельник",
        "tue": "Вторник",
        "wed": "Среда",
        "thu": "Четверг",
        "fri": "Пятница",
        "sat": "Суббота",
        "sun": "Воскресенье",
      }
      return weekDays[key];
    },
    getTime(time) {
      if (time) {
        return time.replace(";", " - ");
      }
      return "Выходной";
    },
    checkToday(day) {
      return this.getActiveDay == day ? true : false;
    },
  },
  computed: {
    getTodayAvailability() {
      const transformedToday = this.getActiveDay;
      const workTime = this.workingTime[transformedToday];
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
.schedule_mask {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.76);
}
.schedule_container {
  position: relative;
  top: 0;
  left: 0;
  padding: 20px;
  width: 80vw;
  height: 60vh;
  color: black;
  border: 4px solid black;
  border-radius: 15px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 11px;
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
  transform: translate(15px, 3px);
}

.close_container {
  position: absolute;
  right: 15px;
  top: 34px;
  width: 50px;
  font-size: 8px;
  height: 20px;
  font-weight: bold;
  background-color: rgb(235, 49, 49);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s ease;
  border-radius: 5px;
  border: 2px solid black;
}

.close_container:hover {
  cursor: pointer;
  box-shadow: 0 0 5px red;
}
</style>

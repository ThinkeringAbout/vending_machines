<template>
  <div class="schedule_container">
    <h2>Время работы</h2>
    <p>Открыто {{ getTodayAvailability(tradePointId) }}</p>
    <div class="schedule">
      <div
        class="day"
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
    getTodayAvailability(tradePointId) {
      const date = new Date();
      const today = date.getDay();
      const transformedToday =
        today == 0
          ? "sun"
          : today == 1
          ? "mon"
          : today == 2
          ? "tue"
          : today == 3
          ? "wed"
          : today == 4
          ? "thu"
          : today == 5
          ? "fri"
          : "sat";
      const workTime = String(this.$store.getters.getMachineAddress(tradePointId)?.workingTime[transformedToday]);
      if (!workTime) {
        return 'Закрыто';
      }
      return `Открыто до ${workTime.slice(-4, 0)}`;
    },
  },
};
</script>

<style>
.schedule_container {
  padding: 5px 15px;
  color: black;
  position: absolute;
  width: 300px;
  height: 400px;
  border: 2px solid black;
  border-radius: 15px;
  background: #fff;
  top: calc(50% - 150px);
  left: calc(50% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.schedule {
  height: 70%;
  width: 100%;
  border: 1px solid black;
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
}

/* .day::before {
    content: "*";
    position: absolute;
    left: 0;
    transform: translate(20px, 1px);
} */
</style>

<template>
  <div class="input_container">
    <h1>Список</h1>
    <input class="search_input" type="text">
  </div>
  <div class="list">
    <div class="wrapper custom_scroll">
      <div v-for="item in this.vendingMachines" :key="item.id" class="list__item">
        <div class="item__info">
          <div class="item_id">
            <p>#{{ item.serialNumber }}</p>
            <div class="item_tags">
              <div class="tag" :style="getStyles(tag)" v-for="tag in this.$store.getters.getMachineTags(item.id)?.tags">{{ getReadableTag(tag) }}</div>
            </div>
          </div>
          <div class="item_address">
            <p>{{ this.$store.getters.getMachineAddress(item.tradePointId)?.location.address }}</p>
          </div>
          <div class="item_floor">
            <p>Этаж: {{ item.floor }}</p>
          </div>
          <div class="item_time">
            <p>Время работы</p>
          </div>
        </div>
        <div class="item__geo">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    vendingMachines() {
      return this.$store.state.vendingMachines;
    },
  },
  methods: {
    getReadableTag(tag) {
      switch (tag) {
        case "only_non_cash_payments":
          return "Безнал 💰";          
        case "coffee":
          return "Кофе ☕";
        case "cashier":
          return "Есть кассир 🤵";
        case "hot_chocolate":
          return "Горячий шоколад 🤎";
        case "juices":
          return "Соки 🍊";
        default:
          return "Unknown ❓";
      };
    },
    getStyles(tag) {
      switch (tag) {
        case "only_non_cash_payments":
          return {
            color: 'rgb(18, 197, 33)',
            borderColor: 'rgb(18, 197, 33)',
          };
        case "coffee":
          return {
            color: 'rgb(139, 84, 29)',
            borderColor: 'rgb(139, 84, 29)',
          };
        case "hot_chocolate":
          return {
            color: 'rgb(111, 58, 4)',
            borderColor: 'rgb(111, 58, 4)',
          };
        case "juices":
          return {
            color: 'orange',
            borderColor: 'orange',
          }
        default:
          return {
            color: 'black',
            borderColor: 'black',
          };
      };
    },
  },
  mounted() {
    this.$store.commit('loadVendingMachines');
    this.$store.commit('loadTradePoints');
    this.$store.commit('loadMachineTypes');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

:root {
  --bg-color: #76c893;
  --blue-color: rgb(187, 187, 248);
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Inter';
}

body {
  width: 100%;
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: white;
  text-shadow: 3px 2px 1px black;
}

.input_container {
  width: 800px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.search_input {
  padding: 10px;
  font-family: 'Inter';
  font-weight: bold;
  outline: none;
  border: 2px solid #fff;
  width: 250px;
  border-radius: 15px;
  box-shadow: 3px 3px 1px black;
  transition: border .4s ease-in-out;
}

.input_container input:focus {
  border: 2px solid #000;
}

.list {
  width: 800px;
  margin: 0 auto;
  border: 3px solid black;
  background-color: var(--blue-color);
  height: 90vh;
  border-radius: 20px;
  box-shadow: 6px 3px 3px black;
  padding: 5px;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  overflow-y: auto;
}

.list__item {
  width: 80%;
  min-height: 160px;
  border: 3px solid #000;
  border-radius: 15px;
  background: #fff;
  box-shadow: 4px 3px 3px #000;
  display: flex;
}

.custom_scroll {
  scroll-behavior: smooth;
}

.custom_scroll::-webkit-scrollbar {
  width: 14px;
}

.custom_scroll::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
}

.custom_scroll::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 20px;
}

.custom_scroll::-webkit-scrollbar-thumb:hover {
  border: 1px solid #fff;
}

.item__info {
  height: 100%;
  width: 70%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.item__geo {
  height: 100%;
  width: 30%;
  border-left: 1px solid black;
}

.item_id {
  display: flex;
  align-items: center;
  gap: 5px;
}

.item_id p {
  font-weight: bold;
  font-size: 20px;
}

.item_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  height: 20px;
  border: 2px solid grey;
  color:rgb(111, 58, 4);
  font-weight: bold;
  color: grey;
  padding: 3px;
}

</style>

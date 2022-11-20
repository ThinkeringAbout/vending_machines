<template>
  <div class="input_container">
    <h1>Список</h1>
    <input class="search_input" type="text" />
  </div>
  <div class="list">
    <div class="wrapper custom_scroll">
      <div
        v-for="item in this.vendingMachines"
        :key="item.id"
        class="list__item"
      >
        <MachineComponent :buttonAvailable="this.isModalOpen" :item="item" @modalOpened="this.isModalOpen = true" @modalClosed="this.isModalOpen = false" />
      </div>
    </div>
  </div>
</template>

<script>
import MachineComponent from "./components/MachineComponent.vue";

export default {
  components: { MachineComponent },
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    vendingMachines() {
      return this.$store.state.vendingMachines;
    },
  },

  mounted() {
    this.$store.commit("loadVendingMachines");
    this.$store.commit("loadTradePoints");
    this.$store.commit("loadMachineTypes");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

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
  font-family: "Inter";
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
  font-family: "Inter";
  font-weight: bold;
  outline: none;
  border: 2px solid #fff;
  width: 250px;
  border-radius: 15px;
  box-shadow: 3px 3px 1px black;
  transition: border 0.4s ease-in-out;
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
  width: 90%;
  min-height: 180px;
  max-height: 180px;
  border: 2px solid #000;
  border-radius: 15px;
  background: #fff;
  box-shadow: 4px 3px 3px #000;
  display: flex;
  overflow: hidden;
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
}

.item__geo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  color: rgb(111, 58, 4);
  font-weight: bold;
  color: grey;
  padding: 3px;
}

.item_time {
  width: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-weight: bold;
  border: 2px solid rgb(66, 110, 231);
  color: rgb(66, 110, 231);
  background: #fff;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

.item_time:hover {
  cursor: pointer;
  color: #fff;
  background: rgb(66, 110, 231);
  box-shadow: 3px 2px 2px black;
}

.item_time:disabled {
  color: grey;
  border-color: grey;
  background-color: #fff;
}

.item_time:disabled:hover {
  color: grey;
  border-color: grey;
  cursor:default;
  box-shadow: none;
  background-color: #fff;
}
</style>

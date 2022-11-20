<template>
  <div class="input_container">
    <h1>Торговые автоматы</h1>
    <input
      v-model="this.filterInput"
      class="search_input"
      type="text"
      maxlength="100"
    />
  </div>
  <div class="list">
    <div class="wrapper custom_scroll">
      <div
        v-for="item in this.vendingMachines"
        :key="item.id"
        class="list__item"
      >
        <MachineComponent
          :buttonAvailable="this.isModalOpen"
          :item="item"
          @modalOpened="this.isModalOpen = true"
          @modalClosed="this.isModalOpen = false"
        />
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
      filterInput: "",
    };
  },
  computed: {
    vendingMachines() {
      return this.$store.getters.getMachinesList(this.filterInput);
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
  text-shadow: 2px 1px 1px black;
  font-size: 14px;
}

.input_container {
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
}

.search_input {
  padding: 10px;
  font-family: "Inter";
  font-weight: bold;
  outline: none;
  border: 2px solid #000;
  width: 150px;
  height: 30px;
  border-radius: 15px;
  box-shadow: 3px 3px 1px black;
  transition: border 0.4s ease-in-out;
}


.list {
  width: 100%;
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
  width: 95%;
  min-height: 350px;
  height: fit-content;
  border: 2px solid #000;
  border-radius: 15px;
  background: #fff;
  box-shadow: 4px 3px 3px #000;
  display: flex;
  flex-wrap: wrap-reverse;
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
  height: 50%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 10px;
}

.item__geo {
  height: 180px;
  width: 100%;
}

.item__geo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item_id {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
}

.item_id p {
  font-weight: bold;
  font-size: 10px;
}

.item_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  font-size: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 20px;
  border: 2px solid grey;
  color: rgb(111, 58, 4);
  font-weight: bold;
  color: grey;
  padding: 3px;
}

.item_time {
  width: 100%;
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
  cursor: default;
  box-shadow: none;
  background-color: #fff;
}

@media screen and (min-width: 500px) {
  .schedule_container {
    width: 300px;
    height: 400px;
    top: calc(50% - 150px);
    left: calc(50% - 100px);
    font-size: 14px;
  }
  .active::before {
    transform: translate(10px, 7px);
  }
}

@media screen and (min-width: 850px) {
  .item_time {
    width: 140px;
  }
  .tag {
    font-size: 10px;
    min-width: 50px;
  }
  .item_id p {
    font-size: 20px;
  }
  .list__item {
    min-height: 180px;
    max-height: 180px;
    flex-wrap: nowrap;
  }
  .item__geo {
    height: 100%;
    width: 30%;
  }

  .item__info {
    gap: 15px;
    height: 100%;
    width: 70%;
    font-size: 16px;
  }
  .search_input {
    width: 250px;
  }
  .list,
  .input_container {
    width: 800px;
  }
  h1 {
    font-size: 26px;
    text-shadow: 3px 2px 1px black;
  }
}
</style>

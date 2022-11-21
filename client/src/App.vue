<template>
  <div class="input_container">
    <h1>Торговые автоматы</h1>
    <input
      v-model="this.filterInput"
      class="search_input"
      type="text"
      maxlength="100"
      placeholder="Поиск..."
    />
  </div>
  <div class="list">
    <div class="wrapper custom_scroll">
      <div
        v-for="item in this.vendingMachines"
        :key="item.id"
        class="list__item"
      >
        <MachineCard
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
import MachineCard from "./components/MachineCard.vue";

export default {
  components: { MachineCard },
  data() {
    return {
      isModalOpen: false,
      filterInput: "",
    };
  },
  computed: {
    vendingMachines() {
      return this.$store.getters.filteredMachinesList(this.filterInput);
    },
  },

  mounted() {
    this.$store.dispatch("loadVendingMachines");
    this.$store.dispatch("loadTradePoints");
    this.$store.dispatch("loadMachineTypes");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
button {
  font-family: "Inter", sans-serif;
}

body {
  width: 100%;
  min-height: 100vh;
  background: #d2d0d0;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #fff;
  text-shadow: 1px 0 2px #000, 0 1px 2px #000, -1px 0 2px #000, 0 -1px 2px #000;
  font-size: 12px;
  display: none;
}

.input_container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  margin-bottom: 10px;
  border: 3px solid black;
  box-shadow: 0px 1px 1px black;
  background-color: rgb(66, 110, 231);
  border-radius: 15px;
}

.search_input {
  padding: 10px;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  outline: none;
  border: 3px solid #000;
  width: 100%;
  height: 30px;
  border-radius: 15px;
  box-shadow: 0px 1px 1px black;
  transition: border 0.4s ease-in-out;
}

.list {
  width: 100%;
  margin: 0 auto;
  background-color: #fff;
  height: 88vh;
  border-radius: 15px;
  border: 3px solid black;
  box-shadow: 0px 1px 1px black;
  background-color: rgb(66, 110, 231);
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
  border: 3px solid black;
  box-shadow: 0px 1px 1px black;
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap-reverse;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.custom_scroll {
  scroll-behavior: smooth;
}

.custom_scroll::-webkit-scrollbar {
  width: 10px;
}

.custom_scroll::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
}

.custom_scroll::-webkit-scrollbar-thumb {
  background-color: black;
  border-radius: 20px;
  border: 1px solid #000;
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
  font-size: 12px;
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
  font-size: 14px;
}

.item_tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 46px;
  overflow-y: hidden;
}

.tag {
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 30px;
  height: 20px;
  border: 2px solid grey;
  font-weight: bold;
  color: grey;
  padding: 3px;
  background: #fff;
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
  box-shadow: 1px 1px 2px #fff;
}

.item_time:hover {
  cursor: pointer;
  color: #fff;
  background: rgb(66, 110, 231);
  box-shadow: 1px 1px 2px black;
  transform: scale(1.05);
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
@media screen and (min-width: 300px) {
  h1 {
    display: block;
  }
  .search_input {
    width: 150px;
  }
  .close_container {
    width: 60px;
    font-size: 10px;
  }
}

@media screen and (min-width: 500px) {
  h1 {
    font-size: 14px;
  }
  .schedule_container {
    width: 300px;
    height: 400px;
    font-size: 14px;
    padding: 5 15px;
    margin: 0;
  }
  .active::before {
    transform: translate(13px, 5px);
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
  }
}
</style>

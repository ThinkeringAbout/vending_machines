import { createStore } from "vuex";
import axios from "axios";

const url = "http://localhost:3000";

const store = createStore({
  state() {
    return {
      vendingMachines: [],
    };
  },
  mutations: {
    setVendingMachines(state, array) {
      state.vendingMachines = array;
    },
    setTradePoints(state, array) {
      state.vendingMachines.forEach((machine) => {
        machine.tradePoint = array.find(
          (tradePoint) => machine.tradePointId === tradePoint.id
        );
      });
    },
    setMachineTypes(state, array) {
      state.vendingMachines.forEach((machine) => {
        machine.tags = array.find((types) => machine.typeId === types.id).tags;
      });
    },
  },
  actions: {
    async loadVendingMachines(context) {
      const response = await axios.get(url + "/machines");
      context.commit("setVendingMachines", response.data);
    },
    async loadTradePoints(context) {
      const response = await axios.get(url + "/tradePoints");
      context.commit("setTradePoints", response.data);
    },
    async loadMachineTypes(context) {
      const response = await axios.get(url + "/machineTypes");
      context.commit("setMachineTypes", response.data);
    },
  },
  getters: {
    filteredMachinesList: (state) => (filter) => {
      if (!filter) {
        return state.vendingMachines;
      }
      return state.vendingMachines.filter(
        (item) =>
          item.serialNumber.toLowerCase().includes(filter.toLowerCase()) ||
          item.tradePoint.location.address
            .toLowerCase()
            .includes(filter.toLowerCase())
      );
    },
  },
});

export default store;

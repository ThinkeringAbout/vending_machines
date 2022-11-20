import { createStore } from "vuex";
import axios from 'axios';

const url = 'http://localhost:3000'; 

const store = createStore({
    state() {
        return {
            vendingMachines: [],
            tradePoints: [],
            machineTypes: [],
        };
    },
    mutations: {
        async loadVendingMachines(state) {
            const response = await axios.get(url + '/machines');
            state.vendingMachines = response.data;
        },
        async loadTradePoints(state) {
            const response = await axios.get(url + '/tradePoints');
            state.tradePoints = response.data;
        },
        async loadMachineTypes(state) {
            const response = await axios.get(url + '/machineTypes');
            state.machineTypes = response.data;
        },
    },
    getters: {
        getMachineAddress: (state) => (id) => {
            return state.tradePoints.find(point => point.id === id);
        },
        getMachineTags: (state) => (id) => {
            return state.machineTypes.find(machine => machine.id === id);
        }
    }
})

export default store;
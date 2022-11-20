<template>
  <div class="item__info">
    <div class="item_id">
      <p>#{{ item.serialNumber }}</p>
      <div class="item_tags">
        <div
          class="tag"
          :style="getStyles(tag)"
          v-for="tag in this.$store.getters.getMachineTypes(item.id)?.tags"
        >
          {{ getReadableTag(tag) }}
        </div>
      </div>
    </div>
    <div class="item_address">
      <p>
        {{
          this.$store.getters.getMachineAddress(item.tradePointId)?.location
            .address
        }}
      </p>
    </div>
    <div class="item_floor">
      <p>Этаж: {{ item.floor }}</p>
    </div>
    <button :disabled="buttonAvailable" class="item_time" @click="openModal">
      <p>Время работы</p>
    </button>
  </div>
  <div class="item__geo">
    <img v-if="getAddressOnMap" :src="getAddressOnMap" alt="" />
    <div v-else class="loading_container">
      <div class="loading"></div>
    </div>
  </div>
  <Transition name="time">
    <ScheduleTimeComponent :tradePointId="item.tradePointId" v-if="!this.isModalOpen" @mouseleave="closeModal" @click="closeModal" />
  </Transition>
</template>

<script>
import ScheduleTimeComponent from "./ScheduleTimeComponent.vue";

export default {
  name: "MachineComponent",
  props: ["item", "buttonAvailable"],
  components: { ScheduleTimeComponent },
  emits: ["modalOpened", "modalClosed"],
  data() {
    return {
      isModalOpen: false,
    }
  },
  methods: {
    openModal(event) {
      this.isModalOpen = true;
      this.$emit('modalOpened');
    },
    closeModal() {
      this.isModalOpen = false;
      this.$emit('modalClosed');
    },
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
      }
    },
    getStyles(tag) {
      switch (tag) {
        case "only_non_cash_payments":
          return {
            color: "rgb(18, 197, 33)",
            borderColor: "rgb(18, 197, 33)",
          };
        case "coffee":
          return {
            color: "rgb(139, 84, 29)",
            borderColor: "rgb(139, 84, 29)",
          };
        case "hot_chocolate":
          return {
            color: "rgb(111, 58, 4)",
            borderColor: "rgb(111, 58, 4)",
          };
        case "juices":
          return {
            color: "orange",
            borderColor: "orange",
          };
        default:
          return {
            color: "black",
            borderColor: "black",
          };
      }
    },
  },
  computed: {
    getAddressOnMap() {
      const latitude = this.$store.getters.getMachineAddress(
        this.item.tradePointId
      )?.location.latitude;
      const longitude = this.$store.getters.getMachineAddress(
        this.item.tradePointId
      )?.location.longitude;
      const urlGeo = `http://static.maps.2gis.com/1.0?center=${longitude},${latitude}&zoom=16&size=200,200&markers=${longitude},${latitude}`;
      if (latitude && longitude) {
        return urlGeo;
      }
      return;
    },
  },
};
</script>

<style>
.loading_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.time-enter-active,
.time-leave-active {
  transition: opacity 0.5s ease;
}

.time-enter-from,
.time-leave-to {
  opacity: 0;
}

.loading {
  width: 50px;
  height: 50px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    rotate: 0deg;
  }
  50% {
    rotate: 180deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>

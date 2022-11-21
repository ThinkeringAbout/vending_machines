<template>
  <div class="item__info">
    <div class="item_id">
      <p>#{{ item.serialNumber }}</p>
      <div class="item_tags">
        <div
          class="tag"
          :style="getStyles(tag)"
          v-for="tag in item.tags"
          :key="tag"
        >
          {{ getReadableTag(tag) }}
        </div>
      </div>
    </div>
    <div class="item_address">
      <p>
        {{
          item.tradePoint?.location.address
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
    <img v-if="mapSnapshotUrl" :src="mapSnapshotUrl" alt="map snapshot" />
    <div v-else class="loading_container">
      <div class="loading"></div>
    </div>
  </div>
  <Transition name="time">
    <ScheduleWindow
      @buttonClose="closeModal"
      :workingTime="item.tradePoint.workingTime"
      v-if="this.isModalOpen"
    />
  </Transition>
</template>

<script>
import ScheduleWindow from "./ScheduleWindow.vue";

export default {
  name: "MachineComponent",
  props: ["item", "buttonAvailable"],
  components: { ScheduleWindow },
  emits: ["modalOpened", "modalClosed"],
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      this.$emit("modalOpened");
    },
    closeModal() {
      this.isModalOpen = false;
      this.$emit("modalClosed");
    },
    getReadableTag(tag) {
      const tagsObject = {
        "only_non_cash_payments": "Безнал 💳",
        "coffee": "Кофе ☕",
        "cashier": "Есть кассир 🤵",
        "juices": "Соки 🍊",
        "hot_chocolate": "Горячий шоколад 🤎",
      }
      return tag in tagsObject ? tagsObject[tag] : "Unknown ❓";
    },
    getStyles(tag) {
      const styleObject = {
        color: "",
        borderColor: "",
        boxShadow: "",
      };

      const colorsObject = {
        "only_non_cash_payments": "rgb(18, 197, 33)",
        "coffee": "rgb(139, 84, 29)",
        "cashier": "black",
        "juices": "orange",
        "hot_chocolate": "rgb(111, 58, 4)",
      }

      const mainColor = tag in colorsObject ? colorsObject[tag] : "black";

      styleObject.color = mainColor;
      styleObject.borderColor = mainColor;
      styleObject.boxShadow = `0 0 2px ${mainColor}`;
      return styleObject;
    },
  },
  computed: {
    mapSnapshotUrl() {
      const latitude = this.item.tradePoint?.location.latitude;
      const longitude = this.item.tradePoint?.location.longitude;
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

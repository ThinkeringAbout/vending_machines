<template>
  <div class="item__info">
    <div class="item_id">
      <p>#{{ item.serialNumber }}</p>
      <div class="item_tags">
        <div
          class="tag"
          :style="getStyles(tag)"
          v-for="tag in this.$store.getters.getMachineTags(item.id)?.tags"
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
    <div class="item_time">
      <p>Время работы</p>
    </div>
  </div>
  <div class="item__geo"></div>
</template>

<script>
export default {
  name: "MachineComponent",
  props: ['item'],
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
            }
            ;
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
            ;
        },
    },
};
</script>

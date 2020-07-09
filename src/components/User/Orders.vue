<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="!loading">
        <h1 class="text--secondary mb-5">Заказы</h1>
        <v-list two-line v-if="orders.length !== 0 && !loading">
          <v-list-item v-for="order in orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox color="success" v-model="order.done" @change="() => markDone(order)"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{order.name}}</v-list-item-title>
              <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn class="primary" tile :to="`/ad/${order.adId}`">Открыть</v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col class="text-center pt-5" v-else-if="orders.length === 0 && !loading">
        <h2 class="text--secondary mb-5">Список заказов пуст</h2>
      </v-col>
      <v-col class="text-center pt-5" v-else>
        <v-progress-circular :size="100" :width="7" indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchOrders");
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    markDone(order) {
      this.$store.dispatch("markOrderDone", order.id).then(() => {
        order.done = true;
      });
    },
  },
};
</script>
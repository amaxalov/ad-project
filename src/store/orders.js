import * as firebase from "firebase";

class Order {
  constructor(name, phone, adId, done = false, id = null) {
    this.name = name;
    this.phone = phone;
    this.adId = adId;
    this.done = done;
    this.id = id;
  }
}

export default {
  state: { orders: [] },
  mutations: {
    loadOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async createOrder({ commit }, { name, phone, adId, ownerId }) {
      const newOrder = new Order(name, phone, adId);
      console.log(newOrder);
      commit("clearError");
      try {
        await firebase
          .database()
          .ref(`users/${ownerId}/orders/`)
          .push(newOrder);
      } catch (error) {
        commit("setError", error);
        commit("setLoading", false);
        throw error;
      }
    },
    async fetchOrders({ commit, getters }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        let resultOrders = [];
        await firebase
          .database()
          .ref(`users/${getters.user.id}/orders`)
          .once("value")
          .then(
            function(snapshot) {
              const result = snapshot.val();
              Object.keys(result).forEach((key) => {
                const o = result[key];
                resultOrders.push(
                  new Order(o.name, o.phone, o.adId, o.done, key)
                );
              });
            },
            function(error) {
              commit("setError", error);
            }
          );
        commit("loadOrders", resultOrders);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error);
        commit("setLoading", false);
        throw error;
      }
    },
    async markOrderDone({ commit, getters }, payload) {
      commit("clearError");
      try {
        await firebase
          .database()
          .ref(`users/${getters.user.id}/orders`)
          .child(payload)
          .update({
            done: true,
          });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
  getters: {
    doneOrders: (state) => state.orders.filter((o) => o.done),
    undoneOrders: (state) => state.orders.filter((o) => !o.done),
    orders: (state, getters) => getters.undoneOrders.concat(getters.doneOrders),
  },
};

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import BuyModal from "@/components/Shared/BuyModal";
import * as firebase from "firebase";

Vue.config.productionTip = false;
Vue.component("app-buy-modal", BuyModal);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyD4CD3YjU6ddKKN6iDT8xN6HRTKwsIEtOE",
      authDomain: "ad-vue-project-60d78.firebaseapp.com",
      databaseURL: "https://ad-vue-project-60d78.firebaseio.com",
      projectId: "ad-vue-project-60d78",
      storageBucket: "ad-vue-project-60d78.appspot.com",
      messagingSenderId: "762693039980",
      appId: "1:762693039980:web:bda08dea0e64a150e4a549",
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
    this.$store.dispatch("fetchAds");
  },
}).$mount("#app");

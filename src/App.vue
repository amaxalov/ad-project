<template>
  <v-app id="inspire">
    <v-navigation-drawer app temporary v-model="darwer">
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in links" :key="item.title" :to="item.url">
            <v-list-item-icon>
              <v-icon>mdi-{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onLogout" v-if="isUserLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Выход</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="darwer = !darwer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Заказы V1</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn v-for="item in links" icon :to="item.url" :key="item.title">
          <v-icon>mdi-{{item.icon}}</v-icon>
        </v-btn>
        <v-btn @click="onLogout" icon v-if="isUserLoggedIn">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app></v-footer>
    <template v-if="error">
      <v-snackbar multi-line timeout="5000" @input="closeError" value="true">
        {{ error }}
        <template v-slot:action="{ attrs }">
          <v-btn color="dark" text v-bind="attrs" @click="closeError">Закрыть</v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    darwer: false,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: "Заказы",
            icon: "wallet-travel",
            url: "/orders",
          },
          {
            title: "Новая реклама",
            icon: "newspaper",
            url: "/new",
          },
          {
            title: "Мои рекламы",
            icon: "clipboard-account",
            url: "/list",
          },
        ];
      }
      return [
        {
          title: "Войти",
          icon: "lock",
          url: "/login",
        },
        {
          title: "Регистрация",
          icon: "account-plus",
          url: "/registration",
        },
      ];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>

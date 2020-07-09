<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Почта"
                name="email"
                prepend-icon="mdi-account"
                :rules="emailRules"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                id="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                :rules="passwordRules"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                id="confirmPassword"
                label="Повторите пароль"
                name="confirmPassword"
                prepend-icon="mdi-lock"
                :rules="confirmPasswordRules"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              color="success"
              @click="onSubmit"
            >Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    valid: false,
    emailRules: [
      (v) => !!v || "Почта обязательна",
      (v) => /.+@.+\..+/.test(v) || "Введите почту правильно",
    ],
    passwordRules: [
      (v) => !!v || "Пароль обязателен",
      (v) => v.length >= 6 || "Не менее 6 символов",
    ],
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("registerUser", user)
          .then(() => this.$router.push("/"));
      }
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    confirmPasswordRules() {
      return [
        (v) => !!v || "Повторите пароль",
        (v) => v === this.password || "Пароли не совпадают",
      ];
    },
  },
};
</script>
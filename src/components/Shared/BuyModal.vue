<template>
  <v-dialog v-model="dialog" max-width="590">
    <template v-slot:activator="{ on, attrs }">
      <v-btn raised class="primary" text v-bind="attrs" v-on="on">Купить</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2 class="text--primary">Вы уверены что хотите купить это?</h2>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Имя"
          name="name"
          type="text"
          :rules="[v => !!v || 'Обязательно']"
          v-model="name"
        ></v-text-field>
        <v-text-field
          label="Телефон"
          name="phone"
          type="text"
          :rules="[v => !!v || 'Обязательно']"
          v-model="phone"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="cancel" @click="onClose" :disabled="localLoading" tile>Отмена</v-btn>
        <v-btn
          class="success"
          @click="onBuy"
          :disabled="localLoading"
          :loading="localLoading"
          tile
        >Купить!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["ad"],
  data: function () {
    return {
      dialog: false,
      name: "",
      phone: "",
      localLoading: false,
    };
  },
  methods: {
    onClose() {
      this.name = "";
      this.phone = "";
      this.dialog = false;
    },
    onBuy() {
      if (this.name !== "" && this.phone !== "") {
        this.localLoading = true;
        this.$store
          .dispatch("createOrder", {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId,
          })
          .finally(() => {
            this.name = "";
            this.phone = "";
            this.localLoading = false;
            this.dialog = false;
          });
      }
    },
  },
};
</script>
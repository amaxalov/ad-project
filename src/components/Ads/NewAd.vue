<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text--secondary mb-5">Новый заказ</h1>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="Название"
            name="title"
            :rules="[v => !!v || 'Обязательно']"
            type="text"
            v-model="title"
          ></v-text-field>
          <v-textarea
            name="description"
            auto-grow
            clearable
            rows="2"
            label="Описание"
            hint="Введите описание"
            :rules="[v => !!v || 'Обязательно']"
            v-model="description"
          ></v-textarea>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn class="warning" @click="triggerUpload">
          Загрузить
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <input
          ref="fileInput"
          type="file"
          style="display: none;"
          accept="image/*"
          @change="onFileChange"
        />
      </v-col>
      <v-col cols="12" v-if="imageSrc">
        <img :src="imageSrc" height="100px" alt />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-switch v-model="promo" :label="'Промо'"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          :disabled="!valid || !image || loading"
          :loading="loading"
          class="success"
          @click="createAt"
        >Создать</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: "",
    description: "",
    promo: false,
    valid: false,
    image: null,
    imageSrc: "",
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    createAt() {
      if (this.$refs.form.validate() && this.imageSrc) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image,
        };

        this.$store.dispatch("createAd", ad).then(() => {
          this.$router.push("/list");
        });
      }
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      reader.readAsDataURL(file);
      this.image = file;
    },
  },
};
</script>
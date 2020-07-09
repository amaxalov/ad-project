<template>
  <v-dialog v-model="dialog" max-width="590">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="warning" v-bind="attrs" v-on="on">Редактировать</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h1 class="text--primary">Редактирование</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="title"
          name="title"
          type="text"
          :rules="[v => !!v || 'Обязательно']"
          v-model="editedTitle"
        ></v-text-field>
        <v-textarea
          name="description"
          auto-grow
          clearable
          rows="2"
          label="Описание"
          hint="Введите описание"
          :rules="[v => !!v || 'Обязательно']"
          v-model="editedDescription"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="cancel" @click="onClose" tile>Отмена</v-btn>
        <v-btn class="success" @click="onSave" tile>Сохранить</v-btn>
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
      editedTitle: this.ad.title,
      editedDescription: this.ad.description,
    };
  },
  methods: {
    onClose() {
      this.editedTitle = this.ad.title;
      this.editedDescription = this.ad.description;
      this.dialog = false;
    },
    onSave() {
      if (this.editedTitle !== "" && this.editedDescription !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id,
        });
        this.dialog = false;
      }
    },
  },
};
</script>
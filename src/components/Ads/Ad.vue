<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text--secondary mb-5">Список заказов</h1>
        <v-card v-if="!loading">
          <v-img height="300" :src="ad.image"></v-img>
          <v-card-text>
            <h1 class="text--primary mb-1">{{ad.title}}</h1>
            <p>{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <appEditAdModal :ad="ad" v-if="isOwner"></appEditAdModal>
            <app-buy-modal :ad="ad"></app-buy-modal>
          </v-card-actions>
        </v-card>
        <div v-else>
          <v-progress-circular :size="100" :width="7" indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditAdModal from "./EditAdModal";
export default {
  props: ["id"],
  computed: {
    ad() {
      const id = this.id;
      return this.$store.getters.adById(id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    isOwner() {
      return this.ad.ownerId === this.$store.getters.user.id;
    },
  },
  components: {
    appEditAdModal: EditAdModal,
  },
};
</script>
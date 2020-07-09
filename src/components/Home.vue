<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-carousel>
            <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.image">
              <div class="carousel-link">
                <v-btn class="error" :to="`/ad/${ad.id}`">{{ad.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col v-for="ad in ads" class :key="`${ad.id}_card`" cols="12" sm="6" md="4">
          <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="ad.image">
              <v-card-title>{{ad.title}}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">{{ad.description}}</v-card-subtitle>
            <v-card-actions>
              <v-btn outlined color="success" :to="`/ad/${ad.id}`">Открыть</v-btn>
              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col class="text-center pt-5">
          <v-progress-circular :size="100" :width="7" indeterminate color="primary"></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    promoAds() {
      return this.$store.getters.promoAds;
    },
    ads() {
      return this.$store.getters.ads;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.carousel-link {
  position: absolute;
  bottom: 50px;
  left: 50%;
  background: rgba(0, 0, 0, 0.54);
  transform: translate(-50%, 0);
  padding: 10px 15px;
  border-radius: 5px 5px 0px 0px;
}
</style>
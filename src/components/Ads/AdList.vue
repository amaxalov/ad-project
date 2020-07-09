<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="12" offset-sm="3" offset-md="0">
        <h1 class="text--secondary mb-5">Список заказов</h1>
        <v-card class="`elevation-6 mb-3" v-for="ad in myAds" :key="ad.id">
          <v-row>
            <v-col cols="4">
              <v-img
                width="100%"
                height="100%"
                :src="ad.image"
                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
              ></v-img>
            </v-col>
            <v-col cols="8" class="fuckingVuetify">
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :to="`/ad/${ad.id}`" class="info">Открыть</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
        <div v-if="myAds.length === 0">
          <h2 class="text--primary">Список заказов пуст</h2>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style scoped>
.fuckingVuetify {
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
</style>
import * as firebase from "firebase";

class Ad {
  constructor(title, description, ownerId, image = "", promo, id = null) {
    this.title = title;
    this.description = description;
    this.ownerId = ownerId;
    this.image = image;
    this.promo = promo;
    this.id = id;
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload);
    },
    loadAds(state, payload) {
      state.ads = payload;
    },
    updateAd(state, { title, description, id }) {
      const ad = state.ads.find((i) => i.id === id);
      ad.title = title;
      ad.description = description;
    },
  },
  actions: {
    async createAd({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);
      const image = payload.image;

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          "",
          payload.promo
        );
        const result = await firebase
          .database()
          .ref("ads")
          .push(newAd);
        const imageExt = image.name.slice(image.name.lastIndexOf("."));

        const fileData = await firebase
          .storage()
          .ref(`ads/${result.key}${imageExt}`)
          .put(image);
        const imageSrc = await fileData.ref.getDownloadURL();
        await firebase
          .database()
          .ref("ads")
          .child(result.key)
          .update({ image: imageSrc });

        commit("setLoading", false);
        commit("createAd", { ...newAd, id: result.key, image: imageSrc });
      } catch (error) {
        commit("setError", error);
        commit("setLoading", false);
        throw error;
      }
    },
    async fetchAds({ commit }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        let resultAds = [];
        await firebase
          .database()
          .ref("ads")
          .once("value")
          .then(
            function(snapshot) {
              const result = snapshot.val();
              Object.keys(result).forEach((key) => {
                const ad = result[key];
                resultAds.push(
                  new Ad(
                    ad.title,
                    ad.description,
                    ad.ownerId,
                    ad.image,
                    ad.promo,
                    key
                  )
                );
              });
            },
            function(error) {
              commit("setError", error);
            }
          );
        commit("loadAds", resultAds);
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error);
        commit("setLoading", false);
        throw error;
      }
    },
    async updateAd({ commit }, { title, description, id }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        await firebase
          .database()
          .ref("ads")
          .child(id)
          .update({ title, description });
        commit("updateAd", { title, description, id });
        commit("setLoading", false);
      } catch (error) {
        commit("setError", error);
        commit("setLoading", false);
        throw error;
      }
    },
  },
  getters: {
    ads: (state) => state.ads,
    promoAds: (state) => state.ads.filter((i) => i.promo),
    myAds: (state, getters) =>
      state.ads.filter((ad) => {
        console.log("ad", ad.ownerId, "user", getters.user.id);
        return ad.ownerId === getters.user.id;
      }),
    adById: (state) => (adId) => state.ads.find((i) => String(i.id) === adId),
  },
};

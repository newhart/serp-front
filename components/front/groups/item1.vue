<template>
  <v-card class="d-flex card-groupe" max-width="100%">
    <v-img
      class="white--text align-end lb lightbox-customiser"
      :src="
        item && item.image
          ? item.image
          : 'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
      "
      v-if="item && item.image"
    >
    </v-img>
    <div v-else class="position-relative">
      <lightbox :items="images" class="lightbox-customiser"></lightbox>
    </div>
    <div class="details-groupe w-100">
      <p class="font16 limite1-lign px-3 font-bold text-primary">
        {{ item ? item.title : "" }}
      </p>
      <p class="px-3 font10">{{ item.countmember }} membre(s)</p>
      <p class="limite2-lign px-3 font12 line-h">
        {{ item && item.description ? item.description : "" }}
      </p>

      <v-card-actions class="px-3 py-0 mt-2 justify-end">
        <v-btn color="primary" class="font12" @click="goto(item)">
          {{ item.ismember ? acced_to : flow }}
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ["index", "status", "item"],
  data() {
    return {
      images: [
        "https://i.wifegeek.com/200426/f9459c52.jpg",
        "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
        "https://i.wifegeek.com/200426/5fa51df3.jpg",
        "https://i.wifegeek.com/200426/663181fe.jpg",
        "https://i.wifegeek.com/200426/2d110780.jpg",
      ],
      acced_to: "Accéder au groupe",
      flow: "Suivre le groupe",
    };
  },
  methods: {
    goto(item) {
      this.$emit("handelVisited", this.item);
      this.$router.push({
        name: "groups",
        params: { index: this.item.id },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.lb.lightbox-customiser {
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px !important;
  overflow: hidden;
  margin: 5px;
}
.absolute-name-groupe {
  position: absolute;
  top: 0;
  height: 150px;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.30196);
}
.card-groupe.v-card {
  box-shadow: 2px 3px 6px rgb(150 150 150 / 34%) !important;
}
</style>

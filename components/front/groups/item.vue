<template>
  <v-card class="mx-auto h-100 card-groupe" max-width="300">
    <v-img
      class="white--text align-end"
      height="150px"
      :src="item.image"
      v-if="item.image"
    >
      <v-card-title>
        <p class="font-bold font16 limite2-lign line-h text-white">
          {{ item.title }}
        </p>
      </v-card-title>
      <div class="transparence-bg"></div>
    </v-img>
    <div
      v-else
      style="border-radius: 5px 5px 0 0 !important; overflow: hidden"
      class="position-relative"
    >
      <lightbox :items="images" class="lightbox-customiser"></lightbox>
      <div class="absolute-name-groupe">
        <v-card-title>
          <p class="font-bold font16 limite2-lign line-h text-white">
            {{ item.title }}
          </p>
        </v-card-title>
      </div>
    </div>

    <div class="h-100-150">
      <div class="d-flex h-100 justify-between direction-column">
        <div>
          <v-card-subtitle class="py-1 px-3 font12">
            {{ item.countmember }} membre(s)
          </v-card-subtitle>

          <v-card-text class="text--primary py-0 px-3">
            <p class="limite2-lign line-h">
              {{ item.description ? item.description : "" }}
            </p>
          </v-card-text>
        </div>

        <v-card-actions class="px-3 pb-3">
          <v-btn
            :color="item.ismember ? 'primary' : 'secondary'"
            class="font12 max-w-100"
            @click.prevent="joinOrAcced(item)"
            :disabled="group_flow === 'Chargement ...'"
          >
            <span class="limite1-lign">
              {{ item.ismember ? "Accéder au groupe" : group_flow }}
            </span>
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: ["index", "item"],
  data() {
    return {
      images: [
        "https://i.wifegeek.com/200426/f9459c52.jpg",
        "https://i.wifegeek.com/200426/5ce1e1c7.jpg",
        "https://i.wifegeek.com/200426/5fa51df3.jpg",
        "https://i.wifegeek.com/200426/663181fe.jpg",
        "https://i.wifegeek.com/200426/2d110780.jpg",
      ],
      group_flow: "Suivre le groupe",
    };
  },
  methods: {
    joinOrAcced(item) {
      this.$emit("handelAcced", this.item);
      if (item.ismember) {
        this.$router.push({
          name: "groups",
          params: { index: this.item.id },
        });
        return;
      }
      this.group_flow = "Chargement ...";
      this.$axios
        .post("api/groups/join", {
          group_id: item.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.group_flow = "Accéder au groupe";

            this.$router.push({
              name: "groups",
              params: { index: this.item.id },
            });
          }
        })
        .catch((error) => {
          console.error(error);
          this.group_flow = "Suivre le groupe";
        });
    },
  },
};
</script>
<style scoped lang="scss">
.lb.lightbox-customiser {
  width: 100%;
  height: 150px;
}
.absolute-name-groupe {
  position: absolute;
  top: 0;
  height: 150px;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.30196);
}
.h-100-150 {
  height: calc(100% - 150px);
}
.transparence-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.30196);
  z-index: -1;
  top: 0;
}
.card-groupe.v-card {
  box-shadow: 2px 3px 6px rgb(150 150 150 / 34%) !important;
}
</style>

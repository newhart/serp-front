<template>
  <div class="py-3">
    <v-row v-if="gamme && tours" class="ma-0 list-cooperative">
      <FrontCooperativeItemInDetails :gamme="gamme" @save="handelChangeDate" />
      <v-card v-if="!loadingTour" class="card-default pa-3 w-100">
        <FrontCooperativeItemChoiceCadre
          :intineraries="gamme.destination_types[0].intineraires"
          v-for="(item, index) in tours"
          :key="index"
          :cadre="item"
          @storeReservation="handelReservation"
        />
      </v-card>
      <v-card v-else class="card-default pa-3 w-100">
        <FrontCooperativeItemChoiceCadre
          v-for="(item, index) in 1"
          :key="index"
        />
      </v-card>
    </v-row>
    <v-row v-else class="ma-0 list-cooperative py-4">
      <FrontCooperativeItemSkeleton v-for="(item, index) in 2" :key="index" />
    </v-row>
  </div>
</template>

<script>
export default {
  head: {
    titleTemplate: "R23 - choisir votre place",
  },
  data: () => ({
    gamme: null,
    vehiculs: [],
    tours: null,
    activePicker: null,
    date: null,
    loadingTour: false,
    menu: false,
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  async fetch() {
    const data = await this.$axios.get("api/display-cooperative", {
      params: {
        id: this.$route.params.namecooperative,
      },
    });
    this.gamme = data.data.gamme;
    if (this.gamme) {
      this.tours = this.gamme.tours;
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    handelReservation(data) {
      if (data) {
        if (this.gamme) {
          this.$axios
            .get("api/tour/gamme-destination", {
              params: {
                gamme_id: this.gamme.id,
                destination_id: this.gamme.parent.id,
                date: this.$store.state.date.depart,
              },
            })
            .then((res) => {
              this.tours = [];
              this.tours = res.data;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    handelChangeDate(date) {
      this.test = date;
      this.$forceUpdate();
      if (this.gamme) {
        this.loadingTour = true;
        this.$axios
          .get("api/tour/gamme-destination", {
            params: {
              gamme_id: this.gamme.id,
              destination_id: this.gamme.parent.id,
              date: date,
            },
          })
          .then((res) => {
            this.loadingTour = false;
            this.tours = [];
            this.tours = res.data;
          })
          .catch((error) => {
            console.log(error);
            this.loadingTour = false;
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/username.scss";
.ma-0.block-filtre {
  // border: 1px #0321533b solid;
  margin-top: 7px !important;
}
</style>

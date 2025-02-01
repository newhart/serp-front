<template>
  <v-col cols="12" class="py-2 px-0">
    <v-card class="pa-1 d-flex card-flexable-res-1" v-if="gamme">
      <v-img
        :lazy-src="gamme.user.vehiculs[0].image"
        :src="gamme.user.vehiculs[0].image"
        class="img-vehicule-cooperative"
      >
        <div class="position-relative h-100">
          <img :src="gamme.image" class="img-logo-cooperative" />
          <!-- <div class="enlign"></div> -->
        </div>
      </v-img>
      <div class="details d-flex direction-column justify-between w-100 mx-4">
        <div>
          <div class="block-itm d-flex justify-between py-2">
            <div>
              <h3 class="text-secondary">{{ gamme.user.cooperative_name }}</h3>
              <p class="text-primary">
                {{ gamme.parent.name }} - {{ gamme.name }}
              </p>
            </div>
            <div class="position-relative">
              <v-btn color="secondary" icon :loading="loadingLiked">
                <v-icon
                  @click="liked()"
                  size="23"
                  color="secondary"
                  class="cursor-pointor"
                >
                  {{ hasLiked ? "mdi-heart" : "mdi-heart-outline" }}
                </v-icon>
              </v-btn>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm d-flex py-2">
            <div class="w-65 d-flex align-start">
              <img
                class="mr-2 pt-1"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary font12">
                {{ gamme.user.adress }}
              </p>
            </div>
            <div class="position-relative">
              <p class="text-primary font12">
                Inscrit le<span class="text-secondary font14 pl-1">{{
                  $moment(gamme.user.created_at).format("D MMMM YYYY")
                }}</span>
              </p>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm py-2">
            <div class="w-65 d-flex align-center">
              <v-btn class="font12 no-shadow min-w-0 px-2" color="secondary">
                {{ gamme.user.vehiculs.length }}
              </v-btn>
              <p class="text-primary font12 pl-2">Voitures disponibles</p>
            </div>
            <div class="list-itineraire my-1">
              <div
                v-for="(destination, i) in gamme.destination_types"
                :key="i * 4"
              >
                <div
                  v-for="(itineraire, index) in destination.intineraires"
                  :key="index"
                  class="item-itineraire d-flex py-1"
                >
                  <p class="font12 text-primary font-bold w-65">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-arrow-right-thin
                    </v-icon>
                    {{ itineraire.departure }} - {{ itineraire.arrival }}
                  </p>
                  <p class="font12 text-primary font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ itineraire.price.toLocaleString() }} Ar/pers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex align-center justify-between pb-4 flex-boutton-bottom1"
        >
          <div class="d-flex align-center flex-vue-accueil">
            <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary">
                <span class="text-secondary">{{
                  gamme.user.friendscount
                }}</span>
                contact(s)
              </p>
            </div>
            <!-- <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary">
                <span class="text-secondary">25</span> vues
              </p>
            </div> -->
            <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary">
                <span class="text-secondary">{{
                  gamme.user.friendcommun
                }}</span>
                ami(s) en commun
              </p>
            </div>
          </div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <div class="depart-date-res">
                <p class="font-bold font12 text-secondary mb-2">
                  Date de départ
                </p>
                <v-text-field
                  v-model="date"
                  label="Date de départ"
                  readonly
                  clearable
                  outlined
                  class="input-global1 choisedate"
                  solo
                  v-bind="attrs"
                  v-on="on"
                  hide-details
                ></v-text-field>
              </div>
            </template>
            <v-row justify="center">
              <v-date-picker
                v-model="date"
                :max="'2052-01-01'"
                :min="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                @change="save"
              ></v-date-picker>
            </v-row>
          </v-menu>
        </div>
      </div>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["gamme"],
  data() {
    return {
      activePicker: null,
      date: null,
      menu: false,
      hasLiked: null,
      loadingLiked: false,
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$emit("save", date);
      this.$store.commit("date/changedepart", date);
      this.$refs.menu.save(date);
    },
    liked() {
      this.loadingLiked = true;
      this.$axios
        .post(`/api/reaction/store`, {
          id: this.gamme.user.id,
        })
        .then((res) => {
          this.loadingLiked = false;
          this.hasLiked = res.data.hasLiked;
        })
        .catch((error) => {
          console.log(error);
          this.loadingLiked = false;
        });
    },
  },
  mounted() {
    this.date = this.$store.state.date.depart
      ? this.$store.state.date.depart
      : null;
  },
  watch: {
    gamme: {
      handler(value) {
        if (value && value.user) {
          this.$axios
            .get(`api/status-liked/${value.user.id}`)
            .then((res) => {
              this.hasLiked = res.data.hasLiked;
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/itemcooperative.scss";
.choisedate {
  max-width: 290px;
}
@media (max-width: 428px) {
  .depart-date-res {
    width: 100%;
  }
  .depart-date-res .choisedate {
    max-width: 100%;
  }
}
</style>

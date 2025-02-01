<template>
  <div class="item-cadrechoise">
    <v-row v-if="tour" class="details-place justity-between pa-0 ma-0">
      <v-col class="px-1 py-0" cols="6">
        <div class="d-flex align-center my-2">
          <div class="color color-chaffeur">
            <v-icon> mdi-account </v-icon>
          </div>
          <p class="ml-2 font12 text-primary">Chauffeur</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-place-libre"></div>
          <p class="ml-2 font12 text-primary">Places libres</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-reserver"></div>
          <p class="ml-2 font12 text-primary">Réservée</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-encours-reservation"></div>
          <p class="ml-2 font12 text-primary">Réservation en cours</p>
        </div>
      </v-col>
      <v-col class="px-1 py-0" cols="6">
        <v-row class="ma-0">
          <v-col
            v-for="(itemPlace, index) in arrayplace"
            :key="index"
            :cols="tour.cadre.banquette_number === 3 ? 4 : 3"
            class="pa-1"
          >
            <div
              :class="{
                'color-reserver': itemPlace.status === 'reserver',
                'color-vos-place': itemPlace.status === 'MyPlace',
                'color-place-libre': itemPlace.status === 'libre',
                'color-encours-reservation':
                  itemPlace.status === 'EncoursReservation',
              }"
              class="color"
              v-if="
                itemPlace.status != 'chauffeur' && itemPlace.status != 'vide'
              "
            >
              {{ itemPlace.number }}
            </div>
            <div
              class="color color-chaffeur"
              v-if="itemPlace.status === 'chauffeur'"
            >
              <v-icon v-if="itemPlace.status === 'chauffeur'">
                mdi-account
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="px-1 py-0 d-flex align-center justify-between" cols="12">
        <div class="d-flex align-center" v-if="tour.vehicul">
          <v-avatar class="profile" color="grey" size="45" tile>
            <v-img :src="tour.vehicul.image"></v-img>
          </v-avatar>
          <p class="pl-3 font12 text-secondary">
            {{ tour.vehicul.vehicule_number }}
          </p>
        </div>
        <v-btn color="primary" class="font12" @click.prevent="getAllVehicul">
          {{ tour.vehicul ? "Changer le voiture" : "Ajouter de voiture" }}
        </v-btn>
        <!--            create new  vehicule for cooperative-->
        <v-dialog
          v-model="dialogueaddvoiture"
          width="500"
          overlay-color="#000"
          overlay-opacity="0.1"
          content-class="pa-6"
          hidden
        >
          <div>
            <!-- <v-icon
              @click="dialogueaddvoiture = false"
              class="close-dialogue"
              color="secondary"
            >
              mdi-close-circle
            </v-icon> -->
            <v-row class="ma-0">
              <v-radio-group v-model="radios">
                <v-row v-if="vehiculs" class="ma-0">
                  <v-col class="pa-1" cols="12">
                    <h3 class="text-secondary text-center text-bold mb-4">
                      Selectionner un voiture
                    </h3>
                  </v-col>
                  <v-col
                    v-for="(item, i) in vehiculs"
                    :key="i"
                    class="pa-1"
                    cols="6"
                  >
                    <v-radio :value="i">
                      <template v-slot:label>
                        <div class="d-flex align-center">
                          <v-avatar class="profile" color="grey" size="45" tile>
                            <v-img :src="item.image"></v-img>
                          </v-avatar>
                          <p class="pl-3 font12 text-primary">
                            {{ item.vehicule_number }}
                          </p>
                        </div>
                      </template>
                    </v-radio>
                  </v-col>
                </v-row>
                <v-row v-else class="ma-0">
                  <v-col class="pa-1" cols="12">
                    <h3 class="text-secondary text-center text-bold mb-4">
                      Selectionner un voiture
                    </h3>
                  </v-col>
                  <v-col v-for="(item, i) in 4" :key="i" class="pa-1" cols="6">
                    <v-radio :value="i">
                      <template v-slot:label>
                        <div class="d-flex align-center">
                          <v-avatar class="profile" color="grey" size="45" tile>
                            <v-img class="placeholder"></v-img>
                          </v-avatar>
                          <p class="pl-3 font12 text-primary">...</p>
                        </div>
                      </template>
                    </v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>

              <v-col class="pa-1" cols="12">
                <v-btn
                  @click="assoiciate()"
                  :loading="addvehicule"
                  class="w-100"
                  color="secondary"
                >
                  Enregistrer
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-dialog>
        <!--            end create new vehicule-->
      </v-col>
    </v-row>
    <v-row v-else class="details-place justity-between pa-0 ma-0">
      <v-col class="px-1 py-0" cols="6">
        <div class="d-flex align-center my-2">
          <div class="color color-chaffeur">
            <v-icon> mdi-account </v-icon>
          </div>
          <p class="ml-2 font12 text-primary">Chauffeur</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-place-libre"></div>
          <p class="ml-2 font12 text-primary">Places libres</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-reserver"></div>
          <p class="ml-2 font12 text-primary">Réservée</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-vos-place"></div>
          <p class="ml-2 font12 text-primary">Vos places</p>
        </div>
        <div class="d-flex align-center my-2">
          <div class="color color-encours-reservation"></div>
          <p class="ml-2 font12 text-primary">Réservation en cours</p>
        </div>
      </v-col>
      <v-col class="px-1 py-0" cols="6">
        <div data-v-25fde02c="" class="row ma-0">
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <!---->
            <div data-v-25fde02c="" class="color color-chaffeur">
              <i
                data-v-25fde02c=""
                aria-hidden="true"
                class="v-icon notranslate mdi mdi-account theme--light"
              ></i>
            </div>
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <!---->
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            >
              3
            </div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <!---->
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <!---->
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <!---->
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div
              data-v-25fde02c=""
              class="color color-place-libre placeholder-wave"
            ></div>
            <!---->
          </div>
          <div data-v-25fde02c="" class="pa-1 col col-3">
            <div data-v-25fde02c="" class="color color-reserver"></div>
            <!---->
          </div>
        </div>
      </v-col>
      <v-col class="px-1 py-0 d-flex align-center justify-between" cols="12">
        <div class="d-flex align-center">
          <v-avatar class="profile placeholder" color="grey" size="45" tile>
            <v-img></v-img>
          </v-avatar>
          <p class="pl-3 font12 text-secondary placeholder"></p>
        </div>
        <v-btn color="primary" class="font12 placeholder"> </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["tour"],
  data() {
    return {
      radios: null,
      addvehicule: false,
      arrayplace: [
        {
          number: 0,
          status: "chauffeur",
        },
        {
          number: 0,
          status: "vide",
        },
        {
          number: 2,
          status: "reserver",
        },
        {
          number: 3,
          status: "reserver",
        },
        {
          number: 4,
          status: "libre",
        },
        {
          number: 5,
          status: "libre",
        },
        {
          number: 0,
          status: "vide",
        },
        {
          number: 6,
          status: "libre",
        },
        {
          number: 7,
          status: "reserver",
        },
        {
          number: 8,
          status: "libre",
        },
        {
          number: 0,
          status: "vide",
        },
        {
          number: 9,
          status: "libre",
        },
        {
          number: 10,
          status: "libre",
        },
        {
          number: 11,
          status: "libre",
        },
        {
          number: 0,
          status: "vide",
        },
        {
          number: 12,
          status: "EncoursReservation",
        },
        {
          number: 13,
          status: "libre",
        },
        {
          number: 14,
          status: "EncoursReservation",
        },
        {
          number: 15,
          status: "EncoursReservation",
        },
        {
          number: 16,
          status: "reserver",
        },
      ],
      dialogueaddvoiture: false,
      vehiculs: null,
    };
  },
  methods: {
    addPlace(e, index) {
      if (index > -1) {
        this.arrayplace = this.arrayplace.map((item) => {
          if (item && item.number === e && item.status === "libre") {
            return {
              number: e,
              status: "MyPlace",
            };
          }
          if (item && item.number === e && item.status === "MyPlace") {
            return {
              number: e,
              status: "libre",
            };
          }
          return item;
        });
      }
    },

    assoiciate() {
      this.addvehicule = true;
      this.$axios
        .post("api/tour/associate", {
          tour_id: this.tour.id,
          vehicul_id: this.vehiculs[this.radios].id,
        })
        .then((res) => {
          this.addvehicule = false;
          if (res.data.success) {
            this.$emit("assoiciate", true);
            this.dialogueaddvoiture = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.addvehicule = false;
        });
    },

    getAllVehicul() {
      this.dialogueaddvoiture = true;
      this.$axios
        .get("api/vehicul/choiced-tour", {
          params: {
            place: this.tour.place_number,
          },
        })
        .then((res) => {
          this.vehiculs = res.data.vehicul;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    if (this.tour) {
      this.arrayplace = this.tour.cadres;
    }
  },
  watch: {
    tour: {
      handler(value) {
        this.arrayplace = value.cadres;
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/choicecadre.scss";
.item-cadrechoise {
  padding: 20px !important;
  border: 1px rgba(162, 162, 162, 0.25098) solid !important;
}
</style>

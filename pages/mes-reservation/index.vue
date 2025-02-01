<template>
  <div class="py-3">
    <v-row class="ma-0 block-filtre mb-3">
      <v-col
        class="pa-2 d-flex align-center cursor-pointor"
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="6"
      >
        <img class="mr-2" src="~/static/icons/default/location.svg" alt="" />
        <vue-select
          :options="allDestination"
          autocomplete="on"
          @input="handelChangeDestination($event, 'departure')"
          placeholder="Départ"
          label="name"
          class="w-100"
          hide-details
        >
          <template #no-options="{ search, searching, loading }">
            Aucun résultat
          </template>
        </vue-select>
        <!-- <InputSelect /> -->
      </v-col>
      <v-col
        class="pa-2 d-flex align-center cursor-pointor"
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="6"
      >
        <img class="mr-2" src="~/static/icons/default/location.svg" alt="" />
        <vue-select
          :options="allArrival"
          @input="handelChangeDestination($event, 'arrival')"
          placeholder="Arrivée"
          label="name"
          class="w-100"
          hide-details
        >
          <template #no-options="{ search, searching, loading }">
            Aucun résultat
          </template>
        </vue-select>
      </v-col>
      <v-col
        class="pa-2 d-flex align-center cursor-pointor"
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="6"
      >
        <img class="mr-2" src="~/static/icons/default/location.svg" alt="" />
        <vue-select
          :options="gammeOption"
          label="name"
          v-model="gammeModel"
          placeholder="Gamme de voiture"
          class="w-100"
          @input="handelChangeCooperative($event)"
          hide-details
        >
          <template #no-options="{ search, searching, loading }">
            Aucun résultat
          </template>
        </vue-select>
      </v-col>
      <v-col
        class="pa-2 d-flex align-center cursor-pointor"
        cols="12"
        xl="3"
        lg="3"
        md="3"
        sm="6"
        xs="6"
        v-if="type !== 'vehiculs'"
      >
        <img class="mr-2" src="~/static/icons/default/location.svg" alt="" />
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          min-width="auto"
          bottom
          left
          nudge-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              :label="type === 'tours' ? 'Du' : 'Date de départ'"
              readonly
              clearable
              outlined
              class="input-global2 choisedate"
              v-bind="attrs"
              v-on="on"
              solo
              hide-details
            ></v-text-field>
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
            ></v-date-picker>
          </v-row>
        </v-menu>
      </v-col>
      <v-progress-linear
        :active="loadingfilter"
        :indeterminate="loadingfilter"
        absolute
        bottom
        height="1"
        color="secondary"
        class="loading-filter"
      ></v-progress-linear>
    </v-row>
    <v-row class="ma-0 list-cooperative">
      <v-card class="card-default pa-3 w-100">
        <v-card-title class="pa-0 d-flex align-center justify-between">
          <h3 class="text-secondary font-bold underline-bottom">
            Mes réservations
          </h3>
          <div class="d-flex details-place">
            <div class="d-flex align-center my-2 ml-3">
              <div class="color color-chaffeur">
                <v-icon> mdi-account </v-icon>
              </div>
              <p class="ml-1 font12 text-primary limite1-lign">Chauffeur</p>
            </div>
            <div class="d-flex align-center my-2 ml-3">
              <div class="color color-place-libre"></div>
              <p class="ml-1 font12 text-primary limite1-lign">Places libres</p>
            </div>
            <div class="d-flex align-center my-2 ml-3">
              <div class="color color-reserver"></div>
              <p class="ml-1 font12 text-primary limite1-lign">Réservée</p>
            </div>
            <div class="d-flex align-center my-2 ml-3">
              <div class="color color-vos-place"></div>
              <p class="ml-1 font12 text-primary limite1-lign">Vos places</p>
            </div>
            <div class="d-flex align-center my-2 ml-3">
              <div class="color color-encours-reservation"></div>
              <p class="ml-1 font12 text-primary limite1-lign">
                Réservation en cours
              </p>
            </div>
          </div>
        </v-card-title>
        <div v-if="reservations">
          <div class="list-mes-reservation" v-if="reservations.length > 0">
            <!-- Add card Reservation Tour here  -->
            <v-card
              v-for="(item, index) in reservations"
              :key="index"
              class="card-default pa-3 w-100 my-2"
            >
              <FrontItemMesReservation
                :intineraries="
                  item.gamme ? item.gamme.destination_types[0].intineraires : []
                "
                @storeReservation="handelReservation"
                :cadre="item"
                :cadrereservation="item.cadres"
              />
            </v-card>
          </div>
          <FrontDefaultNoresult v-else />
        </div>
        <div v-else>
          <div class="list-mes-reservation">
            <!-- Add card Reservation Tour here  -->
            <v-card
              v-for="(item, index) in 2"
              :key="index"
              class="card-default pa-3 w-100 my-2"
            >
              <div
                data-v-4b312bc5=""
                data-v-35b46434=""
                class="d-flex justify-between w-100 item-cadrechoise"
              >
                <div data-v-4b312bc5="" class="list-passage w-100 pr-6 mr-6">
                  <div
                    data-v-4b312bc5=""
                    class="d-flex align-center justify-between pb-1"
                  >
                    <p data-v-4b312bc5="" class="text-secondary font-bold">
                      <span data-v-4b312bc5="" class="text-primary"
                        >Départ
                      </span>
                      Le ...
                      <span data-v-4b312bc5="" class="text-primary">à </span>
                      ... du ... |<span data-v-4b312bc5="" class="text-primary">
                        ...</span
                      >
                    </p>
                    <p data-v-4b312bc5="" class="text-primary font-bold">
                      <span data-v-4b312bc5="" class="text-secondary ml-2"
                        >...</span
                      >
                      place(s) disponible(s)
                    </p>
                  </div>
                  <div v-for="(item, index) in 6" :key="index" class="row ma-0">
                    <div
                      data-v-4b312bc5=""
                      class="details-place pa-1 px-0 col col-8"
                    >
                      <div data-v-4b312bc5="" class="d-flex align-center">
                        <div
                          data-v-4b312bc5=""
                          class="color color-vos-place placeholder-wave"
                        ></div>
                        <p data-v-4b312bc5="" class="ml-1 font12 text-primary">
                          <span data-v-4b312bc5="" class="font-bold">...</span>
                          ...
                        </p>
                      </div>
                    </div>
                    <div
                      data-v-4b312bc5=""
                      class="d-flex align-center justify-end pa-1 px-0 col col-4"
                    >
                      <i
                        data-v-4b312bc5=""
                        aria-hidden="true"
                        class="v-icon notranslate pr-2 mdi mdi-check theme--light primary--text"
                        style="font-size: 15px"
                      ></i>
                      <p data-v-4b312bc5="" class="font12 text-primary">
                        ...-...
                      </p>
                    </div>
                  </div>
                </div>
                <div data-v-4b312bc5="">
                  <p data-v-4b312bc5="" class="text-primary mb-2 font-bold">
                    Sélectionnez votre destination
                  </p>
                  <div
                    data-v-4b312bc5=""
                    class="row details-place max-w-320 pa-0 ma-0"
                  >
                    <div data-v-4b312bc5="" class="px-1 py-0 col">
                      <div
                        data-v-4b312bc5=""
                        class="v-input ma-0 pa-0 v-input--hide-details theme--light v-input--selection-controls v-input--radio-group v-input--radio-group--column"
                      >
                        <div class="v-input__control">
                          <div class="v-input__slot" style="height: auto">
                            <div
                              role="radiogroup"
                              aria-labelledby="input-450"
                              class="v-input--radio-group__input"
                            >
                              <div
                                data-v-4b312bc5=""
                                class="v-radio ma-0 pa-0 theme--light"
                              >
                                <div class="v-input--selection-controls__input">
                                  <i
                                    aria-hidden="true"
                                    class="v-icon notranslate mdi mdi-radiobox-blank theme--light"
                                  ></i
                                  ><input
                                    aria-checked="false"
                                    id="input-451"
                                    role="radio"
                                    type="radio"
                                    name="radio-450"
                                    value="0"
                                  />
                                  <div
                                    class="v-input--selection-controls__ripple"
                                  ></div>
                                </div>
                                <label
                                  for="input-451"
                                  class="v-label theme--light"
                                  style="
                                    left: 0px;
                                    right: auto;
                                    position: relative;
                                  "
                                  ><div
                                    data-v-4b312bc5=""
                                    class="d-flex justify-between w-100"
                                  >
                                    <p
                                      data-v-4b312bc5=""
                                      class="text-primary font12 limite1-lign"
                                    >
                                      ... - ...
                                    </p>
                                  </div></label
                                >
                              </div>
                              <div
                                data-v-4b312bc5=""
                                class="v-radio ma-0 pa-0 theme--light"
                              >
                                <div class="v-input--selection-controls__input">
                                  <i
                                    aria-hidden="true"
                                    class="v-icon notranslate mdi mdi-radiobox-blank theme--light"
                                  ></i
                                  ><input
                                    aria-checked="false"
                                    id="input-453"
                                    role="radio"
                                    type="radio"
                                    name="radio-450"
                                    value="1"
                                  />
                                  <div
                                    class="v-input--selection-controls__ripple"
                                  ></div>
                                </div>
                                <label
                                  for="input-453"
                                  class="v-label theme--light"
                                  style="
                                    left: 0px;
                                    right: auto;
                                    position: relative;
                                  "
                                  ><div
                                    data-v-4b312bc5=""
                                    class="d-flex justify-between w-100"
                                  >
                                    <p
                                      data-v-4b312bc5=""
                                      class="text-primary font12 limite1-lign"
                                    >
                                      ... - ...
                                    </p>
                                  </div></label
                                >
                              </div>
                              <div
                                data-v-4b312bc5=""
                                class="v-radio ma-0 pa-0 theme--light"
                              >
                                <div class="v-input--selection-controls__input">
                                  <i
                                    aria-hidden="true"
                                    class="v-icon notranslate mdi mdi-radiobox-blank theme--light"
                                  ></i
                                  ><input
                                    aria-checked="false"
                                    id="input-455"
                                    role="radio"
                                    type="radio"
                                    name="radio-450"
                                    value="2"
                                  />
                                  <div
                                    class="v-input--selection-controls__ripple"
                                  ></div>
                                </div>
                                <label
                                  for="input-455"
                                  class="v-label theme--light"
                                  style="
                                    left: 0px;
                                    right: auto;
                                    position: relative;
                                  "
                                  ><div
                                    data-v-4b312bc5=""
                                    class="d-flex justify-between w-100"
                                  >
                                    <p
                                      data-v-4b312bc5=""
                                      class="text-primary font12 limite1-lign"
                                    >
                                      ... - ...
                                    </p>
                                  </div></label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-v-4b312bc5=""
                      class="px-1 py-0 col"
                      style="max-width: 200px"
                    >
                      <div data-v-4b312bc5="" class="row ma-0">
                        <div data-v-4b312bc5="" class="pa-1 col col-4">
                          <!---->
                          <div
                            data-v-4b312bc5=""
                            class="color color-chaffeur ml-auto mr-0 placeholder-wave"
                          >
                            <i
                              data-v-4b312bc5=""
                              aria-hidden="true"
                              class="v-icon notranslate mdi mdi-account theme--light"
                            ></i>
                          </div>
                        </div>
                        <div data-v-4b312bc5="" class="pa-1 col col-4">
                          <!---->
                          <!---->
                        </div>
                        <div
                          data-v-4b312bc5=""
                          v-for="(item, index) in 13"
                          :key="index"
                          class="pa-1 col col-4"
                        >
                          <div
                            data-v-4b312bc5=""
                            class="color ml-auto mr-0 color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                      </div>
                    </div>
                    <!---->
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      reservations: null,
      date: null,
      menu: false,
      timer: null,
      cadres: [],
      form_client: {
        name: null,
        firstname: null,
        phone_number: null,
      },
      desactiveCompte: false,
      place_choiced: [],
      amount: 0,
      cadre_reservation: null,
      allDestination: [],
      allArrival: [],
      gammeOption: [],
      type: null,
      gammeModel: "",
      departure: null,
      arrival: null,
      loadingfilter: false,
      gamme_type: null,
      date_choiced: null,
    };
  },
  async fetch() {
    const tours = await this.$axios.get("api/tour/reserved");
    this.reservations = tours.data;
    const res = await this.$axios.get("api/all-intineraire");
    this.allDestination = res.data;
    this.allArrival = res.data;
    const type = await this.$axios.get("api/gamme/all-gamme");
    this.gammeOption = type.data.gamme;
  },
  async mounted() {
    // make  notification vue
    await this.$axios.get("api/user/notification/read/reservation", {
      params: {
        user_id: this.$auth.user.user.id,
      },
    });
  },

  created() {
    if (process.client) {
      // this.$echo
      //   .private("users." + this.$auth.user.user.id)
      //   .notification((notification) => {
      //     if (
      //       notification.type === "App\\Notifications\\NotificationReservation"
      //     ) {
      //       this.$fetch();
      //     }
      //   });
    }
  },

  // watch
  watch: {
    date: {
      handler(value) {
        // this.loadingfilter = true;
        if (value) {
          this.date_choiced = value;
          this.$axios
            .get("api/tour/reserved", {
              params: {
                departure: this.departure,
                arrival: this.arrival,
                date: this.date_choiced,
                gamme: this.gamme_type,
              },
            })
            .then((res) => {
              this.reservations = res.data;
              this.loadingfilter = false;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (process.client) this.$fetch();

          this.date_choiced = null;
          this.loadingfilter = false;
        }
      },
      immediate: true,
    },
  },

  methods: {
    handelChangeDestination(event, type) {
      this.loadingfilter = true;
      if (event && event.name) {
        if (type === "departure") {
          this.departure = event.name;
        } else {
          this.arrival = event.name;
        }
      } else {
        this.arrival = null;
        this.departure = null;
        if (process.client) this.$fetch();
        this.loadingfilter = false;
      }

      if (this.departure && this.arrival) {
        this.$axios
          .get("api/tour/reserved", {
            params: {
              departure: this.departure,
              arrival: this.arrival,
              date: this.date_choiced,
              gamme: this.gamme_type,
            },
          })
          .then((res) => {
            this.reservations = res.data;
            this.loadingfilter = false;
          })
          .catch((error) => {
            this.loadingfilter = false;
            console.log(error);
          });
      } else {
        if (process.client) this.$fetch();
        this.loadingfilter = false;
      }
    },
    handelChangeCooperative(event) {
      this.loadingfilter = true;
      if (event && event.name) {
        this.gamme_type = event.name;
        this.$axios
          .get("api/tour/reserved", {
            params: {
              departure: this.departure,
              arrival: this.arrival,
              date: this.date_choiced,
              gamme: this.gamme_type,
            },
          })
          .then((res) => {
            this.reservations = res.data;
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      } else {
        if (process.client) this.$fetch();
        this.gamme_type = null;
        this.loadingfilter = false;
      }
    },
    handelSearch(event) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$axios
          .get("api/reservation/get", {
            params: {
              search: event,
            },
          })
          .then((response) => {
            this.reservations = response.data;
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }, 3000);
    },
    async handelReservation() {
      const tours = await this.$axios.get("api/tour/reserved");
      this.reservations = tours.data;
    },
    validation() {
      this.desactiveCompte = true;
    },
    generateCadre(index_reservation) {
      return this.reservations[index_reservation].cadres[0].tour.cadres;
    },
    choicedPlace(index, reservation_index, place) {
      if (
        this.reservations[reservation_index].cadres[0].tour.cadres[index]
          .status === "libre"
      ) {
        // reserver mon place
        this.reservations[reservation_index].cadres[0].tour.cadres[
          index
        ].status = "MyPlace";
      } else {
        this.reservations[reservation_index].cadres[0].tour.cadres[
          index
        ].status = "libre";
      }
      // get all  place
      this.place_choiced = this.reservations[
        reservation_index
      ].cadres[0].tour.cadres.filter((place) => {
        return place.status === "MyPlace";
      });
      // cadre deja reserve
      this.cadre_reservation =
        this.reservations[reservation_index].cadres[0].reservation;
      // total prix reservation cooperative
      this.amount =
        this.cadre_reservation.itineraire.price * this.place_choiced.length;
    },
  },
};
</script>

<style scoped>
@import "~/assets/contactenlign.scss";
.max-200 {
  max-width: 200px;
}
.list-place {
  max-width: 165px;
}
.list-place button {
  min-width: 30px !important;
}
.block-filtre {
  background-color: rgba(255, 255, 255, 0.85098);
  border-radius: 10px;
  padding: 5px;
}
@media (max-width: 720px) {
  .d-flex.details-place {
    flex-direction: column;
    padding-top: 10px !important;
  }
  .v-card__title.pa-0.d-flex.align-center.justify-between {
    flex-direction: column;
    align-items: flex-start !important;
  }
  .d-flex.align-center.my-2.ml-3 {
    margin: 0 !important;
  }
}
@media (max-width: 500px) {
  .row.ma-0.block-filtre.mb-3 {
    margin-bottom: 0 !important;
  }
}
</style>

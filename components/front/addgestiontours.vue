<template>
  <v-row class="ma-0">
    <v-col class="pa-1" cols="12">
      <h3 class="text-secondary text-center text-bold mb-4">
        Gestion de place
      </h3>
    </v-col>
    <v-col class="pa-1 d-flex align-center" cols="4">
      <p class="text-primary font12">Destination</p>
    </v-col>
    <v-col class="pa-1" cols="8">
      <v-select
        :items="gammes"
        item-text="name"
        class="input-global2"
        v-model="place_form.id_destination"
        @input="handelChangeDestination($event)"
        return-object
        solo
        hide-details
      ></v-select>
    </v-col>
    <v-col class="pa-1 d-flex align-center" cols="4">
      <p class="text-primary font12">Gamme de voiture</p>
    </v-col>
    <v-col class="pa-1" cols="8">
      <v-select
        :items="games_cooperatives"
        :disabled="is_change"
        item-text="name"
        return-object
        class="input-global2"
        @input="handelChangeGamme($event)"
        v-model="place_form.id_gamme"
        solo
        hide-details
      ></v-select>
    </v-col>
    <v-col class="pa-1 d-flex align-center" cols="4">
      <p class="text-primary font12">Heure</p>
    </v-col>
    <v-col class="pa-1" cols="8">
      <!-- <vue-timepicker class="input-global2" v-model="place_form.hour">
      </vue-timepicker> -->
      <v-select
        class="input-global2"
        :items="listHours"
        v-model="place_form.hour"
        item-text="heure_minute"
        solo
        hide-details
      ></v-select>
    </v-col>
    <v-col class="pa-1 d-flex align-center" cols="4">
      <p class="text-primary font12">Nombre de place</p>
    </v-col>
    <v-col class="pa-1" cols="8">
      <v-select
        :items="place_number_exists"
        item-text="place_number"
        v-model="place_form.place_number"
        class="input-global2"
        solo
        return-object
        hide-details
      ></v-select>
    </v-col>
    <!-- <v-col class="pa-1 d-flex align-center" cols="4">
                      <p class="text-primary font12">Type de place</p>
                    </v-col>
                    <v-col class="pa-1" cols="8">
                      <v-select
                        class="input-global2"
                        :items="place_type"
                        solo
                        hide-details
                      ></v-select>
                    </v-col> -->

    <v-col class="pa-1 mt-3" cols="12">
      <v-btn
        @click="createTour()"
        class="w-100 no-shadow"
        color="secondary"
        :loading="loadgestionvehicule"
      >
        Enregistrer
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import Vue from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
Vue.component("vue-timepicker", VueTimepicker);
export default {
  data() {
    return {
      place_form: {
        id_destination: null,
        id_gamme: null,
        hour: null,
        place_number: null,
        date: null,
      },
      place_number_exists: [],
      is_change: true,
      loadgestionvehicule: false,
      gammes: null,
      games_cooperatives: [],
      listHours: [],
    };
  },
  methods: {
    getListHours() {
      this.$axios
        .get("api/heure/all")
        .then((res) => {
          this.listHours = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handelChangeDestination(event) {
      this.is_change = false;
      this.games_cooperatives = event.gamme;
    },
    createTour() {
      if (this.place_form.id_destination === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ destination est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (this.place_form.id_gamme === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ gamme de voiture est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (this.place_form.hour === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ heure est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (this.place_form.place_number === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ nombre de place est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      this.loadgestionvehicule = true;
      this.place_form.date = this.$moment().format("YYYY-MM-DD");
      this.$axios
        .post("api/tour/create", this.place_form)
        .then((res) => {
          this.loadgestionvehicule = false;
          if (res.data.success) {
            this.$emit("success", true);
            this.place_form = {
              id_destination: null,
              id_gamme: null,
              hour: null,
              place_number: null,
              date: null,
            };
          }
          if (res.data.error === "tour already exists") {
            this.$swal("Erreur!", "Tour déja crée", "error");
          }
        })
        .catch((error) => {
          this.loadgestionvehicule = false;
          console.log(error);
        });
    },
    getCooperativeGame() {
      this.$axios
        .get("/api/gamme/all")
        .then((res) => {
          this.gammes = res.data.gamme;
          // this.games_cooperatives = res.data.games.game_cooperative
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handelChangeGamme(event) {
      if (event.id && this.place_form.id_destination.id) {
        this.$axios
          .get("api/vehicul/gamme-type", {
            params: {
              gamme_id: this.place_form.id_destination.id,
              type_id: event.id,
            },
          })
          .then((res) => {
            this.place_number_exists = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    this.getCooperativeGame();
    this.getListHours();
  },
  async fetch() {
    const type = await this.$axios.get("api/gamme/all-gamme");
    this.games_cooperatives = type.data.gamme;
  },
};
</script>

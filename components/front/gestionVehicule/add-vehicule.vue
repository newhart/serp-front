<template>
  <div class="w-100">
    <div>
      <div class="form-input position-relative image-inass my-2">
        <img class="imgAdded w-100 h-100" v-if="image" :src="image" alt="" />
        <div
          style="top: 0; left: 0"
          class="position-absolute w-100 h-100 d-flex align-center justify-center"
        >
          <div class="icon-poisition cursor-pointor position-relative">
            <v-avatar size="60" class="bg-white">
              <v-icon class="text-black"> mdi-camera</v-icon>
            </v-avatar>
            <input
              style="z-index: 20; top: 0; left: 0"
              class="position-absolute w-100 h-100 opacity0"
              type="file"
              @change="onChangeFile"
            />
          </div>
        </div>
      </div>
      <!--  add new vehicul  -->
      <v-row class="pa-2 ma-0 my-0">
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Type de voiture :</p>
            <input
              type="text"
              class="input-global1 my-2 pa-2"
              v-model="form_vehicul.type"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Numéro du voiture :</p>
            <input
              type="text"
              class="input-global1 my-2 pa-2"
              v-model="form_vehicul.vehicule_number"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Type de place :</p>
            <select
              v-model="place_type"
              @input="handelChangePlace($event)"
              class="input-global1 my-2 pa-2 bg-white outline-none"
            >
              <option value="4">3 banquettes</option>
              <option value="3">4 banquettes</option>
            </select>
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Nombre de place :</p>
            <input
              @input="getPlaceNmber($event)"
              v-model="form_vehicul.place_number"
              type="number"
              min="5"
              max="70"
              class="input-global1 my-2 pa-2"
            />
          </div>
        </v-col>
      </v-row>
      <hr class="m-0" />
      <v-row class="details-place pa-2 my-0 ma-0">
        <v-col cols="12" class="pt-0">
          <p class="text-primary font12">
            Sélectionner le numéro et puis vous pouvez le déplacer pour finir
            votre organisation de place.
          </p>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="d-flex align-center my-3">
            <div class="color color-chaffeur">
              <v-icon> mdi-account</v-icon>
            </div>
            <p class="ml-2">Chauffeur</p>
          </div>
          <div class="d-flex align-center my-3">
            <div class="color color-vide"></div>
            <p class="ml-2">Vide</p>
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <draggable class="row ma-0 gestion-place-max" v-model="arrayplace">
            <div
              v-for="(itemPlace, index) in arrayplace"
              :key="index"
              :class="'col col-' + place_type"
              class="pa-1"
            >
              <div
                :class="{
                  'color-vide': itemPlace.statusPlace === 'vide',
                  'color-place-libre': itemPlace.statusPlace === 'libre',
                }"
                class="color mx-auto"
                v-if="itemPlace.statusPlace != 'chauffeur'"
              >
                {{ itemPlace.numero }}
              </div>
              <div
                class="color mx-auto color-chaffeur"
                v-if="itemPlace.statusPlace === 'chauffeur'"
              >
                <v-icon v-if="itemPlace.statusPlace === 'chauffeur'">
                  mdi-account
                </v-icon>
              </div>
            </div>
          </draggable>
        </v-col>
      </v-row>
      <!-- end add new vehicul-->
    </div>
    <div v-if="is_created">
      <hr class="border-secondary my-2" />
      <v-row class="pa-0 ma-0">
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Sélectionnez votre destination</p>
            <v-select
              :items="categorie_destinations"
              return-object
              item-text="name"
              solo
              class="input-global2 my-2"
              v-model="destination_choiced"
              @input="vehiculeResult($event, 'destination')"
              hide-details
            ></v-select>
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">
              Sélectionnez votre gamme de voiture
            </p>
            <v-select
              :items="cooperative_types"
              :disabled="destination_choiced === null"
              solo
              item-text="name"
              return-object
              class="input-global2 my-2"
              v-model="selected_cooperative_type"
              @input="vehiculeResult($event, 'gamme')"
              hide-details
            ></v-select>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-for="(item, index) in destination_categorie_game"
        :key="index"
        class="pa-0 ma-0"
      >
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Départ</p>
            <input
              class="input-global1 my-2 pa-2"
              type="text"
              disabled
              v-model="item.departure_city"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Arrivée</p>
            <input
              class="input-global1 my-2 pa-2"
              type="text"
              disabled
              v-model="item.arrival_city"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Prix</p>
            <input
              disabled
              type="number"
              class="input-global1 my-2 pa-2"
              v-model="item.price"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex justify-end mt-2">
      <v-btn
        @click.prevent="register()"
        color="secondary"
        class="w-100 bg-secondary text-white round25 no-shadow font12 mb-2"
        height="35"
        :loading="loadaddvehicule"
        :disabled="disabledbutton"
      >
        Enregistrer
      </v-btn>
    </div>
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

export default {
  props: ["is_created", "form_vehicul_props"],
  data() {
    return {
      place_type: 3,
      debounce: false,
      nom_proprio: "",
      type: "",
      car_number: "",
      tarif: "",
      responsable: "",
      telephoneOne: "",
      telephoneTwo: "",
      telephoneThree: "",
      images: [],
      textSnackbar: "",
      loadaddvehicule: false,
      snackbar: false,
      step1: false,
      arrayplace: [
        {
          numero: 1,
          statusPlace: "chauffeur",
        },
        {
          numero: 0,
          statusPlace: "vide",
        },
        {
          numero: 1,
          statusPlace: "libre",
        },
        {
          numero: 2,
          statusPlace: "libre",
        },
        {
          numero: 3,
          statusPlace: "libre",
        },
        {
          numero: 4,
          statusPlace: "libre",
        },
        {
          numero: 5,
          statusPlace: "libre",
        },
        {
          numero: 6,
          statusPlace: "libre",
        },
        {
          numero: 7,
          statusPlace: "libre",
        },
        {
          numero: 8,
          statusPlace: "libre",
        },
        {
          numero: 0,
          statusPlace: "vide",
        },
        {
          numero: 9,
          statusPlace: "libre",
        },
        {
          numero: 10,
          statusPlace: "libre",
        },
        {
          numero: 11,
          statusPlace: "libre",
        },
        {
          numero: 0,
          statusPlace: "vide",
        },
        {
          numero: 12,
          statusPlace: "libre",
        },
        {
          numero: 13,
          statusPlace: "libre",
        },
        {
          numero: 14,
          statusPlace: "libre",
        },
        {
          numero: 15,
          statusPlace: "libre",
        },
        {
          numero: 16,
          statusPlace: "libre",
        },
      ],
      destinationadded: [0],
      destinationIndex: 0,
      categorie1: ["VIP", "Prenium", "Standard"],
      selectedcategorie1: "",
      lieuDepart: ["Antananarivo", "Toamasina"],
      lieuArrive: ["Antananarivo", "Toamasina"],
      selectednbrPlace: "",

      cooperative_types: [],
      destination: null,
      selected_cooperative_type: null,
      selectedarrive: "",
      selecteddepart: "",

      // vehicul form
      form_vehicul: {
        type: null,
        vehicule_number: null,
        place_number: 16,
        id: null,
      },

      image: null,

      // destiantion form
      form_destination: [
        {
          departure_city: null,
          arrival_city: null,
          price: null,
        },
      ],

      // categories destination
      categorie_destinations: [],
      // choiced destination
      destination_choiced: null,
      // all  sub categorie by id
      all_sub_categories: [],
      destination_categorie_game: [],
      id_destination: null,
      banquette_number: 3,
      array_place_number: 0,
      disabledbutton: false,
    };
  },

  mounted() {
    this.getAllCooperativeType();
    this.getAllCategoriesDestinations();
    // generate data form in the update
    this.getValueForm(this.form_vehicul_props);
  },
  methods: {
    handelChangePlace(event) {
      this.banquette_number = event.target.value;
    },
    getValueForm(form) {
      if (form) {
        this.form_vehicul = {
          type: form.type,
          vehicule_number: form.vehicule_number,
          place_number: form.place_number,
          id: form.id,
        };
        this.image = form.image;
        // update  places
        this.arrayplace = [];
        form.places.forEach((item) => {
          this.arrayplace.push({
            numero: item.number,
            statusPlace: item.status,
            id: item.id,
          });
        });
        this.place_type = form.banquette_number === 4 ? 3 : 4;
        this.banquette_number = form.banquette_number === 4 ? 3 : 4;
      }
    },
    register() {
      if (this.is_created === false) {
        this.storeUpdate();
        return;
      }
      this.loadaddvehicule = true;
      const vehicul = { ...this.form_vehicul, ...{ image: this.image } };
      let data = { ...vehicul, ...{ id_destination: [this.id_destination] } };
      data = {
        ...data,
        ...{ cooperative_type: this.selected_cooperative_type },
      };
      data = { ...data, ...{ destination_choiced: this.destination_choiced } };
      data = { ...data, ...{ places: this.arrayplace } };
      data = { ...data, ...{ banquette_number: this.banquette_number } };

      // image  validation
      if (this.image === null) {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ image est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (this.form_vehicul.type === null || this.form_vehicul.type === "") {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ type de voiture est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (
        this.form_vehicul.vehicule_number === null ||
        this.form_vehicul.vehicule_number === ""
      ) {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ numéro du voiture est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (
        this.form_vehicul.place_number === null ||
        this.form_vehicul.place_number === ""
      ) {
        this.loadaddvehicule = false;
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
      if (
        this.destination_choiced === null ||
        this.destination_choiced === ""
      ) {
        this.loadaddvehicule = false;
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
      if (
        this.selected_cooperative_type === null ||
        this.selected_cooperative_type === ""
      ) {
        this.loadaddvehicule = false;
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

      if (this.destination_categorie_game.length === 0) {
        this.loadaddvehicule = false;
        this.disabledbutton = true;
        Swal.fire({
          title: "Oups!",
          text: "Veuillez pattientez a attendre le destination par rapport a votre sélection",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      this.$axios
        .post("/api/vehicul/store", data)
        .then((response) => {
          this.loadaddvehicule = false;
          if (response.data.success) {
            this.$emit("register", true);
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre véhicule  a été ajouté avec succèss",
              type: "success",
              toast: true,
              position: "bottom",
            }).then((result) => {});
            this.form_destination = [
              {
                departure_city: null,
                arrival_city: null,
                price: null,
                cooperative_type: null,
              },
            ];
            (this.form_vehicul = {
              type: null,
              vehicule_number: null,
              place_number: null,
            }),
              (this.image = null);
            this.selected_cooperative_type = null;
            this.destination_choiced = null;
            this.destination_categorie_game = [];
          } else {
            Swal.fire({
              title: "Oups!",
              text: "Il y a une erreur",
              type: "error",
              toast: true,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          this.loadaddvehicule = false;
          console.log("error", error);
        });
    },
    storeUpdate() {
      this.loadaddvehicule = true;
      const vehicul = { ...this.form_vehicul, ...{ image: this.image } };
      let data = { ...vehicul, ...{ id_destination: [this.id_destination] } };
      data = {
        ...data,
        ...{ cooperative_type: this.selected_cooperative_type },
      };
      data = { ...data, ...{ destination_choiced: this.destination_choiced } };
      data = { ...data, ...{ places: this.arrayplace } };
      data = { ...data, ...{ banquette_number: this.banquette_number } };

      // image  validation
      if (this.image === null) {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ image est obligatoire",
          type: "error",
          toast: true,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (this.form_vehicul.type === null || this.form_vehicul.type === "") {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ Type de voiture est obligatoire",
          type: "error",
          toast: true,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (
        this.form_vehicul.vehicule_number === null ||
        this.form_vehicul.vehicule_number === ""
      ) {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ Numéro du voiture est obligatoire",
          type: "error",
          toast: true,
          position: "bottom",
        }).then((result) => {});
        return;
      }

      if (
        this.form_vehicul.place_number === null ||
        this.form_vehicul.place_number === ""
      ) {
        this.loadaddvehicule = false;
        Swal.fire({
          title: "Oups!",
          text: "Le champ Nombre de place est obligatoire",
          type: "error",
          toast: true,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      this.$axios
        .post("/api/vehicul/cooperative-update", data)
        .then((response) => {
          this.loadaddvehicule = false;
          if (response.data.success) {
            this.$emit("register", true);
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre vehicule  a été modifier avec success",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
            this.form_destination = [
              {
                departure_city: null,
                arrival_city: null,
                price: null,
                cooperative_type: null,
              },
            ];
            (this.form_vehicul = {
              type: null,
              vehicule_number: null,
              place_number: null,
            }),
              (this.image = null);
            this.selected_cooperative_type = null;
            this.destination_choiced = null;
            this.destination_categorie_game = [];
          } else {
            Swal.fire({
              title: "Oups!",
              text: "Il y a ue une erreur",
              type: "error",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          this.loadaddvehicule = false;
          console.log("error", error);
        });
    },
    onChangeFile(event) {
      const that = this;
      const input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.image = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },

    dataFormat() {
      let data = {
        image: this.images,
        name: this.nom_proprio,
        type: this.type,
        number_vehicule: this.car_number,
        place_number: this.selectednbrPlace,
        form_destination: this.form_destination,
      };
      return data;
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    save(date) {
      this.$refs.menudatedepart.save(date);
    },
    save1(date) {
      this.$refs.menudatefin.save(date);
    },
    addNewDestination(e) {
      this.destinationIndex++;
      this.form_destination.push({
        departure_city: null,
        arrival_city: null,
        price: null,
        responsable_name: null,
        cooperative_type: null,
        phone_number1: null,
        phone_number2: null,
        phone_number3: null,
      });
    },
    deleteDestination(e) {
      this.destinationIndex--;
      this.form_destination.pop(e + 1);
    },
    verPage(e) {
      window.location.href = "/dashboard/gestion-vehicule/" + e;
    },
    getAllCooperativeType() {
      this.$axios
        .get("/api/gamme/all-gamme")
        .then((res) => {
          this.cooperative_types = res.data.gamme;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllCategoriesDestinations() {
      this.$axios
        .get("/api/gamme/all", {
          params: {
            is_for_vehicule: true,
          },
        })
        .then((res) => {
          this.categorie_destinations = res.data.gamme;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllSubCategorieByCategorieId(id) {
      this.$axios
        .get("/api/categorie/sub-categorie", {
          params: {
            categorie_id: id,
          },
        })
        .then((res) => {
          if (res.data.sub_categories.length > 1) {
            this.form_destination = [];
          }
          this.all_sub_categories = res.data.sub_categories;
          this.all_sub_categories.forEach((sub, key) => {
            this.form_destination.push({
              departure_city: this.all_sub_categories[0].name,
              arrival_city:
                sub.name === this.all_sub_categories[0].name
                  ? this.all_sub_categories[1].name
                  : sub.name,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    vehiculeResult(event, type) {
      if (type === "destination") {
        this.cooperative_types = event.gamme;
      }
      if (this.selected_cooperative_type && this.destination_choiced) {
        this.$axios
          .get("/api/destination/categorie-game", {
            params: {
              categorie_id: this.destination_choiced.id,
              game_id: this.selected_cooperative_type.name,
            },
          })
          .then((res) => {
            this.id_destination = res.data.destination.id;
            this.destination_categorie_game = JSON.parse(
              res.data.destination.content
            );
            this.disabledbutton = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getPlaceNmber(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        // say  the max and the min
        const value_target = parseInt(event.target.value, 10);
        this.array_place_number = value_target;
        if (value_target < 5 || value_target > 70) {
          Swal.fire({
            title: "Oups!",
            text: "Nombre de place non valide",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          }).then((result) => {});
          return false;
        }
        const place_number = parseInt(event.target.value, 10) + 1;
        // reset  the array place
        this.arrayplace = [];
        //  change all place
        if (value_target < 16) {
          this.place_type = 4;
          this.$store.commit("places/CHANGE_TYPE_PLACE", value_target);
          this.arrayplace = this.$store.state.places.places;
          return;
        } else if (value_target === 16) {
          this.$store.commit("places/CHANGE_PLACE_SUPEROR_16", value_target);
          this.arrayplace = this.$store.state.places.places;
          this.place_type = 3;
          return;
        } else if (value_target === 18) {
          this.$store.commit("places/CHANGE_PLACE_EUQUALS_18", value_target);
          this.arrayplace = this.$store.state.places.places;
          this.place_type = 3;
          return;
        }
        for (let i = 0; i < place_number; i++) {
          if (i === 0) {
            this.arrayplace.push({
              statusPlace: "chauffeur",
              numero: i + 1,
            });
          } else if (i === 1 && parseInt(this.banquette_number, 10) === 3) {
            // TODO  change validation name
            this.arrayplace.push({
              statusPlace: "vide",
              numero: 0,
            });
          } else if (parseInt(this.banquette_number, 10) === 3) {
            this.arrayplace.push({
              statusPlace: "libre",
              numero: i - 1,
            });
          } else {
            this.arrayplace.push({
              statusPlace: "libre",
              numero: i,
            });
          }
        }
        if (parseInt(this.banquette_number, 10) === 3) {
          this.arrayplace.push({
            statusPlace: "libre",
            numero: place_number - 1,
          });
        }

        //  ajouter 3 vide par defaut
        for (let j = 0; j < 3; j++) {
          this.arrayplace.push({
            statusPlace: "vide",
            numero: 0,
          });
        }
      }, 1000);
    },
  },
  watch: {
    menudatedepart(val) {
      val && setTimeout(() => (this.activePicker1 = "YEAR"));
    },
    menudatefin(val) {
      val && setTimeout(() => (this.activePicker2 = "YEAR"));
    },
    destination_choiced(value) {
      if (value) {
        this.getAllSubCategorieByCategorieId(value.id);
      }
    },
    banquette_number(value) {
      if (value) {
        const event = {
          target: {
            value: this.array_place_number,
          },
        };
        this.getPlaceNmber(event);
      }
    },
    form_vehicul_props: {
      handler(value) {
        if (value) {
          this.getValueForm(value);
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.image-inass {
  height: 110px;
  width: 110px;
  margin: auto;
}

.image-inass img {
  object-fit: cover;
}

.pointer-event-none {
  pointer-events: none;
  opacity: 0.4;
}

.gestion-place-max {
  max-width: 210px;
  margin-left: auto !important;
}

.gestion-place-max .col.col-3:first-child,
.gestion-place-max .col.col-3:nth-child(2),
.gestion-place-max .col.col-3:nth-child(3),
.gestion-place-max .col.col-3:nth-child(4) {
  pointer-events: none;
}
</style>

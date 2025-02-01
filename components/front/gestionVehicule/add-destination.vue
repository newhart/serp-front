<template>
  <div class="w-100">
    <div>
      <v-row class="pa-0 ma-0">
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Sélectionnez votre destination</p>
            <vue-select
              :options="categorie_destinations"
              @input="handelChangeDestination($event)"
              label="name"
              class="input-global2 my-2"
              v-model="destination"
              hide-details
            >
              <template #no-options="{ search, searching, loading }">
                Aucun résultat
              </template>
            </vue-select>
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="6">
          <div class="form-input">
            <p class="font12 text-primary">Sélectionnez votre gamme</p>
            <vue-select
              :options="games_cooperatives"
              :disable="destination === null"
              label="name"
              class="input-global2 my-2"
              v-model="game"
              hide-details
            >
              <template #no-options="{ search, searching, loading }">
                Aucun résultat
              </template>
            </vue-select>
          </div>
        </v-col>
      </v-row>
      <v-row
        class="pa-0 ma-0"
        v-for="(item, index) in form_destinations"
        :key="index"
      >
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Départ {{ index + 1 }}</p>
            <!-- <vue-select
              :options="sub_categories"
              solo
              item-text="name"
              taggable
              label="name"
              class="input-global2 my-2"
              v-model="item.departure_city"
              hide-details
            >
              <template #no-options="{ search, searching, loading }">
                Aucun résultat
              </template>
            </vue-select> -->
            <InputSelect
              :data_options="sub_categories"
              @onModify="(value) => (item.departure_city = value)"
              :model="item.departure_city"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Arrivé {{ index + 1 }}</p>
            <!-- <vue-select
              :options="sub_categories"
              solo
              item-text="name"
              taggable
              label="name"
              class="input-global2 my-2"
              v-model="item.arrival_city"
              hide-details
            >
              <template #no-options="{ search, searching, loading }">
                Aucun résultat
              </template>
            </vue-select> -->
            <InputSelect
              :data_options="sub_categories"
              @onModify="(value) => (item.arrival_city = value)"
              :model="item.arrival_city"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="4">
          <div class="form-input">
            <p class="font12 text-primary">Prix</p>
            <input
              type="number"
              class="input-select-custom my-1"
              @input="changePrice($event)"
              v-model="item.price"
            />
          </div>
        </v-col>
        <v-col class="px-1 py-0" cols="12">
          <div
            class="form-input d-flex justify-end align-center"
            v-if="form_destinations.length === index + 1"
          >
            <p
              @click="addNewDestination(index)"
              class="text-primary font12 cursor-pointor text-right"
            >
              Ajouter une autre
            </p>
            <p
              class="text-primary font12 px-3"
              v-if="index !== 0 && index + 1 === form_destinations.length"
            >
              |
            </p>
            <p
              @click="deleteDestination(index)"
              v-if="index !== 0 && index + 1 === form_destinations.length"
              class="text-primary font12 cursor-pointor text-right"
            >
              Supprimer
            </p>
          </div>
          <div class="form-input" v-else>
            <p
              @click="deleteDestination(index)"
              class="text-primary font12 cursor-pointor text-right"
            >
              Supprimer
            </p>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex justify-content-end mt-2">
        <v-btn
          class="bg-secondary text-white round25 no-shadow font12 w-100 mb-2 mt-3"
          height="35"
          @click.prevent="saveDetination()"
          color="secondary"
          :loading="loadaddnewdestination"
          :disabled="!is_valid"
        >
          Valider
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import "vue-select/dist/vue-select.css";
import Vue from "vue";
import vSelect from "vue-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

Vue.component("vue-select", vSelect);
export default {
  props: ["dialogueadddestination"],
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      dialogsreussie: false,
      categorie_destinations: [],
      destinationIndex: 0,
      categorie: ["Formation en ligne", "Formation en Locaux"],
      selectedcategorie: "Formation en ligne",

      // item categorie type
      categorie1: ["VIP", "Prenium", "Standard"],
      lieuDepart: ["Antananarivo", "Toamasina"],
      lieuArrive: ["Antananarivo", "Toamasina"],
      categorieDest: ["RN1", "RN2"],
      loadaddnewdestination: false,
      selectedarrive: "",
      selecteddepart: "",
      selectedcategorie1: "Standard",
      confidentiality: ["Public", "Moi uniquement"],
      selectedconfidentiality: "Public",
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] },
      ],
      title: "The summer breeze",
      activePicker1: null,
      datedepart: null,
      menudatedepart: false,
      activePicker2: null,
      datefin: null,
      menudatefin: false,
      timedepart: null,
      menutimedepart: false,
      timefin: null,
      menutimefin: false,
      destination: null,
      selected_cooperative_type: null,
      cooperative_types: ["Premium", "Standard"],
      // destination formular
      form_destinations: [
        {
          arrival_city: null,
          departure_city: null,
          id: null,
          price: null,
        },
      ],
      valid_prices: [],
      sub_categories: [],
      // vehicul by destination
      vehiculs_destinations: [],
      games_cooperatives: [],
      game: null,
    };
  },

  computed: {
    is_valid() {
      return (
        this.game !== null &&
        this.destination !== null &&
        this.valid_prices.length === 0
      );
    },
  },

  mounted() {
    this.$axios
      .get("/api/get-cooperative-type")
      .then((res) => {
        this.categorie1 = res.data.type;
      })
      .catch((error) => {
        console.log(error);
      });
    this.getAllCategoriesDestinations();
    this.getCooperativeGame();
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    changePrice(event) {
      this.form_destinations = this.form_destinations;
    },
    handelChangeDestination(event) {
      if (event && this.destination.id) {
        this.$axios
          .get("api/gamme/sub-categorie", {
            params: {
              gamme_id: this.destination.id,
              gamme_name: this.destination.name,
            },
          })
          .then((res) => {
            this.games_cooperatives = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    save(date) {
      this.$refs.menudatedepart.save(date);
    },
    save1(date) {
      this.$refs.menudatefin.save(date);
    },
    addNewDestination(e) {
      this.destinationIndex++;
      this.form_destinations.push({
        arrival_city: null,
        departure_city: null,
        id: null,
        price: null,
      });
    },
    deleteDestination(e) {
      this.destinationIndex--;
      this.form_destinations.pop(e + 1);
    },

    verPage(e) {
      window.location.href = "/dashboard/gestion-vehicule/" + e;
    },
    saveDetination() {
      // format  data
      this.loadaddnewdestination = true;
      this.form_destinations.forEach((content) => {
        if (content.arrival_city.name) {
          content.arrival_city = content.arrival_city.name;
        }

        if (content.departure_city.name) {
          content.departure_city = content.departure_city.name;
        }
      });
      // form destination and the categorie
      let data = {
        ...{ categorie_destination: this.destination },
        ...{ content: this.form_destinations },
      };
      // the game
      data = { ...data, ...{ game: this.game } };
      this.$axios
        .post("/api/destination/store", data)
        .then((res) => {
          this.loadaddnewdestination = false;
          if (res.data.success) {
            this.form_destinations = [
              {
                name: null,
                id: null,
              },
            ];
            this.destination = null;
            this.game = null;
            this.dialogsreussie = true;
            this.$emit("saveDetination", true);
            this.getAllCategoriesDestinations();
          }
        })
        .catch((error) => {
          this.loadaddnewdestination = false;
          console.log(error);
        });
    },
    getAllCategoriesDestinations() {
      this.$axios
        .get("api/categorie/all")
        .then((res) => {
          this.categorie_destinations = res.data.categories;
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
            this.form_destinations = [];
          }
          this.sub_categories = res.data.sub_categories;
          res.data.sub_categories.forEach((sub, key) => {
            this.destinationIndex++;
            if (this.sub_categories[0].name !== sub.name) {
              this.form_destinations.push({
                arrival_city: sub,
                departure_city: this.sub_categories[0],
                id: sub.id,
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDestinationByCategorie(categorie_id) {
      this.$axios
        .get("/api/destinations/categorie", {
          params: {
            categorie_id,
          },
        })
        .then((res) => {
          if (res.data.destinations.length) {
            for (var i = 0; i < res.data.destinations.length; i++) {
              res.data.destinations[i].vehiculs.forEach((v) => {
                if (!this.vehiculs_destinations.includes(v)) {
                  this.vehiculs_destinations.push(v);
                }
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCooperativeGame() {
      this.$axios
        .get("/api/gamme/all-gamme")
        .then((res) => {
          this.games_cooperatives = res.data.gamme;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getValueChange(event, type) {
      if (type === "categorie" && event) {
        this.games_cooperatives = event.gamme;
      } else {
        this.getCooperativeGame();
      }
      if (type === "gamme" && event) {
        this.$axios
          .get("/api/gamme/categorie", {
            params: {
              gamme_id: event.parent_id,
            },
          })
          .then((res) => {
            this.categorie_destinations = res.data.gamme;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (this.destination) {
          this.games_cooperatives = this.destination.gamme;
        } else {
          this.getAllCategoriesDestinations();
        }
      }
    },
  },
  watch: {
    form_destinations: {
      handler(value) {
        if (value) {
          let prices = [];
          value.forEach((val) => {
            if (val.price) {
              prices.push(val);
            }
          });
          if (prices.length > 0) {
            this.valid_prices = value.filter((v) => !v.price);
          } else {
            this.valid_prices = value;
          }
        }
      },
      immediate: true,
      deep: true,
    },
    dialogueadddestination: {
      handler(value) {
        if (value) {
          this.form_destinations = [
            {
              arrival_city: null,
              departure_city: null,
              id: null,
              price: null,
            },
          ];
          this.destination = null;
          this.game = null;
        }
      },
      immediate: true,
    },
    menudatedepart(val) {
      val && setTimeout(() => (this.activePicker1 = "YEAR"));
    },
    menudatefin(val) {
      val && setTimeout(() => (this.activePicker2 = "YEAR"));
    },
    destination(value) {
      if (value) {
        this.getAllSubCategorieByCategorieId(value.id);
        this.getDestinationByCategorie(value.id);
      } else {
        this.form_destinations = [
          {
            arrival_city: null,
            departure_city: null,
            id: null,
            price: null,
          },
        ];
        this.vehiculs_destinations = [];
      }
    },
  },
};
</script>
<style scoped>
.image-inass {
  height: 316px;
}

.image-inass img {
  object-fit: cover;
}

.action-ading {
  width: fit-content;
  margin-left: auto;
}

.item-contact-petit {
  width: 100%;
  height: fit-content;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 16%);
  padding: 3px;
}

.itemsGroup-sugger img.img-in-goups {
  height: 101px;
  width: 100%;
  margin: -3px;
  width: calc(100% + 6px);
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

img.share-icons-nv {
  width: 15px !important;
  padding-bottom: 2px;
}

.share-event {
  position: absolute;
  right: 3px;
  top: 75px;
}

.reaction-image {
  width: 15px;
  height: 15px;
  padding: 0 !important;
  margin-right: 10px;
}
</style>

<template>
  <!--            create new  game for cooperative-->
  <v-dialog
    v-model="dialogueaddgammevoiture"
    width="500"
    overlay-color="#000"
    overlay-opacity="0.5"
    content-class="pa-6"
    persistent
  >
    <v-card>
      <v-row class="justify-center ma-0">
        <v-row class="ma-0">
          <v-col class="pa-1" cols="12">
            <h3 class="text-secondary text-center text-bold mb-4">
              Ajouter votre gamme de voiture
            </h3>
          </v-col>
        </v-row>
        <v-row
          v-for="(item, index) in form_game"
          :key="index"
          class="ma-0 pa-0"
        >
          <v-col class="pa-1 pb-0" cols="2">
            <p class="text-primary font12">
              {{ "Photo " + (index + 1) }}
            </p>
            <picture-input
              ref="pictureInput"
              width="34.39"
              height="34.39"
              margin="0"
              accept="image/jpeg,image/png"
              size="10"
              button-class="d-none"
              :custom-strings="{
                upload: '<h1>Bummer!</h1>',
                drag: 'Drag a 😺 GIF or GTFO',
              }"
              @change="onChange($event, index)"
              class="my-1"
            >
            </picture-input>
          </v-col>
          <v-col class="pa-1 pb-0" cols="5">
            <p class="text-primary font12">
              {{ "Route national " + (index + 1) }}
            </p>
            <InputSelect
              :data_options="categorie_destinations"
              :model="item.destination"
              @onModify="(value) => (item.destination = value)"
            />
          </v-col>
          <v-col class="pa-1 pb-0" cols="5">
            <p class="text-primary font12">
              {{ "Classe" + (index + 1) }}
            </p>
            <InputSelect
              :data_options="games_cooperatives"
              @onModify="(value) => (item.game = value)"
              :model="item.game"
            />
          </v-col>
          <v-col
            class="px-2 pt-1 my-0 d-flex justify-end align-center"
            cols="12"
          >
            <p
              @click="deletearrive(index)"
              class="d-text-primary font12 px-1 cursor-pointor"
              v-if="index == arriveIndex && arriveIndex > 0"
            >
              {{ "Supprimer ce gamme" }}
            </p>
            <p class="px-2" v-if="index == arriveIndex && arriveIndex > 0">|</p>
            <p
              @click="
                arriveIndex === index
                  ? addNewarrive(index)
                  : deletearrive(index)
              "
              class="d-text-primary font12 px-1 cursor-pointor"
            >
              {{
                arriveIndex === index
                  ? "Ajouter une autre gamme"
                  : "Supprimer ce gamme"
              }}
            </p>
          </v-col>
        </v-row>

        <v-col class="pa-1" cols="12">
          <v-btn
            @click="addNewGame()"
            class="w-100"
            color="secondary"
            :loading="loadaddnewgamme"
          >
            Enregistrer
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
  <!--            end create new game-->
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["dialogueaddgammevoiture"],
  data() {
    return {
      form_game: [
        {
          destination: null,
          game: null,
          image: null,
        },
      ],
      image: null,
      arriveadded: [0],
      arriveIndex: 0,
      loadaddnewgamme: false,
      categorie_destinations: [],
      games_cooperatives: [],
      errorAddGamme: false,
    };
  },
  async mounted() {
    // get all destination
    const categorie = await this.$axios.get("api/categorie/all");
    this.categorie_destinations = categorie.data.categories;
  },
  methods: {
    deletearrive(e) {
      this.arriveIndex--;
      this.form_game.pop(e + 1);
    },
    addNewarrive(e) {
      this.arriveIndex++;
      this.form_game.push({
        destination: null,
        game: null,
      });
    },
    onChange(image, index) {
      if (image) {
        this.image = image;
        this.form_game[index].image = image;
      }
    },
    addNewGame() {
      this.loadaddnewgamme = true;
      this.form_game.forEach((item) => {
        if (item.destination.name || item.destination) {
          item.destination = item.destination.name
            ? item.destination.name
            : item.destination;
          this.errorAddGamme = false;
        } else {
          Swal.fire({
            title: "Oups!",
            text: "Le champ Route national est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        }

        if (item.game.name || item.game) {
          item.game = item.game.name ? item.game.name : item.game;
          this.errorAddGamme = false;
        } else {
          Swal.fire({
            title: "Oups!",
            text: "Le champ classe est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        }
        if (!item.image) {
          Swal.fire({
            title: "Oups!",
            text: "Le champ logo est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        } else {
          this.errorAddGamme = false;
        }
      });
      if (this.errorAddGamme) {
        return;
      }
      this.$axios
        .post("/api/gamme/store", { types: this.form_game })
        .then((res) => {
          if (res.data.success) {
            this.loadaddnewgamme = false;
            this.$emit("success", true);
            this.form_game = [
              {
                destination: null,
                game: null,
                image: null,
              },
            ];
          }
          if (res.data.error) {
            this.loadaddnewgamme = false;
          }
        })
        .catch((error) => {
          this.loadaddnewgamme = false;
        });
    },
    getValueTarget(event, target) {
      if (event) {
        this.form_game[target].destination = event;
      }
    },
    getValue(event, type) {
      if (type === "game") {
        if (event.id) {
          this.$axios
            .get("/api/game-user", {
              params: {
                game_id: event.id,
                categorie_id: null,
              },
            })
            .then((res) => {
              this.categorie_destinations = res.data.game.categories;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        if (event.id) {
          this.$axios
            .get("/api/game-user", {
              params: {
                game_id: null,
                categorie_id: event.id,
              },
            })
            .then((res) => {
              this.games_cooperatives = res.data.categorie.cooperative_types;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
  },
};
</script>

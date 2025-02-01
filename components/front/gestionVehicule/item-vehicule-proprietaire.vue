<template>
  <div>
    <div v-if="vehicul" class="d-flex justify-between w-100 item-cadrechoise">
      <v-img
        :lazy-src="vehicul.image"
        :src="vehicul.image"
        class="img-vehicule-cooperative"
      >
      </v-img>
      <div class="details d-flex justify-between direction-column w-100 mx-4">
        <div>
          <div class="d-flex align-center justify-between">
            <p class="text-primary mb-2 font-bold">
              {{ vehicul.type }} :
              <span class="text-secondary"
                >{{ vehicul.gamme.name }} -
                {{ vehicul.categorie ? vehicul.categorie.name : "" }}</span
              >
            </p>
            <div class="position-relative h-100">
              <img
                :src="vehicul.user.profiluser.picture"
                @click="viewProfile(vehicul.user.url)"
                class="img-logo-cooperative cursor-pointor"
              />
              <div class="enlign"></div>
            </div>
          </div>
          <div class="ma-0 pa-0 list-itineraire">
            <div
              v-for="(destination, index) in vehicul.destinations"
              :key="index * 2"
            >
              <div
                v-for="(intineraire, index) in destination.intineraires"
                :key="index"
                class="d-flex justify-between w-100 item-itineraire"
              >
                <p class="text-primary font12 limite1-lign font-bold">
                  {{ intineraire.departure }} - {{ intineraire.arrival }}
                </p>
                <p class="text-primary font12 limite1-lign">
                  {{ intineraire.price.toLocaleString() }} Ar/pers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-center justify-between pt-2">
          <p class="text-secondary">
            {{ vehicul.vehicule_number }}
            <span class="text-primary">
              |

              <span class="text-secondary"> {{ vehicul.place_number }} </span>
              places</span
            >
          </p>
          <div
            class="d-flex align-center proprietaire"
            v-if="vehicul.owner_id === $auth.user.user.id"
          >
            <v-dialog
              width="400"
              overlay-color="#000"
              overlay-opacity="0.5"
              content-class="pa-6"
              v-model="addchaffeur"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="secondary"
                  class="font12 mb-1 no-shadow"
                  v-bind="attrs"
                  v-on="on"
                >
                  Ajouter un chauffeur
                </v-btn>
              </template>
              <v-row class="ma-0">
                <v-radio-group v-model="radios">
                  <v-row v-if="driver_friends.length > 0" class="ma-0">
                    <v-col class="pa-1" cols="12">
                      <h3 class="text-secondary text-center text-bold mb-4">
                        Séléction votre chauffeur
                      </h3>
                    </v-col>
                    <v-col class="pa-1" cols="12">
                      <input
                        type="text"
                        @input="findDriverFriend($event)"
                        placeholder="Recherche..."
                        class="input-global1"
                      />
                    </v-col>
                    <v-col
                      v-for="(item, i) in driver_friends"
                      :key="i"
                      class="pa-1"
                      cols="12"
                    >
                      <v-radio :value="i" @click="getDriver(item)">
                        <template v-slot:label>
                          <div class="d-flex align-center">
                            <v-avatar
                              class="profile"
                              color="grey"
                              size="45"
                              tile
                            >
                              <v-img :src="item.profiluser.picture"></v-img>
                            </v-avatar>
                            <p class="pl-3 font12 text-primary">
                              {{ item.name }} {{ item.lastname }}
                            </p>
                          </div>
                        </template>
                      </v-radio>
                    </v-col>
                  </v-row>
                  <v-row v-else class="ma-0">
                    <v-col class="pa-1" cols="12">
                      <h2 class="text-secondary text-center text-bold mb-4">
                        Séléction votre chauffeur
                      </h2>
                    </v-col>
                    <v-col class="pa-1" cols="12">
                      <p class="text-center text-primary">
                        Vous n'avez aucun ami chauffeur
                      </p>
                    </v-col>
                  </v-row>
                </v-radio-group>

                <v-col class="pa-1" cols="12">
                  <v-btn
                    @click="makeconfirmecin()"
                    class="w-100"
                    color="secondary"
                  >
                    Enregistrer
                  </v-btn>
                </v-col>
              </v-row>
            </v-dialog>
            <v-dialog
              width="400"
              overlay-color="#000"
              overlay-opacity="0.5"
              v-model="confirmecin"
              content-class="pa-6"
            >
              <v-row class="justify-center ma-0">
                <v-row class="ma-0">
                  <v-col class="pa-1" cols="12">
                    <h3 class="text-secondary text-center text-bold mb-4">
                      Confirmer le CIN du chauffeur
                    </h3>
                  </v-col>
                  <v-col class="pa-1" cols="12">
                    <input
                      type="text"
                      v-model.trim="cin_number"
                      placeholder="Entrer le CIN du chauffeur"
                      class="input-global1 mb-3"
                    />
                  </v-col>
                </v-row>

                <v-col class="pa-1" cols="12">
                  <v-btn
                    class="w-100"
                    color="secondary"
                    @click="associate(vehicul)"
                    :loading="loadingButton"
                  >
                    Enregistrer
                  </v-btn>
                </v-col>
              </v-row>
            </v-dialog>
            <div
              class="position-relative h-100 ml-2"
              v-if="vehicul.chauffeur && vehicul.chauffeur.profiluser"
            >
              <img
                :src="vehicul.chauffeur.profiluser.picture"
                class="img-logo-cooperative"
              />
              <div class="enlign"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-between w-100 item-cadrechoise placeholder-wave pl-3"
    >
      <v-img class="img-vehicule-cooperative placeholder">
        <div class="position-relative h-100">
          <img class="img-logo-cooperative placeholder" />
          <div class="enlign"></div>
        </div>
      </v-img>
      <div class="details d-flex justify-between direction-column w-100 mx-4">
        <div>
          <div class="d-flex align-center justify-between">
            <p class="text-primary mb-2 font-bold placeholder"></p>
          </div>
          <div class="ma-0 pa-0 list-itineraire">
            <div v-for="(destination, index) in 2" :key="index * 2">
              <div
                v-for="(intineraire, index) in 2"
                :key="index"
                class="d-flex justify-between w-100 item-itineraire"
              >
                <p class="text-primary font12 limite1-lign">... - ...</p>
                <p class="text-primary font12 limite1-lign">... Ar/pers</p>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex align-center justify-between pt-2">
          <p class="text-secondary placeholder"></p>
          <v-btn color="secondary" class="font12 mb-1 no-shadow placeholder">
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["vehicul"],
  data() {
    return {
      radios: null,
      cin_number: null,
      confirmecin: false,
      addchaffeur: false,
      driver_friends: [],
      driver: null,
      debounce: false,
      loadingButton: false,
    };
  },
  async fetch() {
    const driver = await this.$axios.get("api/driver-friend");
    this.driver_friends = driver.data;
  },
  methods: {
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    addPlace(e, index) {
      if (index > -1) {
        this.arrayplace = this.arrayplace.map((item) => {
          if (item && item.numero === e && item.statusPlace === "libre") {
            return {
              numero: e,
              statusPlace: "MyPlace",
            };
          }
          if (item && item.numero === e && item.statusPlace === "MyPlace") {
            return {
              numero: e,
              statusPlace: "libre",
            };
          }
          return item;
        });
      }
    },
    getDriver(driver) {
      this.driver = driver;
    },
    findDriverFriend(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$axios
          .get("api/driver-friend", {
            params: {
              search: event.target.value,
            },
          })
          .then((response) => {
            if (response.data) {
              this.driver_friends = response.data;
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }, 2000);
    },
    makeconfirmecin() {
      if (this.driver) {
        this.addchaffeur = false;
        this.confirmecin = true;
      } else {
        Swal.fire({
          title: "Oups!",
          text: "vous devez selectionner un chauffeur!",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        });
      }
    },
    associate(vehicul) {
      if (this.cin_number && this.driver) {
        this.loadingButton = true;
        this.$axios
          .post("api/vehicul/assocate-chauffeur", {
            driver_cin: this.cin_number,
            vehicule_id: vehicul.id,
            driver_id: this.driver.id,
          })
          .then((res) => {
            this.loadingButton = false;
            if (res.data.success) {
              this.confirmecin = false;
              this.$emit("associate", true);
              let beat = new Audio('../sound/mixkit-success.wav');
              beat.volume = 0.1;
              beat.play();
              this.$swal(
                "Bravo!",
                "Votre chauffeur a été ajouter avec succès",
                "success"
              );
            } else {
              Swal.fire({
                title: "Oups!",
                text: "Le CIN que vous avez saisir ne correspand pas!",
                type: "error",
                toast: true,
                timer: 3000,
                position: "bottom",
              });
            }
          })
          .catch((error) => {
            this.loadingButton = false;
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "Oups!",
          text: "vous devez ajouter le CIN de chauffeur que vous avez selectionné!",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/choicecadre.scss";
.img-logo-cooperative {
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.enlign {
  bottom: 4px;
  right: 0px;
}
@media (max-width: 1459px) and (min-width: 1264px) {
  .img-vehicule-cooperative {
    width: 70px;
    max-width: 70px;
    height: 70px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 20px !important;
  }
}
@media (max-width: 600px) {
  .item-cadrechoise {
    margin: 0 !important;
  }
}
</style>

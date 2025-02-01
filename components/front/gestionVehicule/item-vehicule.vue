<template>
  <div>
    <div v-if="vehicul" class="d-flex justify-between w-100 item-cadrechoise">
      <v-img
        :lazy-src="vehicul.image"
        :src="vehicul.image"
        class="img-vehicule-cooperative"
      >
        <div class="position-relative h-100">
          <img
            :src="
              vehicul.owner && vehicul.owner.profiluser.picture
                ? vehicul.owner.profiluser.picture
                : vehicul.user.profiluser.picture
            "
            class="img-logo-cooperative cursor-pointor"
            @click="
              viewProfile(vehicul.owner ? vehicul.owner.url : vehicul.user.url)
            "
          />
          <div class="enlign"></div>
        </div>
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
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>

              <v-list-item-content class="justify-center py-1 bg-secondary">
                <ul class="list-item-menu">
                  <li
                    class="cursor-pointor mb-2 font12 text-white"
                    @click.prevent="handelUpdate(vehicul)"
                  >
                    Modifier
                  </li>
                  <hr class="widthplusdesconnect my-0" />
                  <li
                    class="cursor-pointor mt-2 font12 text-white"
                    @click="handelDelete(vehicul)"
                  >
                    Supprimer
                  </li>
                </ul>
              </v-list-item-content>
            </v-menu>
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
          <p class="text-secondary limite1-lign pr-2">
            {{ vehicul.vehicule_number }}
            <span class="text-primary">
              |

              <span class="text-secondary"> {{ vehicul.place_number }} </span>
              places</span
            >
          </p>
          <div class="d-flex align-center proprietaire">
            <v-dialog
              width="400"
              overlay-color="#000"
              overlay-opacity="0.5"
              content-class="pa-6"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :class="vehicul.chauffeur ? 'mr-3' : ''"
                  color="secondary"
                  v-if="
                    vehicul.owner === null && $auth.user.user.user_type_id === 1
                  "
                  class="font12 mb-1 no-shadow"
                  v-bind="attrs"
                  v-on="on"
                >
                  Approuver
                </v-btn>
              </template>
              <v-row class="justify-center ma-0">
                <v-row class="ma-0">
                  <v-col class="pa-1" cols="12">
                    <h3 class="text-secondary text-center text-bold mb-4">
                      Confirmation le CIN du propriétaire
                    </h3>
                  </v-col>
                  <v-col class="pa-1" cols="12">
                    <input
                      type="text"
                      v-model.trim="cin_number"
                      placeholder="Entrer le CIN du propriétaire"
                      class="input-global1 mb-3"
                    />
                  </v-col>
                </v-row>

                <v-col class="pa-1" cols="12">
                  <v-btn
                    class="w-100"
                    color="secondary"
                    :loading="loadingButton"
                    @click="associate(vehicul.id)"
                  >
                    Enregistrer
                  </v-btn>
                </v-col>
              </v-row>
            </v-dialog>
            <div class="position-relative h-100" v-if="vehicul.chauffeur">
              <img
                :src="vehicul.chauffeur.profiluser.picture"
                @click="viewProfile(vehicul.chauffeur.id)"
                class="img-logo-cooperative cursor-pointor"
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
      loadingButton: false,
    };
  },
  methods: {
    handelDelete(vehicul) {
      Swal.fire({
        title: "Êtes-vous vraiment supprimer?",
        text: "Vous ne pourrez pas revenir en arrière !",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#032153",
        cancelButtonColor: "#ff3354",
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        focusConfirm: false,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.$axios
            .post("/api/vehicul/delete", {
              vehicul_id: vehicul.id,
            })
            .then((res) => {
              if (res.data.succes) {
                this.$emit("handelDelete", true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
      }).then((result) => {
        if (result.value) {
          Swal.fire("Supprimé!", "Votre vehicule a été supprimé.", "success");
        }
      });
    },
    handelUpdate(vehicul) {
      this.$emit("handelUpdate", true, false, vehicul);
    },
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
    associate(vehicul_id) {
      if (this.cin_number) {
        this.loadingButton = true;
        this.$axios
          .post("api/vehicul/associate-owner", {
            cin_number: this.cin_number,
            vehicul_id: vehicul_id,
          })
          .then((res) => {
            if (res.data.success) {
              this.loadingButton = false;
              this.$emit("associate", true);
            } else {
              this.loadingButton = false;
              Swal.fire({
                title: "Oups!",
                text: "Le CIN ne correspond pas",
                type: "error",
                toast: true,
                timer: 3000,
                position: "bottom",
              }).then((result) => {});
            }
          })
          .catch((error) => {
            console.log(error);
            this.loadingButton = false;
          });
      } else {
        Swal.fire({
          title: "Oups!",
          text: "Le CIN ne correspond pas",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/choicecadre.scss";
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

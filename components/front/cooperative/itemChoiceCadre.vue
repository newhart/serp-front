<template>
  <div class="d-flex justify-between w-100 item-cadrechoise">
    <div
      v-if="intineraries && cadre"
      class="d-flex w-100 flex-image-and-destination"
    >
      <v-img
        lazy-src="/img/Cadre_centrale.webp"
        :src="cadre.vehicul ? cadre.vehicul.image : cadre.gamme.image"
        class="img-vehicule-cooperative"
      >
        <div
          v-if="cadre.vehicul && cadre.vehicul.chauffeur"
          class="position-relative h-100"
        >
          <img
            :src="
              cadre.vehicul && cadre.vehicul.chauffeur
                ? cadre.vehicul.chauffeur.profiluser.picture
                : ''
            "
            class="img-logo-cooperative"
          />
          <div
            :class="
              cadre.vehicul &&
              cadre.vehicul.chauffeur &&
              cadre.vehicul.chauffeur.status === 'online'
                ? 'enlign'
                : 'enlign deconnecte'
            "
          ></div>
        </div>
      </v-img>
      <div class="details d-flex justify-between direction-column w-100 mx-4">
        <div>
          <p class="text-primary mb-2 font-bold">
            Sélectionnez votre destination
          </p>
          <v-radio-group hide-details class="ma-0 pa-0" v-model="radios">
            <v-radio
              v-for="(item, index) in intineraries"
              :key="index"
              :value="index"
              class="ma-0 pa-0"
              @click="choiced(item)"
            >
              <template v-slot:label>
                <div
                  class="d-flex justify-between w-100 flex-destination-checked"
                >
                  <p class="text-primary font12 font-bold">
                    {{ item.departure }} - {{ item.arrival }}
                  </p>
                  <p class="text-primary font12">
                    {{ item.price.toLocaleString() }} Ar/pers
                  </p>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <div
          class="d-flex align-center justify-between pt-2 flex-depart-responsive"
        >
          <p class="text-secondary font-bold">
            <span class="text-primary">Départ </span>
            le {{ $moment(date_depart).format("D MMMM YYYY") }}
            <span class="text-primary">à </span>
            {{ generateHours($moment(cadre.hour, "HH:mm").format("HH:mm  A")) }}
          </p>
          <p class="text-primary">
            <span class="text-secondary">{{ place_libre.length }}</span> places
            disponibles
          </p>
        </div>
      </div>
    </div>
    <div v-else class="d-flex w-100 flex-image-and-destination">
      <v-img class="img-vehicule-cooperative placeholder-wave"> </v-img>
      <div class="details d-flex justify-between direction-column w-100 mx-4">
        <div>
          <p class="text-primary mb-2 font-bold">
            Sélectionnez votre destination
          </p>
          <v-radio-group hide-details class="ma-0 pa-0" v-model="radios">
            <v-radio
              v-for="(item, index) in 3"
              :key="index"
              :value="index"
              class="ma-0 pa-0"
            >
              <template v-slot:label>
                <div
                  class="d-flex justify-between w-100 flex-destination-checked"
                >
                  <p class="text-primary font12 font-bold">...</p>
                  <p class="text-primary font12">... Ar/pers</p>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </div>
        <div
          class="d-flex align-center justify-between pt-2 flex-depart-responsive"
        >
          <p class="text-secondary font-bold">
            <span class="text-primary">Départ </span>
            le ...
            <span class="text-primary">à </span>
            ...
          </p>
          <p class="text-primary">
            <span class="text-secondary">...</span> places disponibles
          </p>
        </div>
      </div>
    </div>
    <div v-if="intineraries && cadre">
      <p class="text-primary mb-2 font-bold choisir-place px-3">
        Sélectionnez votre place
      </p>
      <v-row class="details-place max-w-320 pa-0 ma-0">
        <v-col class="px-1 py-0 col-resr details-donne-place" cols="6">
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
        <v-col class="px-1 py-0 col-resr" cols="6">
          <v-row class="ma-0">
            <v-col
              v-for="(itemPlace, index) in arrayplace"
              :key="index"
              :cols="cadre.cadre.banquette_number === 3 ? 4 : 3"
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
                @click="addPlace(index, itemPlace.status)"
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
        <v-col
          class="d-flex justify-end pa-1 col-resr"
          v-if="destinationChoiced && choiced_place.length > 0"
        >
          <v-dialog v-model="desactiveCompte" persistent max-width="415">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="font12 no-shadow"
              >
                Valider
              </v-btn>
            </template>
            <div class="no-shadow">
              <v-card-title class="pa-0 justify-center">
                <h4 class="font14 text-primary text-center">
                  Résumé de votre réservation
                </h4>
              </v-card-title>
              <hr class="my-2 widthplus" />
              <div class="details-desactivation">
                <p>
                  <span class="font-bold">Réservation au </span
                  >{{ $moment(Date.now()).format("D MMMM YYYY") }}
                </p>
                <p>
                  <span class="font-bold">Place numéro : </span>
                  <span
                    v-for="(place, index) in choiced_place"
                    :key="index * 8"
                  >
                    {{ place.number }}
                    {{ index + 1 !== choiced_place.length ? "," : "" }}
                  </span>
                </p>
                <p v-if="destinationChoiced">
                  <span class="font-bold">Montant : </span>
                  {{ destinationChoiced.price * choiced_place.length }} Ar
                </p>
                <p v-if="destinationChoiced">
                  <span class="font-bold">Destination :</span>
                  {{ destinationChoiced.departure }}-{{
                    destinationChoiced.arrival
                  }}
                </p>
                <p>
                  <span class="font-bold">Date de départ :</span>
                  {{ $moment(date_depart).format("D MMMM YYYY") }}
                </p>
                <p>
                  <span class="font-bold">Heure de départ :</span>
                  {{
                    generateHours(
                      $moment(cadre.hour, "HH:mm").format("HH:mm A")
                    )
                  }}
                </p>
                <p>
                  <span class="font-bold">Gamme de voiture : </span>
                  {{ cadre.gamme.name }}
                </p>
              </div>
              <hr
                v-if="$auth.user.user.id === cadre.gamme.user_id"
                class="my-2 widthplus"
              />
              <v-row
                class="ma-0 pb-3"
                v-if="$auth.user.user.id === cadre.gamme.user_id"
              >
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Nom du client</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="text"
                    class="input-global3"
                    v-model="form_client.name"
                  />
                </v-col>
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Prénom</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="text"
                    class="input-global3"
                    v-model="form_client.firstname"
                  />
                </v-col>
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Téléphone</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="number"
                    class="input-global3"
                    v-model="form_client.phone_number"
                  />
                </v-col>
              </v-row>
              <v-card-actions class="pa-0 justify-end">
                <v-btn
                  @click="desactiveCompte = false"
                  color="secondary"
                  class="font12"
                  height="35"
                >
                  Annuler
                </v-btn>
                <v-btn
                  @click="storeReservation()"
                  color="primary"
                  class="font12"
                  height="35"
                  :loading="loadingreservation"
                >
                  Confirmer
                </v-btn>
              </v-card-actions>
            </div>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <p class="text-primary mb-2 font-bold choisir-place px-3">
        Sélectionnez votre place
      </p>
      <v-row class="details-place max-w-320 pa-0 ma-0">
        <v-col class="px-1 py-0 col-resr details-donne-place" cols="6">
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
        <v-col class="px-1 py-0 col-resr" cols="6">
          <v-row class="ma-0">
            <v-col
              v-for="(itemPlace, index) in 19"
              :key="index"
              :cols="3"
              class="pa-1"
            >
              <div
                :class="'color-place-libre'"
                class="color placeholder-wave"
              ></div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="d-flex justify-end pa-1 col-resr"
          v-if="destinationChoiced && choiced_place.length > 0"
        >
          <v-dialog v-model="desactiveCompte" persistent max-width="415">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="font12 no-shadow"
              >
                Valider
              </v-btn>
            </template>
            <div class="no-shadow">
              <v-card-title class="pa-0 justify-center">
                <h4 class="font14 text-primary text-center">
                  Résumé de votre réservation
                </h4>
              </v-card-title>
              <hr class="my-2 widthplus" />
              <div class="details-desactivation">
                <p>
                  <span class="font-bold">Réservation au </span
                  >{{ $moment(Date.now()).format("D MMMM YYYY") }}
                </p>
                <p>
                  <span class="font-bold">Place numéro : </span>
                  <span
                    v-for="(place, index) in choiced_place"
                    :key="index * 8"
                  >
                    {{ place.number }}
                    {{ index + 1 !== choiced_place.length ? "," : "" }}
                  </span>
                </p>
                <p v-if="destinationChoiced">
                  <span class="font-bold">Montant : </span>
                  {{ destinationChoiced.price * choiced_place.length }} Ar
                </p>
                <p v-if="destinationChoiced">
                  <span class="font-bold">Destination :</span>
                  {{ destinationChoiced.departure }}-{{
                    destinationChoiced.arrival
                  }}
                </p>
                <p>
                  <span class="font-bold">Date de départ :</span>
                  {{ $moment(date_depart).format("D MMMM YYYY") }}
                </p>
                <p>
                  <span class="font-bold">Heure de départ :</span>
                  {{
                    generateHours(
                      $moment(cadre.hour, "HH:mm").format("HH:mm A")
                    )
                  }}
                </p>
                <p>
                  <span class="font-bold">Gamme de voiture : </span>
                  {{ cadre.gamme.name }}
                </p>
              </div>
              <hr
                v-if="$auth.user.user.id === cadre.gamme.user_id"
                class="my-2 widthplus"
              />
              <v-row
                class="ma-0 pb-3"
                v-if="$auth.user.user.id === cadre.gamme.user_id"
              >
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Nom du client</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="text"
                    class="input-global3"
                    v-model="form_client.name"
                  />
                </v-col>
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Prénom</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="text"
                    class="input-global3"
                    v-model="form_client.firstname"
                  />
                </v-col>
                <v-col class="pa-1 d-flex align-center" cols="4">
                  <p class="text-primary font12">Téléphone</p>
                </v-col>
                <v-col class="pa-1 px-0" cols="8">
                  <input
                    type="number"
                    class="input-global3"
                    v-model="form_client.phone_number"
                  />
                </v-col>
              </v-row>
              <v-card-actions class="pa-0 justify-end">
                <v-btn
                  @click="desactiveCompte = false"
                  color="secondary"
                  class="font12"
                  height="35"
                >
                  Annuler
                </v-btn>
                <v-btn
                  @click="storeReservation()"
                  color="primary"
                  class="font12"
                  height="35"
                  :loading="loadingreservation"
                >
                  Confirmer
                </v-btn>
              </v-card-actions>
            </div>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["cadre", "intineraries"],
  data() {
    return {
      radios: null,
      loadingreservation: false,
      arrayplace: [
        {
          numero: 0,
          status: "chauffeur",
        },
        {
          numero: 0,
          status: "vide",
        },
        {
          numero: 2,
          status: "reserver",
        },
        {
          numero: 3,
          status: "reserver",
        },
        {
          numero: 4,
          status: "libre",
        },
        {
          numero: 5,
          status: "libre",
        },
        {
          numero: 0,
          status: "vide",
        },
        {
          numero: 6,
          status: "libre",
        },
        {
          numero: 7,
          status: "reserver",
        },
        {
          numero: 8,
          status: "libre",
        },
        {
          numero: 0,
          status: "vide",
        },
        {
          numero: 9,
          status: "libre",
        },
        {
          numero: 10,
          status: "libre",
        },
        {
          numero: 11,
          status: "libre",
        },
        {
          numero: 0,
          status: "vide",
        },
        {
          numero: 12,
          status: "EncoursReservation",
        },
        {
          numero: 13,
          status: "libre",
        },
        {
          numero: 14,
          status: "EncoursReservation",
        },
        {
          numero: 15,
          status: "EncoursReservation",
        },
        {
          numero: 16,
          status: "reserver",
        },
      ],
      form_client: {
        name: null,
        firstname: null,
        phone_number: null,
      },
      choiced_place: [],
      radios: null,
      desactiveCompte: false,
      destinationChoiced: null,
      totalPrice: 0,
      date_depart: null,
      place_libre: [],
    };
  },
  methods: {
    addPlace(index, status) {
      if (this.arrayplace[index].status === "libre") {
        this.arrayplace[index].status = "MyPlace";
        if (this.radios === null) {
          Swal.fire({
            title: "Oups!",
            text: "Veuillez sélectionner votre destination",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
        }
      } else if (this.arrayplace[index].status === "MyPlace") {
        if (
          !(
            this.arrayplace[index].reservation &&
            this.arrayplace[index].reservation.user_id ===
              this.$auth.user.user.id
          )
        ) {
          this.arrayplace[index].status = "libre";
        }
      }

      this.choiced_place = this.arrayplace.filter(
        (item) => item.status === "MyPlace"
      );
    },

    choiced(itineraire) {
      this.destinationChoiced = itineraire;
    },

    generateHours(hour) {
      if (hour.includes("AM")) {
        return hour.replace("AM", " - Matin");
      }
      return hour.replace("PM", " - Midi");
    },

    storeReservation() {
      if (this.destinationChoiced) {
        const { name, firstname, phone_number } = this.form_client;
        if (this.$auth.user.user.id === this.cadre.gamme.user_id) {
          if (name === null || firstname === null || phone_number === null) {
            let beat = new Audio("../sound/mixkit-wrong.wav");
            beat.play();
            beat.volume = 0.1;
            this.$swal("Oops!", "Tout les champs sont obligatoires", "error");
            return false;
          }
        }
        this.loadingreservation = true;
        this.$axios
          .post("api/reservation/store", {
            cadre: this.cadre,
            departure_at: this.date_depart,
            reservation_at: this.$moment().format("YYYY-MM-DD"),
            mount: this.destinationChoiced.price * this.choiced_place.length,
            destination: `${this.destinationChoiced.departure}-${this.destinationChoiced.arrival}`,
            itineraire_id: this.destinationChoiced.id,
            departure_at: this.$moment(this.date_depart).format("YYYY-MM-DD"),
            hours: this.cadre.hour,
            gamme_type: this.cadre.gamme.name,
            choiced_place: this.choiced_place,
            name,
            firstname,
            phone_number,
          })
          .then((res) => {
            if (res.data.success) {
              this.desactiveCompte = false;
              this.loadingreservation = false;
              this.$emit("storeReservation", res.data.success);
              let beat = new Audio("../sound/mixkit-success.wav");
              beat.volume = 0.1;
              beat.play();
              this.$swal(
                "Réservé!",
                "Votre réservation a été prise en compte",
                "success"
              );
              //  reset form client
              this.form_client = {
                name: null,
                firstname: null,
                phone_number: null,
              };
              this.destinationChoiced = null;
              this.choiced_place = [];
            }
          })
          .catch((error) => {
            this.$swal("Oops!", "Une erreur est survenue", "error");
            console.log(error);
            this.loadingreservation = false;
          });
      }
    },
  },
  watch: {
    "$store.state.date.depart": {
      handler(val) {
        this.choiced_plac = [];
        this.destinationChoiced = null;
        this.arrayplace = this.cadre ? this.cadre.cadres : null;
        this.date_depart = val;
      },
      immediate: true,
    },

    cadre(value) {
      if (value) {
        this.arrayplace = value.cadres;
        this.place_libre = this.arrayplace.filter(
          (item) => item.status === "libre"
        );
      }
    },
  },

  mounted() {
    this.arrayplace = this.cadre ? this.cadre.cadres : this.arrayplace;
    if (this.arrayplace) {
      this.place_libre = this.arrayplace.filter(
        (item) => item.status === "libre"
      );
      this.arrayplace.forEach((item) => {
        if (
          item.reservation &&
          item.reservation.user_id === this.$auth.user.user.id
        ) {
          item.status = "MyPlace";
        }
      });
      this.date_depart = this.$store.state.date.depart
        ? this.$store.state.date.depart
        : this.cadre.depart_at;
      this.choiced_place = [];
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/choicecadre.scss";
.max-w-320 {
  justify-content: space-between;
}

.max-w-320 .col.col-resr:nth-child(2) {
  max-width: 170px !important;
}
@media (max-width: 1459px) {
  p.text-secondary.font-bold.ml-12 {
    margin-left: 0 !important;
  }
  .align-center.flex-depart-responsive {
    flex-direction: column;
    align-items: flex-start !important;
  }
}
@media (max-width: 1459px) and (min-width: 1101px), (max-width: 905px) {
  .item-cadrechoise {
    flex-direction: column;
  }
  .max-w-320 {
    max-width: 100% !important;
    width: 100% !important;
  }
  .max-w-320 .col.col-resr:nth-child(2) {
    max-width: 300px;
  }
  .max-w-320 .col.col-resr:nth-child(3) {
    max-width: 100%;
    width: 100%;
    flex: 100%;
  }
  .choisir-place {
    margin-top: 15px !important;
  }
  p.text-secondary.font-bold.ml-12 {
    margin-left: 0 !important;
  }
}
@media (max-width: 600px) {
  .d-flex.justify-between.item-cadrechoise {
    flex-direction: column;
    border: 1px #8b8b8b2e solid;
    margin-bottom: 10px;
    border-radius: 20px;
    padding: 4px 4px 15px;
  }
  .img-vehicule-cooperative {
    width: 100px !important;
    max-width: 100px !important;
    max-height: 100px;
    border-radius: 10px !important;
  }
  .v-application .details.mx-4 {
    margin-right: 0px !important;
    margin-left: 0px !important;
    padding: 0 10px;
  }
}
@media (max-width: 400px) {
  .flex-destination-checked {
    flex-direction: column;
  }
}
@media (max-width: 440px) {
  .flex-image-and-destination {
    flex-direction: column;
    align-items: center;
  }
  .img-vehicule-cooperative {
    margin: 10px 0;
  }
  .details-donne-place {
    max-width: 130px !important;
  }
  .max-w-320 {
    min-width: 100%;
  }
}
@media (max-width: 1459px) {
  .flex-depart-responsive p:last-child {
    display: none;
  }
}
</style>

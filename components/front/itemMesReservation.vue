<template>
  <div class="d-flex justify-between w-100 item-cadrechoise">
    <div class="list-passage w-100 pr-6 mr-6">
      <div
        class="d-flex align-center justify-between flex-depart-responsive pb-1"
      >
        <p class="text-secondary font-bold">
          <span class="text-primary">Départ </span>
          le {{ $moment(date_depart).format("D MMMM YYYY") }}
          <span class="text-primary">à </span>
          {{ generateHours($moment(cadre.hour, "HH:mm").format("HH:mm A")) }}
          |<span class="text-primary"> {{ cadre.gamme.name }}</span>
        </p>
        <p class="text-primary font-bold">
          <span class="text-secondary">{{ place_libre.length }}</span>
          place(s) disponible(s)
        </p>
      </div>
      <v-row
        v-for="(item, index) in cadrereservation"
        :key="index"
        class="ma-0"
      >
        <v-col v-if="item.reservation" cols="8" class="details-place pa-1 px-0">
          <div class="d-flex align-center">
            <div class="color color-vos-place">{{ item.number }}</div>
            <p class="ml-1 font12 text-primary">
              <span class="font-bold">{{
                item.reservation.client
                  ? item.reservation.client.firstname
                  : item.reservation.user.lastname
              }}</span>
              -
              {{
                item.reservation.client
                  ? item.reservation.client.phone_number
                  : item.reservation.user.phone_number
              }}
            </p>
          </div>
        </v-col>
        <v-col
          v-if="item.reservation"
          cols="4"
          class="d-flex align-center justify-end pa-1 px-0"
        >
          <v-icon color="primary" size="15" class="pr-2"> mdi-check </v-icon>
          <p class="font12 text-primary">{{ item.reservation.destination }}</p>
        </v-col>
      </v-row>
    </div>
    <div>
      <p class="text-primary mb-2 font-bold">Sélectionnez votre destination</p>
      <v-row class="details-place max-w-320 pa-0 ma-0">
        <v-col class="px-1 py-0">
          <v-radio-group hide-details class="ma-0 pa-0" v-model="radios">
            <v-radio
              v-for="(item, index) in intineraries"
              :key="index"
              :value="index"
              class="ma-0 pa-0"
              @click="choiced(item)"
            >
              <template v-slot:label>
                <div class="d-flex justify-between w-100">
                  <p class="text-primary font12">
                    {{ item.departure }} - {{ item.arrival }}
                  </p>
                </div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col style="max-width: 200px" class="px-1 py-0">
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
                class="color ml-auto mr-0"
                v-if="
                  itemPlace.status != 'chauffeur' && itemPlace.status != 'vide'
                "
              >
                {{ itemPlace.number }}
              </div>
              <div
                class="color color-chaffeur ml-auto mr-0"
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
          class="d-flex justify-end pa-1"
          v-if="destinationChoiced && choiced_place.length > 0"
          cols="12"
        >
          <v-dialog v-model="desactiveCompte" persistent max-width="415">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="font12 no-shadow"
              >
                Réserver votre place
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
              <hr class="my-2 widthplus" />
              <v-row
                class="ma-0 pb-3"
                v-if="$auth.user.user.user_type_id === 1"
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
                  <v-text-field
                    v-model="form_client.phone_number"
                    :rules="[rules.required, rules.minphone]"
                    placeholder="Téléphone"
                    prepend-inner-icon="mdi-phone"
                    required
                    outlined
                    clearable
                    solo
                    class="input-globale"
                    height="35px"
                    min-height="35px"
                    type="number"
                  ></v-text-field>
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
export default {
  props: ["cadre", "intineraries", "cadrereservation"],
  data() {
    return {
      radios: null,
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
      // rules fo validation
      rules: {
        required: (value) => !!value || "Obligatoire",
        minphone: (v) =>
          (v && v.length == 10) ||
          "Le numéro de téléphone doit contenir 10 caractères.",
      },
    };
  },
  methods: {
    addPlace(index, status) {
      if (this.arrayplace[index].status === "libre") {
        this.arrayplace[index].status = "MyPlace";
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
        (item) => item.status === "MyPlace" && item.reservation_id === null
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
        if (this.$auth.user.user.user_type_id === 1) {
          if (name === null || firstname === null || phone_number === null) {
            let beat = new Audio("../sound/mixkit-wrong.wav");
            beat.play();
            beat.volume = 0.1;
            this.$swal("Oops!", "Tout les champs sont obligatoires", "error");
            return false;
          }
          if (phone_number.length !== 10) {
            return false;
          }
        }
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
              this.$emit("storeReservation", res.data.success);
              let beat = new Audio("../sound/mixkit-success.wav");
              beat.volume = 0.1;
              beat.play();
              this.$swal(
                "Réservé!",
                "Votre réservation a bien été prise en compte",
                "success"
              );
              //  reset form client
              this.form_client = {
                name: null,
                firstname: null,
                phone_number: null,
              };
            }
          })
          .catch((error) => {
            this.$swal("Oops!", "Une erreur est survenue", "error");
            console.log(error);
          });
      }
    },
  },
  watch: {
    "$store.state.date.depart": {
      handler(val) {
        this.choiced_plac = [];
        this.destinationChoiced = null;
        this.arrayplace = this.cadre.cadres;
        this.date_depart = val;
      },
      immediate: true,
    },

    cadre(value) {
      this.arrayplace = value.cadres;
      this.place_libre = this.arrayplace.filter(
        (item) => item.status === "libre"
      );
    },
  },
  mounted() {
    this.arrayplace = this.cadre.cadres;
    this.place_libre = this.arrayplace.filter(
      (item) => item.status === "libre"
    );
    // this.arrayplace.forEach((item) => {
    //   if (
    //     item.reservation &&
    //     item.reservation.user_id === this.$auth.user.user.id
    //   ) {
    //     item.status = "MyPlace";
    //   }
    // });
    this.date_depart = this.$store.state.date.depart
      ? this.$store.state.date.depart
      : this.cadre.depart_at;
  },
};
</script>
<style lang="scss" scoped>
.item-cadrechoise {
  padding: 0 !important;
  border-bottom: none !important;
}
.list-passage {
  border-right: 1px #0000000f solid;
}
.max-w-320 {
  max-width: 460px !important;
  min-width: 460px !important;
}
@import "~/assets/choicecadre.scss";
@media (max-width: 1903px) {
  .item-cadrechoise {
    flex-direction: column;
  }
  .max-w-320 {
    max-width: 100% !important;
    width: 100% !important;
  }
  .max-w-320 .col-6:last-child {
    max-width: 300px;
  }
  .choisir-place {
    margin-top: 15px !important;
  }
  .list-passage.w-100.pr-6.mr-6 {
    padding-right: 0 !important;
    margin-right: 0 !important;
    border-right: none;
    border-bottom: 1px rgba(0, 0, 0, 0.05882) solid;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}
@media (max-width: 600px) {
  .d-flex.justify-between.item-cadrechoise {
    border: none;
  }
  .align-center.flex-depart-responsive {
    flex-direction: column;
    align-items: flex-start !important;
  }
}
@media (max-width: 575px) {
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
    min-width: 100% !important;
  }
}
</style>

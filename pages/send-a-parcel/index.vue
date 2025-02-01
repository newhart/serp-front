<template>
  <div class="my-3">
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="d-flex align-center justify-between mb-3">
            <h3 class="text-secondary font-bold underline-bottom">Colis</h3>
            <v-btn @click="tab = 1" class="font12" color="secondary">
              Envoyer un colis
            </v-btn>
          </div>
          <hr class="border-primary w-plus" />
          <!-- <v-row class="ma-0 my-2 block-filtre">
            <v-col
              class="pa-2 d-flex cursor-pointor"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <img
                class="mr-2"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary">Livrée à: Tamatave</p>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <img
                class="mr-2"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary">Etat: Livrée</p>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <img
                class="mr-2"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary">le: 12 décembre 2022</p>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <img
                class="mr-2"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary">par: 8849 TBK</p>
            </v-col>
          </v-row>
          <hr class="border-primary" /> -->
          <div class="py-2">
            <div class="ma-0 row">
              <v-col cols="12" xl="6" lg="6" md="6" class="pa-1 ma-0">
                <div v-if="validate_colis" class="ma-0 row">
                  <v-col cols="12" class="pa-1 ma-0">
                    <h3
                      class="text-secondary font-bold underline-bottom w-fit-content"
                    >
                      Colis livré
                    </h3>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pa-1 ma-0"
                    v-for="(valid, key) in validate_colis"
                    :key="key"
                  >
                    <FrontColisItemcolis :colis="valid" @changeColis="udpate" />
                  </v-col>
                </div>
                <div v-else class="ma-0 row">
                  <v-col cols="12" class="pa-1 ma-0">
                    <h3
                      class="text-secondary font-bold underline-bottom w-fit-content"
                    >
                      Chargement...
                    </h3>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pa-1 ma-0"
                    v-for="(valid, key) in 3"
                    :key="key"
                  >
                    <FrontColisItemcolis />
                  </v-col>
                </div>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" class="pa-1 ma-0">
                <div v-if="pedding_colis" class="ma-0 row">
                  <v-col cols="12" class="pa-1 ma-0">
                    <h3
                      class="text-secondary font-bold underline-bottom w-fit-content"
                    >
                      Demande d'envoi de colis
                    </h3>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pa-1 ma-0"
                    v-for="(colis, key) in pedding_colis"
                    :key="key.id"
                  >
                    <FrontColisItemcolis :colis="colis" @changeColis="udpate" />
                  </v-col>
                </div>
                <div v-else class="ma-0 row">
                  <v-col cols="12" class="pa-1 ma-0">
                    <h3
                      class="text-secondary font-bold underline-bottom w-fit-content"
                    >
                      Chargement...
                    </h3>
                  </v-col>
                  <v-col
                    cols="12"
                    class="pa-1 ma-0"
                    v-for="(valid, key) in 3"
                    :key="key"
                  >
                    <FrontColisItemcolis />
                  </v-col>
                </div>
              </v-col>
            </div>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="block-globale-nv">
            <div class="d-flex align-center mb-2">
              <v-btn @click="tab = 0" icon class="mr-3">
                <v-icon color="secondary"> mdi-arrow-left-circle </v-icon>
              </v-btn>
              <h3 class="text-secondary underline-bottom font-bold">
                Envoyer un colis
              </h3>
            </div>
            <v-row class="ma-0">
              <v-col cols="8" class="pa-1">
                <v-row
                  class="pa-2 ma-0 mt-3 info-destinataire"
                  ref="info-destinataire"
                >
                  <v-col class="px-1 py-0" cols="12">
                    <div class="form-input">
                      <div class="bannier-exemple add-img-pub mx-auto mb-2">
                        <div class="z-0">
                          <p class="text-center font12">Photo du colis</p>
                          <v-icon
                            size="45"
                            class="text-center d-block"
                            color="primary"
                          >
                            mdi-plus-circle
                          </v-icon>
                          <p class="text-primary text-center font12">
                            Voir l'aperçu
                          </p>
                        </div>
                        <img
                          class="img-upload"
                          :src="colis_form.image"
                          v-if="colis_form.image"
                          alt=""
                        />
                        <input
                          type="file"
                          @change="handelPreviewFile($event, 'image')"
                          class="upload-img"
                        />
                      </div>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <p class="font-bold">Type</p>
                    <div class="form-input">
                      <input
                        type="text"
                        class="input-global1 my-2 pa-2"
                        v-model="colis_form.type"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Montant</p>
                      <input
                        type="number"
                        class="input-global1 my-2 pa-2"
                        v-model="colis_form.price"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Lieu de départ</p>
                      <v-select
                        :items="allDestination"
                        item-text="name"
                        solo
                        label="Départ"
                        class="input-global2 my-2"
                        v-model="colis_form.departure"
                        hide-details
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Lieu d'arrivé</p>
                      <v-select
                        :items="allArrival"
                        solo
                        item-text="name"
                        label="Arrivé"
                        class="input-global2 my-2"
                        v-model="colis_form.arrival"
                        hide-details
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Date d'envoi</p>
                      <v-menu
                        ref="menudatedepart"
                        v-model="menudatedepart"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            solo
                            hide-details
                            v-model="colis_form.depar_at"
                            height="40"
                            class="input-global2 my-2"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          >
                            <template v-slot:label>
                              <p class="ml-0">
                                <v-icon size="20" class="text-secondary">
                                  mdi-calendar-month
                                </v-icon>
                                JJ/MM/AA
                              </p>
                            </template>
                          </v-text-field>
                        </template>
                        <v-row>
                          <v-date-picker
                            v-model="colis_form.depar_at"
                            :max="'2050-01-01'"
                            :min="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            @change="save"
                          ></v-date-picker>
                        </v-row>
                      </v-menu>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Référence</p>
                      <input
                        type="text"
                        value="19122022-C002"
                        v-model="colis_form.reference"
                        disabled
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="12">
                    <hr class="my-2 border-primary" />
                  </v-col>
                  <v-col class="px-1 py-0" cols="12">
                    <p class="mb-3 text-secondary font-bold">Expéditeur</p>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Nom</p>
                      <input
                        type="text"
                        class="input-global1 my-2 pa-2"
                        v-model="form_clients[0].name"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Prénom</p>
                      <input
                        type="text"
                        class="input-global1 my-2 pa-2"
                        v-model="form_clients[0].firstname"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Téléphone</p>
                      <v-text-field
                        type="number"
                        class="input-global1 my-2 py-0 mb-5"
                        required
                        :rules="[rules.required, rules.minphone]"
                        v-model="form_clients[0].phone_number"
                        solo
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Numéro CIN</p>
                      <v-text-field
                        type="number"
                        class="input-global1 my-2 py-0 mb-5"
                        v-model="form_clients[0].cin_number"
                        required
                        :rules="[rules.required, rules.mincin]"
                        solo
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="12">
                    <hr class="my-2 border-primary" />
                  </v-col>
                  <v-col class="px-1 py-0" cols="12">
                    <p class="mb-3 text-secondary font-bold">Destinataire</p>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Nom</p>
                      <input
                        type="text"
                        class="input-global1 my-2 pa-2"
                        v-model="form_clients[1].name"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Prénom</p>
                      <input
                        type="text"
                        class="input-global1 my-2 pa-2"
                        v-model="form_clients[1].firstname"
                      />
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Téléphone</p>
                      <v-text-field
                        type="number"
                        class="input-global1 my-2 py-0"
                        required
                        :rules="[rules.required, rules.minphone]"
                        v-model="form_clients[1].phone_number"
                        solo
                      ></v-text-field>
                    </div>
                  </v-col>
                  <v-col class="px-1 py-0" cols="6">
                    <div class="form-input">
                      <p class="font-bold">Numéro CIN</p>
                      <v-text-field
                        type="number"
                        class="input-global1 my-2 py-0"
                        v-model="form_clients[1].cin_number"
                        required
                        :rules="[rules.required, rules.mincin]"
                        solo
                      ></v-text-field>
                    </div>
                  </v-col>
                </v-row>
                <div class="d-flex justify-end mt-2 mb-2 px-3">
                  <v-btn
                    color="dark"
                    @click="tab = 0"
                    class="mx-2 no-shadow font12"
                  >
                    ANNULER
                  </v-btn>
                  <v-btn
                    @click="validate()"
                    class="no-shadow font12"
                    :loading="loadCreation"
                    color="secondary"
                  >
                    ENVOYER VOTRE COLIS
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="4" class="pa-1">
                <div class="ma-0 row">
                  <v-col
                    cols="12"
                    class="pa-1 ma-0 d-flex align-center justify-between"
                  >
                    <h4 class="text-primary w-fit-content">TOUS LES COLIS</h4>
                    <p @click="tab = 0" class="text-success cursor-pointor">
                      Afficher tous
                    </p>
                  </v-col>
                  <v-col
                    v-for="(item, i) in validate_colis"
                    :key="i"
                    cols="12"
                    class="pa-1 ma-0"
                  >
                    <FrontColisItemcolis :colis="item" @changeColis="udpate" />
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  head: {
    titleTemplate: "R23 - Envoyer votre colis",
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      loadCreation: false,
      dialogsreussie: false,
      categorie: ["Formation en ligne", "Formation en Locaux"],
      selectedcategorie: "Formation en ligne",
      lieuDepart: ["Antananarivo", "Toamasina"],
      lieuArrive: ["Antananarivo", "Toamasina"],
      selectedarrive: "",
      selecteddepart: "",
      confidentiality: ["Public", "Moi uniquement"],
      selectedconfidentiality: "Public",
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      expediteur: {
        selectedcoperative: "",
        selectednumvehicule: "",
      },
      rules: {
        required: (value) => !!value || "Obligatoire",
        minphone: (v) =>
          (v && v.length == 10) ||
          "Le numéro de téléphone doit contenir 10 caractères.",
        mincin: (v) =>
          (v && v.length == 12) ||
          "Le numéro de la CIN doit contenir 12 caractères.",
      },
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
      etapeEnvoye: 1,
      menutimefin: false,
      overlaymodif: false,
      tab: 0,

      // form colis
      colis_form: {
        type: null,
        price: null,
        depar_at: null,
        arrival: null,
        departure: null,
        reference: null,
        image: null,
      },
      // form cliens
      form_clients: [
        {
          name: null,
          firstname: null,
          phone_number: null,
          cin_number: null,
          type: "sender",
        },
        {
          name: null,
          firstname: null,
          phone_number: null,
          cin_number: null,
          type: "recipient",
        },
      ],

      pedding_colis: null,
      validate_colis: null,
      allDestination: [],
      allArrival: [],
    };
  },

  async fetch() {
    const pedding = await this.$axios.get("api/colis/index", {
      params: {
        status: "En cours",
      },
    });
    this.pedding_colis = pedding.data;

    const validate = await this.$axios.get("api/colis/index", {
      params: {
        status: "Livré",
      },
    });
    this.validate_colis = validate.data;
    const res = await this.$axios.get("api/all-intineraire");
    this.allDestination = res.data;
    this.allArrival = res.data;

    const latestColis = await this.$axios.get("api/colis/latestColis");
    console.log("latestColis", latestColis.data);
    this.colis_form.reference =
      "CL-00" +
      ((latestColis.data && latestColis.data.id ? latestColis.data.id : null) +
        1);
  },

  methods: {
    async getColis(type) {
      const pedding = await this.$axios.get("api/colis/index", {
        params: {
          status: "En cours",
        },
      });
      this.pedding_colis = pedding.data;

      const validate = await this.$axios.get("api/colis/index", {
        params: {
          status: "Livré",
        },
      });
      this.validate_colis = validate.data;
    },

    udpate() {
      this.$axios
        .get("api/colis/index", {
          params: {
            status: "En cours",
          },
        })
        .then((res) => {
          this.pedding_colis = res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$axios
        .get("api/colis/index", {
          params: {
            status: "Livré",
          },
        })
        .then((res) => {
          this.validate_colis = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    save(date) {
      this.$refs.menudatedepart.save(date);
      this.colis_form.depar_at = date;
    },
    save1(date) {
      this.$refs.menudatefin.save(date);
    },
    handelPreviewFile(event, type) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.colis_form.image = e.currentTarget.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    validate() {
      if (!this.colis_form.image) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter l'image de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.colis_form.type || this.colis_form.type === "") {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le type de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.colis_form.price || this.colis_form.price === "") {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le montant",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.colis_form.depar_at) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le lieu de départ de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.colis_form.arrival) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter la destination de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.colis_form.departure) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter la date de départ de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.form_clients[0].name || this.form_clients[0].name === "") {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le nom de l'expéditeur",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[0].firstname ||
        this.form_clients[0].firstname === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le prénom de l'expéditeur",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[0].phone_number ||
        this.form_clients[0].phone_number === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le numéro de téléphone de l'expéditeur",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        this.form_clients[0].phone_number &&
        this.form_clients[0].phone_number.length !== 10
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Le numéro de téléphone de l'expéditeur doit contenir 10 caractères",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[0].cin_number ||
        this.form_clients[0].cin_number === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le numéro de la CIN de l'expéditeur",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        this.form_clients[0].cin_number &&
        this.form_clients[0].cin_number.length != 12
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Le numéro de la CIN de l'expéditeur doit contenir 12 caractères",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (!this.form_clients[1].name || this.form_clients[1].name === "") {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le nom du destinataire de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[1].firstname ||
        this.form_clients[1].firstname === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le prénom du destinataire de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[1].phone_number ||
        this.form_clients[1].phone_number === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le numéro de téléphone du destinataire de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        this.form_clients[1].phone_number &&
        this.form_clients[1].phone_number.length != 10
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Le numéro de téléphone du destinataire doit contenir 10 caractères",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        !this.form_clients[1].cin_number ||
        this.form_clients[1].cin_number === ""
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Vous devez ajouter le numéro de la CIN du destinataire de votre colis",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        this.form_clients[1].cin_number &&
        this.form_clients[1].cin_number.length !== 12
      ) {
        Swal.fire({
          title: "Oups!",
          text: "Le numéro de la CIN du destinataire doit contenir 12 caractères",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      this.loadCreation = true;
      const form = { ...this.colis_form, clients: this.form_clients };
      this.$axios
        .post("api/colis/store", form)
        .then((res) => {
          if (res.data.success) {
            this.tab = 0;
            this.$fetch();
            (this.colis_form = {
              type: null,
              price: null,
              depar_at: null,
              arrival: null,
              departure: null,
              reference: null,
              image: null,
            }),
              // form cliens
              (this.form_clients = [
                {
                  name: null,
                  firstname: null,
                  phone_number: null,
                  cin_number: null,
                  type: "sender",
                },
                {
                  name: null,
                  firstname: null,
                  phone_number: null,
                  cin_number: null,
                  type: "recipient",
                },
              ]),
              this.$swal(
                "Bravo!",
                "Votre demande d'envoye de colis a été envoyé avec success",
                "success"
              );
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            this.loadCreation = false;
          } else {
            Swal.fire({
              title: "Oups!",
              text: res.data.error,
              type: "error",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
            this.loadCreation = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    envoyer() {
      if (this.etapeEnvoye === 2) {
        this.dialogsreussie = true;
        window.location.href = "";
      }
      if (this.etapeEnvoye === 1) {
        this.etapeEnvoye++;
        this.overlaymodif = true;
        this.scroll();
      }
    },
  },
  watch: {
    menudatedepart(val) {
      val && setTimeout(() => (this.activePicker1 = "YEAR"));
    },
    menudatefin(val) {
      val && setTimeout(() => (this.activePicker2 = "YEAR"));
    },

    "colis_form.departure": {
      handler(value) {
        console.log(value);
        this.allArrival = this.allDestination.filter(
          (item) => item.name !== value
        );
      },
      immediate: true,
    },
    // "colis_form.arrival": {
    //   handler(value) {
    //     console.log(value);
    //     this.allDestination = this.allArrival.filter(
    //       (item) => item.name !== value
    //     );
    //   },
    //   immediate: true,
    // },
    tab: {
      handler(value) {
        // if (value === 1) {
        //   this.colis_form.reference =
        //     "CL-" + this.$moment().format("DDMMYYYYHHMMSS");
        // }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/dernierinscrit.scss";
@import "~/assets/username.scss";
.ma-0.block-filtre {
  border: 1px #0321533b solid;
  margin-top: 7px !important;
}
input.upload-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
}

.add-img-pub {
  width: 115px;
  height: 115px;
}
.block-filtre {
  background-color: #ffffffd9;
  border-radius: 10px;
  padding: 5px;
}
.active {
  border-radius: 8px !important;
  .text-primary {
    color: #fff;
  }
}
hr.border-primary {
  border-bottom: 1px #03215324 solid;
  border-top: none;
}
.w-plus {
  width: calc(100% + 24px);
  margin-left: -12px;
}
.bio {
  margin: -12px 0 0 -12px;
  border-radius: 15px 0 0;
  padding: 0px 20px;
  margin-right: 10px;
}
.image-inass {
  height: 316px;
  border-radius: 10px;
  overflow: hidden;
}
.image-inass.petite-format {
  height: 140px;
}
.info-destinataire {
  height: fit-content;
}
.image-inass img {
  object-fit: cover;
}
.block-colis {
  padding: 15px;
  border: 1px #ff33541c solid;
  overflow: hidden;
  border-radius: 15px;
}
@media (max-width: 767px) {
  .image-inass-petite.col-3 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
@media (max-width: 428px) {
  .image-inass {
    height: 190px;
  }
}
@media (max-width: 600px) {
  .block-filtre {
    top: 0 !important;
  }
}
</style>

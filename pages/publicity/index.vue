<template>
  <div class="my-3">
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="d-flex align-center justify-between mb-3">
            <h3 class="text-secondary font-bold underline-bottom">Publicité</h3>
            <v-btn @click="creerpub()" class="font12" color="secondary">
              Créer votre publicité
            </v-btn>
          </div>
          <hr class="border-primary w-plus" />
          <v-row class="ma-0 my-2 block-filtre">
            <v-col
              class="pa-2 d-flex cursor-pointor align-center"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <v-icon color="secondary" class="mr-2">
                mdi-calendar-month-outline
              </v-icon>
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                min-width="auto"
                bottom
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date_launch_min"
                    readonly
                    clearable
                    label="Du"
                    outlined
                    class="input-global2 choisedate"
                    v-bind="attrs"
                    v-on="on"
                    solo
                    hide-details
                    @input="getAllPublicity()"
                  ></v-text-field>
                </template>
                <v-row justify="center">
                  <v-date-picker
                    v-model="date_launch_min"
                    :max="'2052-01-01'"
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    @change="getAllPublicity()"
                  ></v-date-picker>
                </v-row>
              </v-menu>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor align-center"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <v-icon color="secondary" class="mr-2">
                mdi-calendar-month-outline
              </v-icon>
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                min-width="auto"
                bottom
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date_end_max"
                    label="Au"
                    readonly
                    clearable
                    outlined
                    class="input-global2 choisedate"
                    v-bind="attrs"
                    v-on="on"
                    solo
                    hide-details
                    @input="getAllPublicity()"
                  ></v-text-field>
                </template>
                <v-row justify="center">
                  <v-date-picker
                    v-model="date_end_max"
                    :max="'2052-01-01'"
                    :min="
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .substr(0, 10)
                    "
                    @change="getAllPublicity()"
                  ></v-date-picker>
                </v-row>
              </v-menu>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor align-center"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <v-icon color="secondary" class="mr-2"> mdi-star-box </v-icon>
              <vue-select
                :options="['En ligne', 'En attente', 'Expiré']"
                v-model="etatPub"
                placeholder="Etat de la publicité"
                class="w-100"
                @input="getAllPublicity()"
                hide-details
              >
                <template #no-options="{ search, searching, loading }">
                  Aucun résultat
                </template>
              </vue-select>
            </v-col>
            <v-col
              class="pa-2 d-flex cursor-pointor align-center"
              cols="12"
              xl="3"
              lg="3"
              md="3"
              sm="6"
              xs="6"
            >
              <input
                v-model="search"
                placeholder="Rechercher..."
                class="search w-100"
                @input="getAllPublicity()"
              />
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
          <hr class="border-primary" />
          <div class="py-2">
            <div v-if="allpublicity">
              <div v-if="allpublicity.length > 0" class="ma-0 row">
                <v-col
                  v-for="(pub, index) in allpublicity"
                  :key="index"
                  cols="12"
                  xl="4"
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                  class="pa-1 ma-0"
                >
                  <FrontDefaultItemPublicityOfme
                    @deleted="deleted($event, index)"
                    :publicity="pub"
                  />
                </v-col>
              </div>
              <div v-else>
                <FrontDefaultNoresult />
              </div>
            </div>
            <div v-else class="ma-0 row">
              <v-col
                v-for="(publicity, index) in 9"
                :key="index"
                cols="12"
                xl="4"
                lg="6"
                md="6"
                sm="6"
                xs="6"
                class="pa-1 ma-0"
              >
                <FrontDefaultItemPublicityOfme
                  @deleted="deleted($event, index)"
                />
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
              <h3 class="text-secondary font-bold underline-bottom">
                Créer votre publicité
              </h3>
            </div>
            <v-row class="ma-0">
              <v-col cols="12" xl="6" lg="6" md="6" sm="12">
                <div>
                  <p class="mb-3 font-bold text-underline">
                    Placement de la publicité
                  </p>
                  <div class="d-flex justify-between">
                    <v-radio-group
                      v-model="publicity.format"
                      :value="publicity.format"
                      class="ma-0"
                      hide-details
                    >
                      <div>
                        <v-radio
                          :label="item.typePublicity"
                          color="primary"
                          :value="item.typePublicity"
                          v-for="(item, i) in typesPublicity"
                          :key="i"
                          class="ma-0"
                        ></v-radio>
                      </div>
                    </v-radio-group>
                    <div class="bannier-exemple add-img-pub">
                      <div class="z-0">
                        <p class="text-center">
                          Insérer l'image de la publicité
                        </p>
                        <v-icon
                          size="45"
                          class="text-center d-block"
                          color="primary"
                        >
                          mdi-plus-circle
                        </v-icon>
                        <p class="text-primary text-center">Voir l'aperçu</p>
                      </div>
                      <img
                        class="img-upload"
                        v-if="publicity.image"
                        :src="publicity.image"
                        alt=""
                      />
                      <input
                        type="file"
                        @change="handelPreviewFile($event, 'image')"
                        class="upload-img"
                      />
                    </div>
                  </div>
                </div>
                <hr class="border-primary mt-3" />
                <v-row
                  v-if="publicity.format === 'Sidebar gauche'"
                  class="ma-0"
                >
                  <v-col cols="12" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Titre de la publicité :</p>
                      <input
                        v-model="publicity.title"
                        type="text"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Téléphone</p>
                      <input
                        v-model="publicity.phone_number"
                        type="number"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div class="form-input">
                      <p class="font-bold">Description :</p>
                      <textarea
                        class="input-global1 mt-2 pa-2"
                        cols="30"
                        rows="10"
                        v-model="publicity.description"
                      ></textarea>
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div>
                      <p class="font-bold">Lien</p>
                      <div class="form-input my-2">
                        <v-text-field
                          solo
                          hide-details
                          height="40"
                          class="input-global2 my-2"
                          v-model="publicity.url"
                        >
                          <template v-slot:label>
                            <p class="ml-0">
                              <v-icon size="20" class="text-secondary">
                                mdi-link
                              </v-icon>
                              Insérer votre lien
                            </p>
                          </template>
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row
                  v-if="publicity.format === 'Voiture à louer'"
                  class="ma-0"
                >
                  <v-col cols="6" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Votre numéro de téléphone</p>
                      <input
                        v-model="publicity.phone_number"
                        type="number"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Titre de la publicité :</p>
                      <input
                        v-model="publicity.title"
                        type="text"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div>
                      <p class="font-bold">Place</p>
                      <div class="form-input my-2">
                        <v-text-field
                          solo
                          hide-details
                          height="40"
                          class="input-global2 my-2"
                          v-model="publicity.place"
                          type="number"
                        >
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div>
                      <p class="font-bold">Energie</p>
                      <div class="form-input my-2">
                        <v-select
                          :items="['Gasoil', 'Essence']"
                          solo
                          class="input-global2 my-2"
                          v-model="publicity.energie"
                          item-text="name"
                          hide-details
                          return-object
                        ></v-select>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div>
                      <p class="font-bold">Traçage</p>
                      <div class="form-input my-2">
                        <v-select
                          :items="['Avec GPS', 'Sans GPS']"
                          solo
                          class="input-global2 my-2"
                          v-model="publicity.disponibility"
                          item-text="name"
                          hide-details
                          return-object
                        ></v-select>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div class="form-input">
                      <p class="font-bold">Option</p>
                      <v-select
                        :items="[
                          'Climatisation disponible',
                          'Climatisation non disponible',
                        ]"
                        solo
                        class="input-global2 my-2"
                        v-model="publicity.option"
                        item-text="name"
                        hide-details
                        return-object
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Option de vitesse</p>
                      <v-select
                        :items="['Manuelle', 'Automatique']"
                        solo
                        class="input-global2 my-2"
                        v-model="publicity.option_vitesse"
                        item-text="name"
                        hide-details
                        return-object
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Nombre de(s) porte(s)</p>
                      <v-text-field
                        solo
                        hide-details
                        height="40"
                        class="input-global2 my-2"
                        type="number"
                        v-model="publicity.nomber_porte"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div class="form-input">
                      <p class="font-bold">Politique de carburant</p>
                      <v-select
                        :items="['Plein/Plein']"
                        solo
                        class="input-global2 my-2"
                        v-model="publicity.politique_carburant"
                        item-text="name"
                        hide-details
                        return-object
                      ></v-select>
                    </div>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <div>
                      <p class="font-bold">Prix journalier</p>
                      <div class="form-input my-2">
                        <v-text-field
                          solo
                          hide-details
                          height="40"
                          class="input-global2 my-2"
                          type="number"
                          v-model="publicity.prix_journalier"
                        >
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                  <!-- <v-col cols="12" class="pa-1">
                    <div>
                      <p class="font-bold">Une autre desciption</p>
                      <div class="form-input my-2">
                        <textarea
                          class="input-global1 mt-2 pa-2"
                          cols="30"
                          rows="10"
                          v-model="publicity.description"
                        ></textarea>
                      </div>
                    </div>
                  </v-col> -->
                </v-row>
                <v-row
                  v-if="publicity.format === 'Publicité sponsorisée'"
                  class="ma-0"
                >
                  <v-col cols="12" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Titre de la publicité :</p>
                      <input
                        v-model="publicity.title"
                        type="text"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Téléphone</p>
                      <input
                        v-model="publicity.phone_number"
                        type="number"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div class="form-input">
                      <p class="font-bold">Description :</p>
                      <textarea
                        class="input-global1 mt-2 pa-2"
                        cols="30"
                        rows="10"
                        v-model="publicity.description"
                      ></textarea>
                    </div>
                  </v-col>
                  <v-col cols="12" class="pa-1">
                    <div>
                      <p class="font-bold">Mot clé</p>
                      <div class="form-input my-2">
                        <v-text-field
                          solo
                          hide-details
                          height="40"
                          class="input-global2 my-2"
                          v-model="publicity.url"
                        >
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row
                  v-if="publicity.format === 'Sidebar droite'"
                  class="ma-0"
                >
                  <v-col cols="12" class="pa-1">
                    <div class="form-input my-2">
                      <p class="font-bold">Url de la publicité :</p>
                      <input
                        v-model="publicity.title"
                        type="text"
                        class="input-global1 my-2 pa-2"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" xl="6" lg="6" md="6" sm="12">
                <div class="pointer-event-none">
                  <p class="mb-3 font-bold text-underline">Votre publicité</p>
                  <FrontDefaultItemPublicity :publicity="publicity" />
                </div>
                <hr class="border-primary my-3" />
                <v-card class="pa-3">
                  <p class="mb-3 text-underline font-bold">
                    Planifier la date de lancement
                  </p>
                  <v-date-picker
                    v-model="publicity.date_launch"
                    landscape
                    no-title
                    full-width
                  ></v-date-picker>
                </v-card>
                <hr class="border-primary my-3" />
                <div class="row ma-0">
                  <v-col cols="6" class="pa-1">
                    <v-card class="pa-3">
                      <p class="mb-3 text-underline font-bold">Budget total</p>
                      <div
                        class="d-flex align-center justify-center border-secondary rounded-md w-100 h-25"
                      >
                        <p class="text-secondary text-center">
                          {{ publicity.budget_total.toLocaleString() }} Ar
                        </p>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <v-card class="pa-3">
                      <p class="mb-3 text-underline font-bold">
                        Nombre de jour
                      </p>
                      <div
                        class="d-flex align-center border-secondary rounded-md w-100 h-25"
                      >
                        <v-btn
                          color="secondary"
                          icon
                          @click="publicity.day_number--"
                        >
                          <v-icon class="text-secondary">
                            mdi-chevron-left
                          </v-icon>
                        </v-btn>
                        <input
                          v-model="publicity.day_number"
                          type="number"
                          class="bg-transparent text-secondary text-center w-100"
                          :min="1"
                        />
                        <v-btn
                          color="secondary"
                          icon
                          @click="publicity.day_number++"
                        >
                          <v-icon class="text-secondary">
                            mdi-chevron-right
                          </v-icon>
                        </v-btn>
                      </div>
                    </v-card>
                  </v-col>
                </div>
              </v-col>
              <v-col cols="12" class="py-0">
                <hr class="border-primary mt-n1" />
              </v-col>
              <v-col cols="12">
                <v-row class="ma-0">
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" class="pa-1">
                    <v-card class="pa-3">
                      <p class="mb-3 text-underline font-bold">
                        Budget quotidien
                      </p>
                      <div
                        class="d-flex align-center justify-center border-secondary rounded-md w-100 h-25"
                      >
                        <p class="text-center">
                          <span class="font16 text-secondary"
                            >{{ budget_quotidien.toLocaleString() }} Ar</span
                          >
                          par jour selon le nombre de jour.
                        </p>
                      </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" xl="6" lg="6" md="6" sm="6" class="pa-1">
                    <v-card class="pa-3">
                      <p class="mb-3 text-underline font-bold">
                        Récapitulatif du paiement
                      </p>
                      <p class="font-bold">
                        Votre publicité sera diffusée pendant
                        {{ publicity.day_number }} jours, lancée le
                        {{
                          $moment(publicity.date_launch).format("DD MMMM YYYY")
                        }}
                        et se terminera le
                        {{
                          $moment(publicity.date_end).format("DD MMMM YYYY")
                        }}.
                        <br />
                        <br />
                        Budget total :
                        <span class="text-secondary"
                          >{{
                            publicity.budget_total.toLocaleString()
                          }}
                          Ar</span
                        >
                      </p>
                    </v-card>
                  </v-col>
                </v-row>
                <v-checkbox v-model="is_accept" hide-details>
                  <template v-slot:label>
                    <p class="text-primary">
                      J'accepte les
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a
                            class="text-secondary"
                            target="_blank"
                            href="/condition-usage/"
                            @click.stop
                            v-on="on"
                          >
                            Conditions Générales d'Utilisation
                          </a>
                        </template>
                        S'ouvre dans une nouvelle fenêtre
                      </v-tooltip>
                    </p>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
            <div class="d-flex justify-end mt-2 mb-2 px-3">
              <v-btn
                color="primary"
                @click="annuler()"
                class="mx-2 no-shadow font12"
              >
                ANNULER
              </v-btn>
              <v-btn
                @click="creation()"
                class="no-shadow font12"
                color="secondary"
                :loading="loadingCreation"
              >
                CREER
              </v-btn>
              <FrontDefaultSnackbar
                @fermer="snackbar = false"
                :text="textsnackbar"
                :snackbar="snackbar"
              />
            </div>
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
    titleTemplate: "R23 - Gérer votre publicité",
  },
  data() {
    return {
      dialogsreussie: false,
      is_accept: false,
      date_launch_min: null,
      date_end_max: null,
      search: null,
      etatPub: null,
      menu1: false,
      menu2: false,
      e1: 1,
      categorie: [{ id: null, name: "Tous" }],
      budget_quotidien: 0,
      budget_quotidien_default: 0,
      loadingCreation: false,
      publicity: {
        phone_number: null,
        title: null,
        description: null,
        place: 5,
        energie: "Gasoil",
        disponibility: "Avec GPS",
        url: null,
        day_number: 1,
        image: null,
        date_launch: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        date_end: null,
        budget_total: null,
        status: null,
        option: "Climatisation disponible",
        option_vitesse: "Manuelle",
        politique_carburant: "Plein/Plein",
        nomber_porte: null,
        prix_journalier: null,
        format: "Sidebar gauche",
        ower_id: this.$auth.user.user.id,
      },
      confidentiality: ["Public", "Amis tous seulement", "Amis proche"],
      selectedconfidentiality: "Public",
      tab: 0,
      textsnackbar: "",
      snackbar: false,
      allpublicity: null,
      typesPublicity: [],
      typesPublicitySelectioned: null,
      promotion_apply: null,
      promAct: [],
      loadingfilter: false,
    };
  },
  methods: {
    deleted(event, index) {
      if (event) {
        this.getAllPublicity();
      }
    },
    creation() {
      if (!this.publicity.image) {
        this.snackbar = true;
        this.textsnackbar = "Vous devez ajouter un image de votre publicité";
        return;
      }
      if (this.publicity.format === "Sidebar gauche" && !this.publicity.url) {
        this.snackbar = true;
        this.textsnackbar =
          "Vous devez ajouter un url ou mot clé de votre publicité";
        return;
      }
      if (
        this.publicity.format === "Sidebar gauche" &&
        !this.publicity.description
      ) {
        this.snackbar = true;
        this.textsnackbar =
          "Vous devez ajouter quelque description de votre publicité";
        return;
      }
      if (!this.publicity.title) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter un titre de votre publicité";
        return;
      }
      if (!this.is_accept) {
        this.snackbar = true;
        this.textsnackbar =
          "Vous devez accepter Conditions générales d'utilisation";
        return;
      }
      if (!this.publicity.phone_number) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter votre numéro de téléphone";
        return;
      }
      if (
        this.publicity.phone_number &&
        this.publicity.phone_number.length !== 10
      ) {
        this.snackbar = true;
        this.textsnackbar =
          "Votre numéro de téléphone doit contenir 10 caractères";
        return;
      }
      if (
        this.publicity.format === "Voiture à louer" &&
        !this.publicity.place
      ) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter le nombre de place de votre voiture";
        return;
      }
      if (
        this.publicity.format === "Voiture à louer" &&
        this.publicity.disponibility === ""
      ) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter votre traçage";
        return;
      }
      if (
        this.publicity.format === "Voiture à louer" &&
        !this.publicity.prix_journalier
      ) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter votre prix à la journée";
        return;
      }
      if (
        this.publicity.format === "Voiture à louer" &&
        !this.publicity.nomber_porte
      ) {
        this.snackbar = true;
        this.textsnackbar = "Ajouter le nombre de porte de votre voiture";
        return;
      }
      this.loadingCreation = true;
      this.$axios
        .post("/api/publicity/store", this.publicity)
        .then((res) => {
          if (res.data.success) {
            this.loadingCreation = false;
            this.allpublicity = null;
            this.getAllPublicity();
            this.tab = 0;
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            console.log(beat);
            Swal.fire({
              title: "Bravo!",
              text: "Votre publicité a été crée avec succès!",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            });
            this.publicity = {
              phone_number: null,
              title: null,
              description: null,
              url: null,
              day_number: 1,
              image: null,
              date_launch: new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
              )
                .toISOString()
                .substr(0, 10),
              date_end: null,
              budget_total: null,
              status: null,
              format: "Sidebar gauche",
              ower_id: this.$auth.user.user.id,
            };
          }
        })
        .catch((error) => {
          this.loadingCreation = false;
          console.log(error);
        });
    },
    annuler() {
      this.tab = 0;
    },
    getAllPublicity() {
      this.loadingfilter = true;
      this.$axios
        .get("/api/publicity/all-publicity", {
          params: {
            date_launch_min: this.date_launch_min,
            date_end_max: this.date_end_max,
            status: this.etatPub,
            search: this.search,
          },
        })
        .then((res) => {
          this.loadingfilter = false;
          this.allpublicity = res.data.allPublicity.data;
        })
        .catch((error) => {
          this.loadingfilter = false;
          console.log(error);
        });
    },
    handelChangeEtatPub(event) {},
    handelPreviewFile(event, type) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.publicity.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    allTypePub() {
      this.$axios
        .get("/api/publicity/all-type-publicity")
        .then((res) => {
          this.typesPublicity = res.data.types;
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    creerpub() {
      this.tab = 1;
    },
  },
  watch: {
    "$route.params.action": {
      handler(action) {
        if (action == "add") {
          this.tab = 1;
        } else {
          this.tab = 0;
        }
      },
      deep: true,
      immediate: true,
    },
    "publicity.date_launch": {
      handler(value) {
        console.log(value);
        this.publicity.date_end = this.$moment(value)
          .add(this.publicity.day_number, "days")
          .format("YYYY-MM-DD");
        this.publicity.budget_total =
          this.budget_quotidien * this.publicity.day_number;
      },
      deep: true,
      immediate: true,
    },
    "publicity.day_number": {
      handler(value) {
        console.log(value);
        if (value > 0) {
          this.publicity.date_end = this.$moment(this.publicity.date_launch)
            .add(value, "days")
            .format("YYYY-MM-DD");

          if (
            this.typesPublicitySelectioned &&
            this.typesPublicitySelectioned.promotions &&
            this.typesPublicitySelectioned.promotions.length > 0
          ) {
            let tabi = [];
            this.promAct = this.typesPublicitySelectioned.promotions.filter(
              (p) => value >= p.number_day_min
            );
            if (this.promAct.length > 0) {
              tabi.push(this.promAct[0].percentage_delivery);
              this.promotion_apply = tabi.sort().at(-1);
            } else {
              this.promAct = [];
              this.promotion_apply = 0;
            }
            console.log("tabi", tabi);
          }
          this.publicity.budget_total =
            this.budget_quotidien * this.publicity.day_number;
        } else {
          this.publicity.day_number = 1;
        }
      },
      deep: true,
      immediate: true,
    },
    "publicity.format": {
      handler(value) {
        if (this.typesPublicity) {
          this.typesPublicity.forEach((element) => {
            if (element.typePublicity === value) {
              this.budget_quotidien = element.prix;
              this.budget_quotidien_default = element.prix;
              this.typesPublicitySelectioned = element;
            }
          });
        }
        console.log(value);
        if (value === "Sidebar droite") {
          console.log(value);
          this.publicity.phone_number = this.$auth.user.user.phone_number.slice(
            0,
            10
          );
        } else {
          this.publicity.phone_number = null;
        }
      },
      deep: true,
      immediate: true,
    },
    promotion_apply: {
      handler(value) {
        if (value) {
          this.budget_quotidien =
            this.budget_quotidien_default -
            (this.typesPublicitySelectioned.prix * value) / 100;
          this.publicity.budget_total =
            this.budget_quotidien * this.publicity.day_number;
        } else {
          this.budget_quotidien = this.budget_quotidien_default;
          this.publicity.budget_total =
            this.budget_quotidien * this.publicity.day_number;
        }
      },
      deep: true,
      immediate: true,
    },
    typesPublicity: {
      handler(value) {
        this.typesPublicity.forEach((element) => {
          if (element.typePublicity === this.publicity.format) {
            this.budget_quotidien = element.prix;
            this.budget_quotidien_default = element.prix;
            this.publicity.budget_total = element.prix;
            this.typesPublicitySelectioned = element;
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.allTypePub();
  },
  async fetch() {
    const allpublicity = await this.$axios.get("/api/publicity/all-publicity");
    this.allpublicity = allpublicity.data.allPublicity.data;
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
.image-inass {
  height: 316px;
}
.image-inass img {
  object-fit: cover;
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
.z-0 {
  z-index: 1;
}
.img-upload {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.h-25 {
  min-height: 35px;
}
.v-card.v-sheet {
  border-radius: 10px !important;
  box-shadow: 2px 3px 6px rgb(0 0 0 / 12%) !important;
  border: 1px #cfcfcf61 solid;
}
@media (max-width: 600px) {
  .block-filtre {
    top: 0 !important;
  }
}
@media (max-width: 500px) {
  .add-img-pub {
    position: relative;
    width: 130px;
    height: 130px;
  }
}
</style>

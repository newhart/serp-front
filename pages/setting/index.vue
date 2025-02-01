<template>
  <div class="py-3">
    <v-card class="card-default mt-5 pa-3">
      <v-row class="list-vehicul ma-0">
        <v-col cols="12" class="pa-1">
          <h3 class="text-secondary">Paramètres du compte</h3>
        </v-col>
        <hr class="border-primary w-plus" />
        <div class="regle-groups w-100">
          <v-expansion-panels accordion v-model="parametre" multiple>
            <v-col cols="12" xl="6" lg="6" md="12" class="pa-1">
              <v-expansion-panel class="regle">
                <v-expansion-panel-header
                  expand-icon=""
                  class="d-flex my-1 justify-between h40 round9 align-center bg-primary px-3 py-2"
                >
                  <p class="text-white">Général</p>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-if="user" class="sansPx">
                  <div
                    class="d-flex align-start wrap_in_res my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">Nom d'utilisateur</p>
                      </div>
                      <p v-if="!modifName" class="limite1-lign">
                        https://www.r23mada.com/{{ user.url }}
                      </p>
                    </div>
                    <img
                      @click="modifName = true"
                      v-if="!modifName"
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                    <v-text-field
                      v-if="modifName"
                      solo
                      class="input-global2"
                      :value="'https://www.r23mada.com/' + user.url"
                      type="text"
                    ></v-text-field>
                  </div>
                  <div
                    class="d-flex align-start wrap_in_res my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">E-mail principal</p>
                      </div>
                      <p v-if="!ModifEmail" class="limite1-lign">
                        {{ user.email }}
                      </p>
                    </div>
                    <img
                      @click="ModifEmail = true"
                      v-if="!ModifEmail"
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                    <v-text-field
                      v-if="ModifEmail"
                      solo
                      class="input-global2"
                      v-model="user.email"
                      :rules="emailrule"
                      type="email"
                    ></v-text-field>
                  </div>
                  <div
                    class="d-flex align-start wrap_in_res my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">Contact</p>
                      </div>
                      <p v-if="!modifContact" class="limite1-lign">
                        {{ user.phone_number }}
                      </p>
                    </div>
                    <img
                      @click="modifContact = true"
                      v-if="!modifContact"
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                    <v-text-field
                      v-if="modifContact"
                      solo
                      class="input-global2"
                      counter="10"
                      :rules="phonerule"
                      maxlength="10"
                      minlength="10"
                      type="number"
                      v-model="user.phone_number"
                    ></v-text-field>
                  </div>
                  <!-- <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p class="text-bold limite1-lign">
                      Désactivation de votre compte
                    </p>
                    <v-dialog
                      v-model="desactiveCompte"
                      persistent
                      max-width="415"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <img
                          v-bind="attrs"
                          v-on="on"
                          src="~/static/icons/default/edite.svg"
                          alt=""
                          class="modify cursor-pointor"
                        />
                      </template>
                      <v-card>
                        <v-card-title class="pa-0 justify-center">
                          <h4 class="font14 text-primary text-center">
                            <v-icon class="pr-1 text-secondary"
                              >mdi-delete-forever</v-icon
                            >
                            Désactivation de votre compte
                          </h4>
                        </v-card-title>
                        <hr class="my-2 widthplus" />
                        <div class="details-desactivation">
                          <p class="mb-2">
                            Souhaiteriez-vous désactiver pour un moment votre
                            compte ?
                          </p>
                        </div>
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
                            @click="desactiveCompte = false"
                            color="primary"
                            class="font12"
                            height="35"
                          >
                            Confirmer
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div> -->
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon numéro de téléphone dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                      v-model="visibility.phone_number"
                      @click="
                        changeConfidenliality({
                          phone_number: visibility.phone_number,
                        })
                      "
                    ></v-switch>
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon email dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                      v-model="visibility.email"
                      @click="
                        changeConfidenliality({
                          email: visibility.email,
                        })
                      "
                    ></v-switch>
                  </div>
                  <div
                    v-if="user.user_type_id !== 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher ma CIN dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                      v-model="visibility.cin"
                      @click="
                        changeConfidenliality({
                          cin: visibility.cin,
                        })
                      "
                    ></v-switch>
                  </div>
                  <div
                    v-if="user.user_type_id === 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon NIF dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      v-model="visibility.nif"
                      @click="
                        changeConfidenliality({
                          nif: visibility.nif,
                        })
                      "
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    v-if="user.user_type_id === 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon STAT dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      v-model="visibility.stat"
                      @click="
                        changeConfidenliality({
                          stat: visibility.stat,
                        })
                      "
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div class="my--0-inresp d-flex justify-end">
                    <v-btn
                      @click="updateinfo()"
                      :disabled="loadingModifInfoUser"
                      :loading="loadingModifInfoUser"
                      class="no-shadow font12"
                      color="primary"
                      height="35"
                    >
                      Enregistrer
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
                <v-expansion-panel-content v-else class="sansPx">
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">Nom d'utilisateur</p>
                      </div>
                      <p class="limite1-lign">https://www.r23mada.com/...</p>
                    </div>
                    <img
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">E-mail principal</p>
                      </div>
                      <p class="limite1-lign">...</p>
                    </div>
                    <img
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <div class="d-flex item-modif-cvd">
                      <div class="pr-3 minw250">
                        <p class="text-bold">Contact</p>
                      </div>
                      <p class="limite1-lign">...</p>
                    </div>
                    <img
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p class="text-bold limite1-lign">
                      Désactivation de votre compte
                    </p>
                    <img
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon numéro de téléphone dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon e-mail dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    v-if="$auth.user.user.user_type_id !== 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon cin dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    v-if="$auth.user.user.user_type_id === 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon NIF dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    v-if="$auth.user.user.user_type_id === 1"
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Afficher mon STAT dans mon profil</p>
                    <v-switch
                      hide-details
                      messages=""
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div class="my--0-inresp d-flex justify-end">
                    <v-btn
                      :disabled="true"
                      :loading="true"
                      class="no-shadow font12"
                      color="primary"
                      height="35"
                    >
                      Enregistrer
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-col>
            <v-col cols="12" xl="6" lg="6" md="12" class="pa-1">
              <v-expansion-panel class="regle">
                <v-expansion-panel-header
                  expand-icon=""
                  class="d-flex my-1 justify-between h40 round9 align-center bg-primary px-3 py-2"
                >
                  <p class="text-white">Sécurité et connexion</p>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="sansPx">
                  <div class="titresous-section">Connexion</div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Changer votre mot de passe</p>
                    <img
                      @click="ModifMdp = true"
                      v-if="!ModifMdp"
                      src="~/static/icons/default/edite.svg"
                      alt=""
                      class="modify cursor-pointor"
                    />
                  </div>
                  <div v-if="ModifMdp">
                    <div
                      class="d-flex align-center wrap_in_res my-4 my--0-inresp justify-between"
                    >
                      <div class="pr-3 minw250">
                        <p class="text-bold">Mot de passe actuel</p>
                      </div>
                      <v-text-field
                        solo
                        class="input-global2 w457"
                        hide-details
                        :append-icon="
                          showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :rules="[rules.required, rules.min]"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        @click:append="
                          showCurrentPassword = !showCurrentPassword
                        "
                        v-model="form_password.currentPassword"
                      ></v-text-field>
                    </div>
                    <div
                      class="d-flex align-center wrap_in_res my-4 my--0-inresp justify-between"
                    >
                      <div class="pr-3 minw250">
                        <p class="text-bold">Nouveau Mot de passe</p>
                      </div>
                      <v-text-field
                        solo
                        class="input-global2 w457"
                        hide-details
                        v-model="form_password.newPassword"
                        :append-icon="
                          showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :rules="[rules.required, rules.min]"
                        :type="showNewPassword ? 'text' : 'password'"
                        @click:append="showNewPassword = !showNewPassword"
                      ></v-text-field>
                    </div>
                    <div
                      class="d-flex align-center wrap_in_res my-4 my--0-inresp justify-between"
                    >
                      <div class="pr-3 minw250">
                        <p class="text-bold">Confirmation Mot de passe</p>
                      </div>
                      <v-text-field
                        solo
                        class="input-global2 w457"
                        hide-details
                        v-model="form_password.passwordConfirmation"
                        :append-icon="
                          showNewPasswordConfirmation
                            ? 'mdi-eye'
                            : 'mdi-eye-off'
                        "
                        :rules="[rules.required, rules.min]"
                        :type="
                          showNewPasswordConfirmation ? 'text' : 'password'
                        "
                        @click:append="
                          showNewPasswordConfirmation =
                            !showNewPasswordConfirmation
                        "
                      ></v-text-field>
                    </div>
                    <div class="my--0-inresp d-flex justify-end">
                      <v-btn
                        @click="updatepassword()"
                        :disabled="loading2"
                        :loading="loading2"
                        class="no-shadow font12"
                        color="primary"
                        height="35"
                      >
                        Enregistrer
                      </v-btn>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel class="regle">
                <v-expansion-panel-header
                  expand-icon=""
                  class="d-flex my-1 justify-between h40 round9 align-center bg-primary px-3 py-2"
                >
                  <p class="text-white">Notifications</p>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="sansPx">
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Invitations d'amis</p>
                    <v-switch
                      hide-details
                      messages=""
                      hidden
                      v-model="something"
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Actualités des amis</p>
                    <v-switch
                      hide-details
                      messages=""
                      hidden
                      v-model="something"
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div
                    class="d-flex align-center my-4 my--0-inresp justify-between"
                  >
                    <p>Réservation</p>
                    <v-switch
                      hide-details
                      messages=""
                      hidden
                      v-model="something"
                      class="mt-0 pt-0"
                    ></v-switch>
                  </div>
                  <div class="my--0-inresp d-flex justify-end">
                    <v-btn
                      @click="loading7 = true"
                      :disabled="loading7"
                      class="no-shadow font12"
                      color="primary"
                      height="35"
                    >
                      Enregistrer
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-col>
          </v-expansion-panels>
        </div>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  head: {
    titleTemplate: "R23 - Paramètrer votre compte",
  },
  props: ["asset"],
  data() {
    return {
      rules: {
        required: (value) => !!value || "Le mot de passe doit être valide",
        min: (v) =>
          (v && v.length >= 8) ||
          "Le mot de passe doit contenir au moins 8 caractères.",
        emailMatch: () =>
          `Votre adresse e-mail ou votre mot de passe ne correspond pas`,
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showNewPasswordConfirmation: false,
      form_password: {
        currentPassword: null,
        newPassword: null,
        passwordConfirmation: null,
      },
      phonerule: [
        (v) =>
          v.length !== 25 ||
          "Le numéro de téléphone doit contenir 10 caractères.",
      ],
      emailrule: [
        (v) => !!v || "Obligatoire",
        (v) => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
      ],
      parametre: [0, 1, 2, 3],
      confidentiality: [
        "Public",
        "Amis seulement",
        "Amis et leurs amis",
        "Moi seulement",
      ],
      modifName: false,
      ModifEmail: false,
      modifContact: false,
      ModifMdp: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loader: null,
      something: true,
      loadingModifInfoUser: false,
      desactiveCompte: false,
      actionDesactivication: "",
      visibility: {
        Mail: false,
        CIN: false,
        Nif: false,
        Stat: false,
        phone_number: false,
      },
      user: null,
    };
  },
  methods: {
    updateinfo() {
      if (
        this.user.phone_number.length &&
        this.user.phone_number.length !== 10
      ) {
        Swal.fire({
          title: "Oupss!",
          text: "Le numéro de téléphone doit contenir 10 caractères.",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      this.loadingModifInfoUser = true;
      this.$axios
        .post(`/api/update-info/${this.user.id}`, this.user)
        .then((res) => {
          if (res.data.user) {
            this.loadingModifInfoUser = false;
            this.modifName = false;
            this.ModifEmail = false;
            this.modifContact = false;
            let beat = new Audio('../sound/mixkit-success.wav');
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre information a été modifier avec succès",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    updatepassword() {
      if (
        this.form_password.newPassword !==
        this.form_password.passwordConfirmation
      ) {
        Swal.fire({
          title: "Oppss!",
          text: "Votre mot de passe de confirmation est invalide",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      if (
        this.form_password.currentPassword &&
        this.form_password.currentPassword.length < 8
      ) {
        Swal.fire({
          title: "Oppss!",
          text: "Votre nouveau mot de passe doit contenir au moin 8 caractères",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return;
      }
      this.loading2 = true;
      this.$axios
        .post(`/api/update-password`, this.form_password)
        .then((res) => {
          this.loading2 = false;
          if (res.data.success) {
            this.ModifMdp = false;
            this.form_password = {
              currentPassword: null,
              newPassword: null,
              passwordConfirmation: null,
            };
            let beat = new Audio('../sound/mixkit-success.wav');
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre mot de passe a été modifier avec succès",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          } else {
            Swal.fire({
              title: "Oppss!",
              text: res.data.error,
              type: "error",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          this.loading2 = false;
          console.log("error", error);
        });
    },
    changeConfidenliality(value) {
      this.$axios
        .post("api/update-confidentiality", {
          email: value.email,
          cin: value.cin,
          nif: value.nif,
          stat: value.stat,
          phone_number: value.phone_number,
          user_id: this.$auth.user.user.id,
        })
        .then((res) => {
          if (res.data.success) {
            let beat = new Audio('../sound/mixkit-success.wav');
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Le modification a été fait avec success",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    custDisplay(userData, typeDisplay) {
      if (typeDisplay === "email") {
        if (userData.profile.display && userData.profile.display.email === 0) {
          return false;
        } else if (
          userData.profile.display &&
          userData.profile.display.email === 1
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (typeDisplay === "cin") {
        if (userData.profile.display && userData.profile.display.cin === 0) {
          return false;
        } else if (
          userData.profile.display &&
          userData.profile.display.cin === 1
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (typeDisplay === "nif") {
        if (userData.profile.display && userData.profile.display.nif === 0) {
          return false;
        } else if (
          userData.profile.display &&
          userData.profile.display.nif === 1
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (typeDisplay === "stat") {
        if (userData.profile.display && userData.profile.display.stat === 0) {
          return false;
        } else if (
          userData.profile.display &&
          userData.profile.display.stat === 1
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (typeDisplay === "phone_number") {
        if (
          userData.profile.display &&
          userData.profile.display.phone_number === 0
        ) {
          return false;
        } else if (
          userData.profile.display &&
          userData.profile.display.phone_number === 1
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  async fetch() {
    var userData = null;
    await this.$axios
      .get(`api/other-profil/${this.$auth.user.user.id}`)
      .then((res) => {
        userData = res;
        this.user = userData.data.profile;
      })
      .catch((error) => {
        console.log("error", error);
      });
    this.visibility = {
      email: this.custDisplay(userData.data, "email"),
      cin: this.custDisplay(userData.data, "cin"),
      nif: this.custDisplay(userData.data, "nif"),
      stat: this.custDisplay(userData.data, "stat"),
      phone_number: this.custDisplay(userData.data, "phone_number"),
    };
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/username.scss";
hr.border-primary {
  border-bottom: 1px #03215324 solid;
  border-top: none;
}
.w-plus {
  width: calc(100% + 24px) !important;
  margin: 10px -12px;
}
.minw50 {
  min-width: 105px;
}
.w130 {
  max-width: 185px;
}
.item-modif-cvd {
  max-width: calc(100% - 20px);
}
.w457 {
  max-width: 430px;
}
.minw250 {
  min-width: 190px;
}
.titresous-section {
  background-color: #bee3fe;
  width: 100%;
  height: 37px;
  margin-top: 15px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  color: #032153;
  padding-left: 12px;
  display: flex;
  align-items: center;
}
.widthplus {
  width: calc(100% + 40px);
  margin-left: -20px;
}
@media (max-width: 428px) {
  .my-4.my--0-inresp {
    margin: 12px 0 !important;
  }
  .px-5.my--0-inresp {
    padding: 0 5px !important;
  }
}
.col.col-6:nth-child(1) .v-expansion-panel.regle,
.col.col-6:nth-child(2) .v-expansion-panel.regle {
  height: 415px !important;
}
.col.col-6:nth-child(3) .v-expansion-panel.regle,
.col.col-6:nth-child(4) .v-expansion-panel.regle {
  height: 250px !important;
}
@media (max-width: 1459px) and (min-width: 1264px), (max-width: 572px) {
  .wrap_in_res {
    flex-wrap: wrap;
  }
}
.v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 40px !important;
}
</style>

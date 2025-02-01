<template>
  <div class="log-regidtre">
    <v-snackbar v-model="error">
      {{ errorRegistration }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="var(--r23-secondary)"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-stepper v-model="stepRegistration">
      <v-stepper-content step="1">
        <v-form ref="form" v-model="valid" lazy-validation>
          <div class="mb-2">
            <div class="add-pdp mx-auto">
              <v-icon class="text-white"> mdi-camera </v-icon>
              <input type="file" @change="handelChangeProfile" />
              <img
                :src="register3.profile"
                class="w-100 h-100 position-absolute"
                v-if="register3.profile != ''"
                alt=""
              />
            </div>
            <p class="text-white text-center mt-1">
              {{
                register1.typeUser.id === 1
                  ? "Ajouter votre logo"
                  : "Ajouter votre photo de profil"
              }}
            </p>
          </div>
          <v-select
            :items="typeUser"
            v-model="register1.typeUser"
            :return-object="true"
            item-text="name"
            :rules="rules.typeUser"
            placeholder="Vous êtes"
            prepend-inner-icon="mdi-format-list-bulleted-type"
            solo
            class="input-globale mx-0"
          ></v-select>
          <div>
            <v-text-field
              v-model="register1.name_cooperative"
              :rules="rules.name_cooperative"
              placeholder="Nom de la coopérative"
              prepend-inner-icon="mdi-google-classroom"
              required
              outlined
              solo
              clearable
              class="input-globale mr-1"
              height="35px"
              min-height="35px"
              v-if="register1.typeUser.id === 1"
            ></v-text-field>
            <v-select
              :items="genre"
              v-model="register2.genre"
              placeholder="Votre genre"
              :rules="[rules.required]"
              prepend-inner-icon="mdi-gender-transgender"
              solo
              class="input-globale mx-0"
            ></v-select>
            <v-text-field
              v-model="register1.name"
              :rules="rules.name"
              :placeholder="
                register1.typeUser.id === 1 ? 'Nom du gérant' : 'Nom'
              "
              prepend-inner-icon="mdi-star-circle-outline"
              required
              outlined
              solo
              clearable
              class="input-globale mr-1"
              height="35px"
              min-height="35px"
            ></v-text-field>
            <v-text-field
              v-model="register1.lastname"
              :rules="rules.lastname"
              placeholder="Prénom"
              prepend-inner-icon="mdi-google-circles-group"
              required
              outlined
              solo
              clearable
              class="input-globale ml-1"
              height="35px"
              min-height="35px"
            ></v-text-field>
          </div>

          <v-btn
            :disabled="!valid"
            class="sendBoutt m-0 m-0"
            @click="validate()"
            block
          >
            S'inscrire
          </v-btn>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form ref="form3" lazy-validation>
          <!-- <v-text-field
            placeholder="Carte d'identité National (CIN)"
            prepend-inner-icon="mdi-mail"
            required
            outlined
            v-model="register2.num_cin"
            :rules="[rules.required, rules.mincin]"
            clearable
            solo
            class="input-globale"
            height="35px"
            min-height="35px"
            type="text"
            v-if="register1.typeUser.id != 1"
          >
          </v-text-field> -->
          <v-text-field
            v-model="register1.adress"
            :rules="rules.adress"
            placeholder="Adresse"
            prepend-inner-icon="mdi-map-marker"
            required
            outlined
            clearable
            solo
            class="input-globale"
            height="35px"
            min-height="35px"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="register1.phone_number"
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
          <v-text-field
            v-model="register1.email"
            :rules="rules.email"
            placeholder="Email"
            prepend-inner-icon="mdi-email"
            required
            outlined
            clearable
            solo
            class="input-globale"
            height="35px"
            min-height="35px"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="register3.password"
            placeholder="Mot de passe"
            prepend-inner-icon="mdi-lock"
            required
            outlined
            clearable
            solo
            class="input-globale"
            height="35px"
            min-height="35px"
            :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showpassword ? 'text' : 'password'"
            @click:append="showpassword = !showpassword"
          ></v-text-field>
          <v-text-field
            v-model="register3.password_confirmation"
            placeholder="Confirmation de mot de passe"
            prepend-inner-icon="mdi-lock"
            required
            outlined
            clearable
            solo
            class="input-globale"
            height="35px"
            min-height="35px"
            :append-icon="showpasswordconfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="showpasswordconfirmation ? 'text' : 'password'"
            @click:append="showpasswordconfirmation = !showpasswordconfirmation"
          ></v-text-field>
          <v-checkbox
            :rules="[rules.required]"
            v-model="accepteConditions"
            class="ma-0 mb-2 register"
            hide-details
          >
            <template v-slot:label>
              <p class="text-white font12">
                J'accepte les
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      class="text-white font-bold"
                      target="_blank"
                      href="/condition-usage/"
                      @click.stop
                      v-on="on"
                    >
                      Conditions d'Utilisation
                    </a>
                  </template>
                  S'ouvre dans une nouvelle fenêtre
                </v-tooltip>
              </p>
            </template>
          </v-checkbox>
          <v-btn
            :disabled="!valid"
            :loading="loading2"
            class="sendBoutt m-0"
            @click="validate2()"
            block
          >
            FINALISER VOTRE INSCRIPTION
          </v-btn>
        </v-form>
      </v-stepper-content>
      <!-- <v-stepper-content step="3">
        <v-form ref="form4" v-model="valid" lazy-validation>
          <p class="text-white mb-2 text-center">
            Merci de saisir le code envoyé au
            {{ register1.email }}
          </p>
          <div class="d-flex align-items-center mb-3">
            <v-otp-input
              length="5"
              v-model="optInput"
              class="input-globale opts"
            ></v-otp-input>
            <v-icon size="35" class="text-white">
              {{ isActive ? "mdi-check-bold" : "mdi-close" }}
            </v-icon>
          </div>
          <v-btn
            :disabled="!isActive"
            class="sendBoutt m-0 m-0"
            @click="validatephone"
            block
            :loading="loading3"
          >
            ENREGISTRER
          </v-btn>
        </v-form>
      </v-stepper-content> -->
      <v-stepper-content step="3">
        <Recaptcha @validate="validateCaptcha" />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>
<script>
// import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["stepRegister", "password", "email"],
  data: () => ({
    stepRegistration: 1,
    genre: ["Homme", "Femme"],
    optInput: "",
    typeUser: [],
    overlay: false,
    valid: true,
    valid1: true,
    ConfirmPassword: "",
    errorRegistration: "",
    error: false,
    showpassword: false,
    accepteConditions: false,
    showpasswordconfirmation: false,
    loading2: false,
    loading3: false,
    rules: {
      typeUser: [(v) => !!v || "Obligatoire"],
      name_cooperative: [(v) => !!v || "Obligatoire"],
      name: [(v) => !!v || "Obligatoire"],
      lastname: [(v) => !!v || "Obligatoire"],
      phone_number: [(v) => !!v || "Obligatoire"],
      adress: [(v) => !!v || "Obligatoire"],
      email: [
        (v) => !!v || "Obligatoire",
        (v) => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
      ],
      nif_recto: [(v) => !!v || "Obligatoire"],
      nif_verso: [(v) => !!v || "Obligatoire"],
      stat_recto: [(v) => !!v || "Obligatoire"],
      stat_verso: [(v) => !!v || "Obligatoire"],
      cin_recto: [(v) => !!v || "Obligatoire"],
      cin_verso: [(v) => !!v || "Obligatoire"],
      password: [(v) => !!v || "Obligatoire"],
      passwordConfirm: [(v) => !!v || "Obligatoire"],
      num_nif: [(v) => !!v || "Obligatoire"],
      num_stat: [(v) => !!v || "Obligatoire"],
      num_cin: [(v) => !!v || "Obligatoire"],
      required: (value) => !!value || "Obligatoire",
      min: (v) =>
        (v && v.length >= 8) ||
        "Le mot de passe doit contenir au moins 8 caractères.",
      minphone: (v) =>
        (v && v.length == 10) ||
        "Le numéro de téléphone doit contenir 10 caractères.",
      mincin: (v) =>
        (v && v.length == 12) || "Le numéro CIN doit contenir 12 caractères.",
      emailMatch: () =>
        `Votre adresse e-mail ou votre mot de passe ne correspond pas`,
    },
    SelectedtypeUser: null,
    register1: {
      typeUser: "",
      name_cooperative: "",
      name: "",
      lastname: "",
      phone_number: "",
      adress: "",
      email: "",
    },
    register2: {
      genre: "",
    },
    register3: {
      password: "",
      password_confirmation: "",
      profile: "",
    },
  }),
  computed: {
    isActive() {
      return this.optInput.length === 5;
    },
  },

  mounted() {
    this.$axios
      .get("/api/get-user-type")
      .then((res) => {
        this.typeUser = res.data.types;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        if (this.stepRegistration < 2) {
          this.overlay = false;
          this.stepRegistration++;
        }
      } else {
        this.$refs.form.validate();
      }
    },
    async validatephone() {
      this.loading3 = true;

      const { email } = this.register1;
      const { password } = this.register3;

      await this.$axios.get("/sanctum/csrf-cookie");
      this.$auth
        .loginWith("local", {
          data: {
            password: password,
            confirmation_code: this.optInput,
            email: email,
          },
        })
        .then((res) => {
          if (res.data.message === "Code Invalide") {
            this.loading3 = false;
            Swal.fire({
              title: "Oups!",
              text: "Le mot de passe de confirmation est invalide",
              type: "error",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          } else {
            if (this.register1.typeUser.id === 1) {
              this.$store.commit("chat/changenewCooperative", true);
              localStorage.setItem("newCooperative", true);
            }
            const user = res.data.user;
            this.$router.push({
              name: "actualites",
            });
            this.stepRegistration++;
            this.$emit("stepRegistration", this.stepRegistration);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading3 = false;
          Swal.fire({
            title: "Oups!",
            text: "Votre code de sécurité n'a pas été pris en compte",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          }).then((result) => {});
        });
    },
    slugify(str) {
      return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    validate1() {
      if (this.$refs.form1.validate()) {
        this.stepRegistration++;
        this.$emit("stepRegistration", this.stepRegistration);
      } else {
        this.$refs.form1.validate();
      }
    },
    async loginUser() {
      await this.$axios.get("/sanctum/csrf-cookie");
      const res = await this.$auth.loginWith("local", {
        data: {
          password: this.register3.password,
          email: this.register1.email,
        },
      });
      const user = res.data.user;
      if (res.data.token) {
        this.loading2 = false;
        if (this.register1.typeUser.id === 1) {
          this.$store.commit("chat/changenewCooperative", true);
          localStorage.setItem("newCooperative", true);
        }
        this.$router.push({
          name: "actuality",
        });
      }
    },
    async validate2() {
      if (this.$refs.form3.validate()) {
        this.loading2 = true;
        const res = await this.$axios.post("api/register-validation", {
          email: this.register1.email,
          phone_number: this.register1.phone_number,
          cin: "000000000000",
        });
        if (res.data.success) {
          this.loading2 = false;
          if (this.register3.password != this.register3.password_confirmation) {
            this.loading2 = false;
            Swal.fire({
              title: "Oups!",
              text: "Le mot de passe de confirmation est invalide",
              type: "error",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          } else {
            const form = { ...this.register1, ...this.register2 };
            this.stepRegistration++;
          }
        } else {
          Swal.fire({
            title: "Oups!",
            text: res.data.message,
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          }).then((result) => {});
          this.loading2 = false;
        }
      } else {
        this.loading2 = false;
        this.$refs.form3.validate();
      }
    },
    validateCaptcha(e) {
      if (e) {
        this.finalisationRegistration();
      }
    },
    finalisationRegistration() {
      const form = { ...this.register1, ...this.register2 };
      this.$axios
        .post("/api/register-step-one", { ...form, ...this.register3 })
        .then((res) => {
          this.loginUser();
          return false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    forgot() {
      this.$router.push({
        query: {
          typeAction: "forgot_password",
        },
      });
    },

    handelPreviewFile(event, type) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.register2[type] = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    handelChangeProfile(event) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.register3.profile = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  watch: {
    "register1.typeUser": {
      handler(e) {
        if (e && e.id === 1) {
          this.register1.name_cooperative = null;
        }
        this.SelectedtypeUser = e;
      },
      immediate: true,
    },
    stepRegistration: {
      handler(value) {
        this.$emit("changeStep", value);
      },
      immediate: true,
    },
    stepRegister: {
      handler(value) {
        this.stepRegistration = value;
      },
      immediate: true,
    },
    password: {
      handler(value) {
        this.register3.password = value;
        this.register3.password_confirmation = value;
      },
      immediate: true,
    },
    email: {
      handler(value) {
        this.register1.email = value;
      },
      immediate: true,
    },
    optInput: {
      handler(value) {
        if (value.length == 5) {
          this.validatephone();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
@import "~/assets/landing.scss";
.log-regidtre {
  max-height: 100%;
  overflow-y: auto;
}
</style>

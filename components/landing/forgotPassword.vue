<template>
  <div>
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
    <p v-if="stepForgot === 1" class="text-white my-3 text-center">
      Saisissez votre adresse e-mail.
    </p>
    <p v-if="stepForgot === 2" class="text-white my-3 text-center">
      Veuillez entrer votre code de validation.
    </p>
    <p v-if="stepForgot === 3" class="text-white my-3 text-center">
      Veuillez entrer votre nouveau mot de passe.
    </p>
    <div class="log-regidtre mx-auto">
      <v-stepper v-model="stepForgot">
        <v-stepper-content step="1">
          <v-form
            @submit.prevent="validate"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="num"
              :rules="[rules.required]"
              label="Adresse email"
              required
              outlined
              solo
              prepend-inner-icon="mdi-phone"
              class="input-globale"
              height="35px"
              min-height="35px"
              type="email"
              :append-icon="valid ? 'mdi-check' : 'mdi-close'"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              class="sendBoutt m-0"
              type="submit"
              :loading="loading1"
              block
            >
              RECUPERER
            </v-btn>
          </v-form>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="form1" v-model="valid" lazy-validation>
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
              :disabled="!valid"
              class="sendBoutt m-0"
              @click="validate1"
              block
              :loading="loading2"
            >
              RECUPERER
            </v-btn>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-form ref="form2" v-model="valid" lazy-validation>
            <v-text-field
              v-model="mdp"
              label="Nouveau mot de passe"
              required
              outlined
              :append-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showpassword ? 'text' : 'password'"
              @click:append="showpassword = !showpassword"
              solo
              class="input-globale"
              height="35px"
              min-height="35px"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <v-text-field
              v-model="mdpConfirm"
              label="Confirmer le mot de passe"
              required
              outlined
              :append-icon="
                showpasswordconfirmation ? 'mdi-eye' : 'mdi-eye-off'
              "
              :rules="[rules.required, rules.min]"
              :type="showpasswordconfirmation ? 'text' : 'password'"
              @click:append="
                showpasswordconfirmation = !showpasswordconfirmation
              "
              solo
              class="input-globale"
              height="35px"
              min-height="35px"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
            <v-btn
              :disabled="!valid"
              class="sendBoutt m-0"
              @click="validate2"
              block
              :loading="loading3"
            >
              Enregistrer
            </v-btn>
          </v-form>
        </v-stepper-content>
      </v-stepper>
      <v-overlay absolute class="overlay-block" :value="overlay">
        <v-progress-circular indeterminate size="32"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  props: ["asset"],
  data: () => ({
    stepForgot: 1,
    optInput: "",
    overlay: false,
    valid: true,
    mdp: "",
    validmdp: null,
    mdpConfirm: "",
    error: false,
    loading1: false,
    loading2: false,
    loading3: false,
    errorRegistration: "",
    validmdpConfirm: null,
    showpasswordconfirmation: false,
    showpassword: false,
    num: "",
    numRules: [(v) => !!v || "Numéro de téléphone est obligatoire"],
    passworldRules: [(v) => !!v || "Mot de passe est obligatoire"],
    passworldConfirmRules: [
      (v) => !!v || "Mot de passe de confirmation est obligatoire",
    ],
    rules: {
      required: (value) => !!value || "Obligatoire",
      min: (v) =>
        v.length >= 8 || "Le mot de passe doit contenir au moins 8 caractères.",
      minphone: (v) =>
        v.length >= 9 ||
        "Le numéro téléphone doit contenir au moins 9 caractères.",
      emailMatch: () =>
        `Votre adresse e-mail ou votre mot de passe ne correspond pas`,
    },
    user: null,
  }),
  computed: {
    isActive() {
      return this.optInput.length === 5;
    },
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loading1 = true;
        this.$axios
          .post("/api/password-forgot", {
            phone_number: this.num,
          })
          .then((res) => {
            this.loading1 = false;
            if (res.data.error) {
              this.error = true;
              this.errorRegistration =
                "Le numéro de téléphone que vous avez saisis ne correspondent pas";
            } else {
              this.stepForgot = 2;
            }
          })
          .catch((error) => {
            console.log(error);
            this.loading1 = false;
            this.error = true;
            this.errorRegistration = "Il y a un erreur";
          });
      } else {
        this.$refs.form.validate();
      }
    },
    validate1() {
      if (this.$refs.form1.validate()) {
        this.loading2 = true;
        this.$axios
          .post("/api/code-verification", {
            code_validation: this.optInput,
          })
          .then((res) => {
            this.loading2 = false;
            if (res.data.success) {
              this.user = res.data.success;
              this.stepForgot = 3;
            } else if (res.data.error) {
              this.error = true;
              this.errorRegistration =
                "Le mot de passe de confirmation est invalide";
            }
          })
          .catch((error) => {
            this.loading2 = false;
            console.log(error);
            this.error = true;
            this.errorRegistration =
              "Le mot de passe de confirmation est invalide";
          });
      } else {
        this.$refs.form1.validate();
      }
    },
    slugify(str) {
      return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    async login(user) {
      const res = await this.$auth.loginWith("local", {
        data: {
          password: this.mdp,
          email: user.email,
        },
      });
    },
    async validate2() {
      if (this.$refs.form2.validate()) {
        this.loading3 = true;
        if (this.mdp != this.mdpConfirm) {
          this.loading3 = false;
          this.error = true;
          this.errorRegistration =
            "Le mot de passe de confirmation est invalide";
        } else {
          await this.$axios.get("/sanctum/csrf-cookie");
          this.$auth
            .loginWith("local", {
              data: {
                id: this.user.id,
                password: this.mdp,
              },
            })
            .then((res) => {
              this.loading3 = false;
              if (res.data.token) {
                // this.login(res.data.user);
                this.$router.push({
                  name: "actualites",
                });
                this.errorRegistration =
                  "Mot de passe a été récupérer avec succès";
              } else {
                this.error = true;
                this.errorRegistration = "Il y a un erreur";
              }
            })
            .catch((error) => {
              this.loading3 = false;
              console.log(error);
              this.error = true;
              this.errorRegistration = "Il y a un erreur";
            });
        }
      } else {
        this.$refs.form2.validate();
      }
    },
    forgot() {
      this.$emit("forgot", "forgot");
    },
  },
  watch: {
    mdp: {
      handler(type) {
        if (type.length > 0 && type.length < 8) {
          this.validmdp = false;
        } else if (type.length > 0 && type.length > 8) {
          this.validmdp = true;
        }
      },
      immediate: true,
    },
    mdpConfirm: {
      handler(type) {
        if (type.length > 0 && type.length < 8) {
          this.validmdpConfirm = false;
        } else if (type.length > 0 && type.length > 8) {
          this.validmdpConfirm = true;
        }
      },
      immediate: true,
    },
    optInput: {
      handler(value) {
        if (value.length == 5) {
          this.validate1();
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
@import "~/assets/landing.scss";
</style>

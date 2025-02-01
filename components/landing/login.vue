<template>
  <div class="log-regidtre">
    <!-- form for the login user -->
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="validate"
    >
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Adresse email ou Téléphone"
        required
        outlined
        solo
        prepend-inner-icon="mdi-email"
        class="input-globale"
        height="35px"
        min-height="35px"
      ></v-text-field>

      <v-text-field
        v-model="mdp"
        label="Mot de passe"
        required
        outlined
        prepend-inner-icon="mdi-lock"
        solo
        class="input-globale"
        height="35px"
        min-height="35px"
        :append-icon="showpasswordlogin ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showpasswordlogin ? 'text' : 'password'"
        @click:append="showpasswordlogin = !showpasswordlogin"
      ></v-text-field>

      <v-btn
        :disabled="!valid && overlay"
        class="sendBoutt m-0"
        type="submit"
        :loading="overlay"
        block
      >
        CONNEXION A MON COMPTE
      </v-btn>
    </v-form>

    <!-- end form  -->

    <div style="margin-top: 10px" class="d-flex justify-between mt-2">
      <p
        @click="actionLogin('register')"
        class="text-white cursor-pointor font12"
      >
        Créer un nouveau compte
      </p>
      <p
        @click="actionLogin('forgotPassword')"
        class="text-white cursor-pointor font12"
      >
        Mot de passe oublié?
      </p>
    </div>
    <v-snackbar v-model="snackbar">
      {{ textSnackbar }}

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
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default {
  data: () => ({
    showpasswordlogin: false,
    overlay: false,
    valid: true,
    mdp: "",
    email: "",
    textSnackbar: "",
    snackbar: false,
    dialogsreussie: false,
    emailRules: [(v) => !!v || "L'adress email est obligatoire"],
    rules: {
      required: (value) => !!value || "Le mot de passe doit être valide",
      min: (v) =>
        v.length >= 8 || "Le mot de passe doit contenir au moins 8 caractères.",
      emailMatch: () =>
        `Votre adresse e-mail ou votre mot de passe ne correspond pas`,
    },
  }),

  methods: {
    // login  the user here
    async validate() {
      if (this.$refs.form.validate()) {
        this.overlay = true;
        await this.$axios.get("/sanctum/csrf-cookie");
        const res = await this.$auth.loginWith("local", {
          data: {
            password: this.mdp,
            email: this.email,
          },
        });
        const user = res.data.user;
        if (res.data.token) {
          // redirect user if autheticated 
          this.$router.push({
            name: "actualites",
          });
        }
        else {
          // invalid idenitifiant 
          let beat = new Audio("sound/mixkit-wrong.wav");
          beat.volume = 0.1;
          beat.play();
          Swal.fire({
            title: "Oups!",
            text: this.rules.emailMatch(),
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          })
          this.overlay = false;
        }
      } else {
        //  invalid for the validation form
        this.$refs.form.validate();
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
    actionLogin(e) {
      this.$emit("actionlogin", e);
    },
  },
};
</script>
<style scoped>
@import "~/assets/landing.scss";
</style>

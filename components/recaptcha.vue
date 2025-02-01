<template>
  <v-form ref="capthatform">
    <p class="text-white text-center">Veuillez ressaisir le texte ci-dessous</p>
    <div class="mb-3">
      <input type="text" v-model="code" readonly id="generated-captcha" />
    </div>
    <div>
      <v-text-field
        v-model="value"
        placeholder="Code"
        prepend-inner-icon="mdi-shield-sword-outline"
        required
        outlined
        solo
        clearable
        hide-details
        class="input-globale"
        height="35px"
        min-height="35px"
        :readonly="loading"
      ></v-text-field>
      <p class="text-white font12">
        {{ status }}
      </p>
    </div>
    <v-btn
      :loading="loading"
      class="sendBoutt mx-0 my-2"
      @click="check()"
      block
    >
      Valider votre code
    </v-btn>
    <v-btn
      :disabled="loading"
      color="primary"
      class="mx-0 my-2"
      @click="generate()"
      block
    >
      Generer un nouveau
    </v-btn>
  </v-form>
</template>
<script>
export default {
  props: {},
  watch: {
    value: {
      handler(value) {
        if (value && value === this.code) {
          this.status = "";
          this.check();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      captcha: null,
      alphabets: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",
      code: null,
      value: null,
      validateCode: (v) =>
        (v && this.code != this.value) || "Le code de sécurité invalide",
      status: "",
      loading: false,
    };
  },
  methods: {
    generate() {
      // console.log(status)
      let first =
        this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
      let second = Math.floor(Math.random() * 10);
      let third = Math.floor(Math.random() * 10);
      let fourth =
        this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
      let fifth =
        this.alphabets[Math.floor(Math.random() * this.alphabets.length)];
      let sixth = Math.floor(Math.random() * 10);
      let captcha =
        first.toString() +
        second.toString() +
        third.toString() +
        fourth.toString() +
        fifth.toString() +
        sixth.toString();
      this.code = captcha;
      this.value = null;
      this.status = "";
    },
    check() {
      this.loading = true;
      if (this.code === this.value) {
        this.$emit("validate", true);
      } else {
        this.status = "Le code de sécurité invalide";
        this.loading = false;
      }
    },
  },
  mounted() {
    this.generate();
  },
};
</script>
<style scoped>
input {
  text-decoration: none;
}
#generated-captcha {
  text-decoration: line-through;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  background-color: #ede7f6;
  border-radius: 6px;
  border: none;
  padding: 6px;
  outline: none;
  margin: 10px 0;
  width: 100%;
  color: #1d1d1d;
}
.sendBoutt {
  width: 100%;
  height: 45px !important;
  border-radius: 8px;
  background: linear-gradient(#e5004691 0%, #e50046 100%);
  font-size: 12px !important;
  text-transform: uppercase;
  color: #fff !important;
}
button {
  text-transform: uppercase;
  font-size: 12px !important;
}
.sendBoutt1 {
  width: 100%;
  height: 35px;
  border-radius: 25px;
  background: linear-gradient(#c8c8c8 0%, #929191 100%);
  font-size: 12px !important;
  text-transform: initial;
  color: #fff !important;
}
</style>

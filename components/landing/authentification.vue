<template>
  <div v-if="statusAction != ''" class="ajuter-width position-relative">
    <div
      v-if="statusAction != 'login'"
      @click="goToPrevtStep()"
      class="call-back cursor-pointor"
    >
      <v-icon size="30" class="text-white"> mdi-chevron-left </v-icon>
    </div>
    <div
      v-if="statusAction === 'login'"
      @click="statusAction = ''"
      class="call-back close cursor-pointor"
    >
      <v-icon size="30" class="text-white"> mdi-close </v-icon>
    </div>
    <h1 class="text-white text-center">
      {{
        statusAction === "login"
          ? "Se connecter sur R23"
          : statusAction === "register"
          ? "Rejoignez-nous"
          : statusAction === "forgotPassword"
          ? "Mot de passe oublié?"
          : "Bienvenue dans le plateforme R23"
      }}
    </h1>
    <LandingRegister
      v-if="statusAction === 'register'"
      :stepRegister="stepRegister"
      :password="password"
      :email="email"
      @stepRegistration="stepRegistration"
      @changeStep="getStepChange"
    />
    <LandingLogin
      v-if="statusAction === 'login'"
      @actionlogin="actionlogin"
      @validate="validation"
    />
    <LandingForgotPassword v-if="statusAction === 'forgotPassword'" />
  </div>
</template>

<script>
export default {
  props: ["statusauth"],
  data() {
    return {
      statusAction: "",
      stepRegister: 1,
      password: null,
      email: null,
    };
  },
  methods: {
    changeStatus(e) {
      this.statusAction = e;
    },
    getStepChange(value) {
      this.stepRegister = value;
    },
    stepRegistration(e) {
      this.stepRegister = e;
      this.$emit("stepRegistration", e);
    },
    actionlogin(e) {
      this.statusAction = e;
      this.$store.commit("default/changestatusLanding", e);
    },
    validation(password, email) {
      this.password = password;
      this.email = email;
      this.statusAction = "register";
      this.stepRegister = 3;
    },
    goToPrevtStep() {
      if (this.stepRegister === 1) {
        this.statusAction = "login";
        this.$forceUpdate();
      } else {
        this.stepRegister--;
      }
    },
  },
  watch: {
    statusauth: {
      handler(value) {
        this.statusAction = value;
        this.$store.commit("default/changestatusLanding", value);
      },
      deep: true,
      immediate: true,
    },
    statusAction: {
      handler(value) {
        this.$emit("changeStatusAction", value);
      },
      immediate: true,
    },
    "$store.state.default.statusLanding": {
      handler(value) {
        if (value === "register") {
          this.statusAction = "register";
        }
        if (value === "login") {
          this.statusAction = "login";
        }
        if (value === "forgot") {
          this.statusAction = "forgot";
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.user-img .pdp-user {
  width: 50px;
  height: 50px;
}
.user-img .pdp-user .actif {
  width: 10px;
  height: 10px;
  right: 0;
  bottom: 4px;
}
.user-img {
  position: absolute;
  top: 37px;
  right: 67px;
}
</style>

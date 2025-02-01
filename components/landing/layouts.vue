<template>
  <div class="auto-scroll">
    <v-carousel
      height="100vh"
      cycle
      continuous
      hide-delimiters
      :show-arrows="false"
      class="carousel-landing bg-primary"
    >
      <v-carousel-item src="/img/cadre_centrale1.webp"></v-carousel-item>
    </v-carousel>
    <v-container class="itemtop">
      <div class="top-float-landing">
        <div
          style="z-index: 21 !important; width: fit-content"
          class="d-flex align-center"
        >
          <img
            src="~/static/icons/default/logo-secondary.svg"
            class="logo logo-default-responsive mr-2"
            alt=""
          />
          <p class="text-primary text-slogant font12 font-bold ml-2 mb-0">
            Concentrez-vous<br />sur ce qui vous différencie le plus
          </p>
        </div>
        <div class="d-flex align-center justify-between">
          <div class="bienvenue-landing-page">
            <h1 class="text-white font50">
              Bienvenue dans votre <br />communauté professionnelle
            </h1>
            <div class="d-flex align-center">
              <v-btn
                @click="statusauth = 'register'"
                :class="statusauth === 'register' ? 'active' : ''"
                outlined
                rounded
                shaped
                class="w-btn-landing-page"
              >
                Créer un compte
              </v-btn>
              <v-btn
                @click="statusauth = 'login'"
                :class="statusauth === 'login' ? 'active' : ''"
                outlined
                rounded
                shaped
                class="w-btn-landing-page"
              >
                Se connecter
              </v-btn>
            </div>
            <p class="text-secondary font-script font25">
              Première plateforme de réseaux sociaux dans le domaine de
              transport
            </p>
          </div>
          <transition name="fade">
            <LandingAuthentification
              :statusauth="statusauth"
              @changeStatusAction="chageStatus"
            />
          </transition>
        </div>
        <div
          class="d-flex justify-center down-clic"
          style="z-index: 20 !important"
        >
          <a v-scroll-to="'#voitureDisponible'">
            <img
              class="cursor-pointor MoveUpDown"
              src="~/static/icons/default/down.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </v-container>
    <slot></slot>
    <v-footer primary class="bg-primary" padless>
      <v-container>
        <v-row class="ma-0">
          <v-col cols="12" sm="4">
            <img
              src="~/static/icons/default/logo-secondary.svg"
              class="logo mr-2"
              alt=""
            />
            <p class="mt-3 text-white">
              Nous avons créé cette plateforme afin de vous aider à trouver
              votre meilleure place avec le bon rapport qualité/prix, à gagner
              du temps et à bénéficier d'un service de qualité avec garantie.
            </p>
          </v-col>
          <v-col cols="6" sm="4">
            <div class="mx-auto w-fit-content">
              <p class="text-secondary font16 w-fit-content">
                A propos de nous
              </p>
              <p class="cursor-pointor text-white w-fit-content mt-3">
                <span v-scroll-to="'#top'" class="text-white">Accueil</span>
              </p>
              <p class="cursor-pointor text-white w-fit-content">
                <span v-scroll-to="'#list-colis'" class="text-white"
                  >A propos</span
                >
              </p>

              <p class="cursor-pointor text-white w-fit-content">
                <NuxtLink to="/condition-usage/" class="text-white"
                  >Conditions Générales d'Utilisation</NuxtLink
                >
              </p>
            </div>
          </v-col>
          <v-col cols="6" sm="4">
            <p class="text-secondary font16 text-right">Contactez-nous</p>
            <p class="text-white mt-3 text-right">contact@r23mada.com</p>
            <p class="text-white text-right">+261 38 23 025 23</p>
            <p class="text-white text-right">Antananarivo, Madagascar</p>
          </v-col>
        </v-row>
      </v-container>
      <v-row class="ma-0 w-100">
        <v-col cols="12 bg-copi-rights">
          <v-container class="py-0">
            <p class="text-white">
              r23mada.com © 2023. All Rights Reserved. Concept & Develop by Krea
              Agency
            </p>
          </v-container>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  scrollToBottom: true,
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    statusauth: "",
  }),
  methods: {
    chageStatus(valueStatus) {
      this.statusauth = valueStatus;
    },
    goto() {
      if (this.$route.hash) {
        this.$router.replace({
          name: this.$route.name,
          hash: "#",
          behavior: "smooth",
        });
        setTimeout(() => {
          this.$router.replace({
            name: this.$route.name,
            hash: "#voitureDisponible",
            behavior: "smooth",
          });
        }, 500);
      } else {
        this.$router.replace({ behavior: "smooth" });
      }
    },
    verPage(e) {
      this.$router.push({
        name: e,
      });
    },
  },

  fetchOnServer: false,
};
</script>

<style scoped>
@import "~/assets/landing.scss";
</style>

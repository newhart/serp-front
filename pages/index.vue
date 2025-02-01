<template>
  <div id="top" class="auto-scroll">
    <LandingLayouts>
      <div class="">
        <v-container id="voitureDisponible" class="itemcontent disponibility">
          <v-row class="ma-0">
            <v-col cols="12" class="py-0">
              <h1
                v-scroll-to="'#voitureDisponible'"
                class="text-secondary cursor-pointor"
              >
                Voiture disponible chez R23
              </h1>
              <p class="text-primary">
                avec une large GAMME de voitures et COOPERATIVES
              </p>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="cols-img-cooperative">
              <v-row class="ma-0">
                <v-col
                  cols="4"
                  sm="4"
                  md="4"
                  lg="3"
                  class="pa-1 item-cooperative-landing"
                >
                  <v-img
                    lazy-src="/img/r23-1.webp"
                    class="img-vehicule-landing"
                    width="100%"
                    height="210"
                    src="/img/r23-1.webp"
                  >
                    <div class="position-relative h-100">
                      <img
                        src="~/static/img/vip.png"
                        class="img-logo-cooperative"
                      />
                    </div>
                  </v-img>
                </v-col>
                <v-col
                  cols="4"
                  sm="4"
                  md="4"
                  lg="3"
                  class="pa-1 item-cooperative-landing"
                >
                  <v-img
                    lazy-src="/img/r23-2.webp"
                    class="img-vehicule-landing"
                    width="100%"
                    height="210"
                    src="/img/r23-2.webp"
                  >
                    <div class="position-relative h-100">
                      <img
                        src="~/static/img/vip.png"
                        class="img-logo-cooperative"
                      />
                    </div>
                  </v-img>
                </v-col>
                <v-col
                  cols="4"
                  sm="4"
                  md="4"
                  lg="3"
                  class="pa-1 item-cooperative-landing"
                >
                  <v-img
                    lazy-src="/img/r23-3.webp"
                    class="img-vehicule-landing"
                    width="100%"
                    height="210"
                    src="/img/r23-3.webp"
                  >
                    <div class="position-relative h-100">
                      <img
                        src="~/static/img/vip.png"
                        class="img-logo-cooperative"
                      />
                    </div>
                  </v-img>
                </v-col>
                <v-col
                  cols="4"
                  sm="4"
                  md="4"
                  lg="3"
                  class="pa-1 item-cooperative-landing"
                >
                  <v-img
                    lazy-src="/img/r23-4.webp"
                    class="img-vehicule-landing"
                    width="100%"
                    height="210"
                    src="/img/r23-4.webp"
                  >
                    <div class="position-relative h-100">
                      <img
                        src="~/static/img/vip.png"
                        class="img-logo-cooperative"
                      />
                    </div>
                  </v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="6" md="6" class="cols-dernier-inscri">
              <div class="dernier-inscri">
                <p class="text-primary">Derniers inscrits sur R23</p>
                <div
                  v-if="latestMembers"
                  class="d-flex align-center my-2 list-user"
                >
                  <div
                    v-for="(item, index) in latestMembers"
                    :key="index"
                    class="item-user"
                  >
                    <div class="position-relative w-fit-content mx-auto">
                      <img
                        :src="
                          item.profil
                            ? item.profil.picture + '?quality=auto&format=webp'
                            : '/icons/default/default.webp?quality=auto&format=webp'
                        "
                        :srcset="
                          item.profil
                            ? item.profil.picture + '?quality=auto&format=webp'
                            : '/icons/default/default.webp?quality=auto&format=webp'
                        "
                        width="74"
                        height="74"
                        class="img-user-inscrit"
                        alt="img_user"
                      />
                      <div :class="'enlign'"></div>
                    </div>
                    <p class="text-primary limite1-lign px-2">
                      {{
                        item.cooperative_name
                          ? item.cooperative_name
                          : item.lastname + " " + item.name
                      }}
                    </p>
                  </div>
                </div>
                <div v-else class="d-flex align-center my-2 list-user">
                  <div
                    v-for="(item, index) in 6"
                    :key="index"
                    class="item-user"
                  >
                    <div class="position-relative w-fit-content mx-auto">
                      <img class="img-user-inscrit placeholder-wave mx-2" />
                      <div class="'enlign'"></div>
                    </div>
                    <p class="text-primary text-center limite1-lign px-2">
                      ...
                    </p>
                  </div>
                </div>
                <h1
                  v-scroll-to="'#voitureDisponible'"
                  class="text-secondary cursor-pointor"
                >
                  Réservez votre place
                </h1>
                <p class="text-primary">
                  en ligne dans toute l'île de Madagascar.
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="bg-triangle">
        <v-container id="list-colis" class="itemcontent">
          <v-row class="d-flex align-center mt-8 ma-0">
            <v-col cols="12" class="pa-1" sm="6">
              <h1
                v-scroll-to="'#list-colis'"
                class="text-secondary text-left cursor-pointor"
              >
                A propos de R23
              </h1>
              <p class="text-primary text-left">
                <span class="font-bold">R23</span>, une agence spécialisée dans
                le transport routier, offre ses services aux coopératives de
                taxi- brousse, aux propriétaires de véhicules et aux chauffeurs
                en quête de travail. L’agence a été fondée par des experts qui
                se munissent d’une grande expérience pour ce qui est du milieu
                du transport routier à Madagascar.
                <br />
                <br />
                Vous aurez donc l’assurance d’être en de bonnes mains. Nous
                mettons notre expertise et notre expérience dans ce domaine au
                service de ceux qui souhaitent opérer dans les meilleures
                conditions. N&#39;hésitez pas à nous contacter par message privé
                sur notre page ou par téléphone pour plus d&#39;informations.
              </p>
              <div class="w-100 mt-12">
                <v-btn
                  color="primary"
                  v-scroll-to="'#top'"
                  class="d-flex mx-auto no-shadow font12 round50"
                  @click="createAccount()"
                >
                  <span class="limite1-lign">
                    Créer votre compte gratuitement
                  </span>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="dernier-inscri envoy-cols">
                <v-img
                  class="qui-somme-nous-recap"
                  src="/img/qui-sommes-nous.webp"
                  alt=""
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="">
        <v-container
          id="list-publicity"
          class="itemcontent list-publicity-landing"
        >
          <v-row v-if="publicity" class="ma-0">
            <v-col cols="12" class="pa-1">
              <h1
                v-scroll-to="'#list-publicity'"
                class="text-secondary cursor-pointor"
              >
                Une bonne nouvelle pour vous !
              </h1>
            </v-col>
            <v-col
              v-for="(item, index) in publicity"
              :key="index"
              cols="12"
              sm="6"
              lg="4"
            >
              <FrontDefaultItemPublicityLanding :publicity="item" />
            </v-col>
          </v-row>
          <v-row v-else class="ma-0">
            <v-col cols="12" class="pa-1">
              <h1
                v-scroll-to="'#list-publicity'"
                class="text-secondary cursor-pointor"
              >
                Une bonne nouvelle pour vous !
              </h1>
            </v-col>
            <v-col
              v-for="(item, index) in 3"
              :key="index"
              cols="12"
              sm="6"
              lg="4"
            >
              <FrontDefaultItemPublicityLanding />
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="bg-triangle1">
        <v-container id="proprietaire-vehicule" class="itemcontent">
          <v-row class="position-relative ma-0">
            <v-col cols="12" class="pa-1">
              <h1
                v-scroll-to="'#proprietaire-vehicule'"
                class="text-secondary cursor-pointor"
              >
                Télécharger l'application R23.
              </h1>
              <p class="text-primary">
                Installez l'application R23 sur votre smartphone et découvrez
                comment il est facile de réserver votre place en ligne.
              </p>
            </v-col>
            <v-col
              class="z-1 cols-button-front-flex"
              cols="12"
              sm="8"
              md="8"
              lg="6"
            >
              <div class="button-front-flex d-flex flex-wrap mt-12">
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/home.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Réservation
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/mail.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Messages
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/default/icon-vehicule.svg"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Véhicules
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/revenu.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Revenu
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/task-square.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Publicités
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/default/notification.svg"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Notifications
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/3-Friends.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Chauffeurs
                  </p>
                </v-btn>
                <v-btn>
                  <img
                    src="~/static/icons/menu/landing/Iconly-Bold-Profile.png"
                    class="w-33"
                    alt=""
                  />
                  <p class="text-white text-center limite1-lign font10">
                    Ami(e)s
                  </p>
                </v-btn>
              </div>
              <a
                href="/r23.apk"
                class="d-flex download font12 no-shadow round50 w-fit-content v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                download=""
                target="_blank"
              >
                Télécharger gratuitement
              </a>
            </v-col>
          </v-row>
          <img
            class="bg-menu-landing"
            src="~/static/img/pexels-sound-on-3756861.webp"
            alt=""
          />
        </v-container>
      </div>
      <!-- <v-btn
        @click="downloadApk()"
        color="primary"
        class="d-flex ml-auto no-shadow bg-primary-landing"
        :loading="loadDownload"
      >
        Télécharger gratuitement
      </v-btn> -->
      <v-container class="itemcontent my-5">
        <div
          id="create-publicity"
          class="d-flex align-center justify-between flex-create-publicity"
        >
          <div>
            <h1
              v-scroll-to="'#create-publicity'"
              class="text-secondary cursor-pointor"
            >
              Vous êtes propriétaire d'un véhicule ?
            </h1>
            <p class="text-primary">
              Inscrivez-vous vite pour connaitre votre revenu, ainsi que votre
              tour de voiture.
            </p>
          </div>
          <v-btn
            color="primary"
            v-scroll-to="'#top'"
            class="d-flex ml-auto no-shadow font12 round50"
            @click="createAccount()"
          >
            Créer votre compte
          </v-btn>
        </div>
      </v-container>
    </LandingLayouts>
  </div>
</template>

<script>
export default {
  data: () => ({
    loadDownload: false,
    latestMembers: null,
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
    publicity: null,
  }),
  methods: {
    // downloadApk() {
    //   this.loadDownload = true;
    //   const link = document.createElement("a");
    //   link.href = "/r23.apk";
    //   link.download = "r23.apk";
    //   link.target = "_blank";
    //   link.click();
    //   setTimeout(() => {
    //     this.loadDownload = false;
    //   }, 3000);
    // },
    createAccount() {
      this.$store.commit("default/changestatusLanding", "register");
    },
  },

  fetchOnServer: false,

  async fetch() {
    const value = await this.$axios.get("api/user-registred-latest");
    this.latestMembers = value.data.users;

    const publicitythree = await this.$axios.get(
      `api/publicity/threeLatest-publicity-landing`
    );
    this.publicity = publicitythree.data.allPublicity;
  },
};
</script>

<style scoped>
@import "~/assets/landing.scss";
a.download {
  text-transform: none;
}
@media (max-width: 500px) {
  div#create-publicity button {
    margin: 10px auto 0;
  }
}
</style>

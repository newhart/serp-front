<template>
  <div>
    <v-app-bar
      color="secondary"
      elevation="0"
      fixed
      app
      class="header-top condition-usage"
    >
      <div class="w-100">
        <div class="d-flex align-center">
          <div class="logo-r23">
            <v-toolbar-title class="d-flex align-center">
              <img
                src="~/static/icons/default/logo-blanc.svg"
                class="logo"
                alt=""
              />
              <p class="text-white font12 font-bold ml-2 mb-0">
                Concentrez-vous<br />sur ce qui vous différencie le plus
              </p>
            </v-toolbar-title>
          </div>
          <v-spacer />
          <v-btn
            v-if="!$auth.loggedIn"
            link
            to="/"
            class="font12 button-revenir-res"
            color="primary"
          >
            Revenir dans ma page d'accueil
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-container class="itemcontent mt-16">
      <p class="text-primary px-2">CONDITIONS GÉNÉRALES ET RÈGLEMENTS</p>
      <h1 class="text-secondary px-2">
        Tout ce que vous devez savoir,
        <br />
        réuni au même endroit.
      </h1>
      <v-row class="ma-0 flex-row-res-cond">
        <v-col class="pa-2" cols="4">
          <a target="_blank" href="#" class="_9lvt">
            <div class="_cmsPalettePolicyCard__card">
              <div class="_9lvu">
                <img
                  class="_90f0 _9kug _21op _1-qs _9mk0 img w-100"
                  src="/img/cadre_centrale1.webp"
                  alt=""
                  style="box-sizing: border-box"
                />
              </div>
            </div>
            <div class="_9lvv d-flex">
              <div class="_9lvw">
                <img
                  src="~/static/icons/default/logo-secondary.svg"
                  class="logo-cods mr-2"
                  alt=""
                />
              </div>
              <div class="_9lvx">
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #1c2b33"
                >
                  <h4>Mission</h4>
                </div>
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #67788a"
                >
                  <p>
                    Mettre en relation des professionnels à Madagascar pour les
                    rendre plus performants et productifs.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </v-col>
        <v-col class="pa-2" cols="4">
          <a target="_blank" href="#" class="_9lvt">
            <div class="_cmsPalettePolicyCard__card">
              <div class="_9lvu">
                <img
                  class="_90f0 _9kug _21op _1-qs _9mk0 img w-100"
                  src="/img/cadre_centrale1.webp"
                  alt=""
                  style="box-sizing: border-box"
                />
              </div>
            </div>
            <div class="_9lvv d-flex">
              <div class="_9lvw">
                <img
                  src="~/static/icons/default/logo-secondary.svg"
                  class="logo-cods mr-2"
                  alt=""
                />
              </div>
              <div class="_9lvx">
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #1c2b33"
                >
                  <h4>Vision</h4>
                </div>
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #67788a"
                >
                  <p>
                    Créer des opportunités pour les professionnels à Madagascar.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </v-col>
        <v-col class="pa-2" cols="4">
          <a target="_blank" href="#" class="_9lvt">
            <div class="_cmsPalettePolicyCard__card">
              <div class="_9lvu">
                <img
                  class="_90f0 _9kug _21op _1-qs _9mk0 img w-100"
                  src="/img/cadre_centrale1.webp"
                  alt=""
                  style="box-sizing: border-box"
                />
              </div>
            </div>
            <div class="_9lvv d-flex">
              <div class="_9lvw">
                <img
                  src="~/static/icons/default/logo-secondary.svg"
                  class="logo-cods mr-2"
                  alt=""
                />
              </div>
              <div class="_9lvx">
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #1c2b33"
                >
                  <h4>Offres d'emploi</h4>
                </div>
                <div
                  class="_8l_f _52ju"
                  style="box-sizing: border-box; color: #67788a"
                >
                  <p>
                    Restez en contact avec les professionnels pour développer
                    vos activités ou vos projets.
                  </p>
                </div>
              </div>
            </div>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <div class="bg-condion">
      <v-container class="container-condes">
        <v-row class="ma-0 row-condition-usage">
          <v-col cols="6" class="pa-7 pl-0">
            <h3 class="text-secondary">PLUS DE TYPES DE RÈGLEMENT</h3>
            <ul class="list-style-none list-cust-condition">
              <li
                v-scroll-to="'#variableConditionUsage'"
                @click.prevent="contentValue = item"
                v-for="(item, index) in content"
                :key="index"
                :class="
                  item.id === contentValue.id ? 'font18 active' : 'font18'
                "
              >
                {{ item.title }}
              </li>
            </ul>
            <h3 class="text-secondary mt-5">LISTE DES OFFRES D'EMPLOI</h3>
            <div id="variableConditionUsage" class="variable-res"></div>
            <ul class="list-style-none list-cust-condition">
              <li
                @click.prevent="contentValue = item"
                v-scroll-to="'#variableConditionUsage'"
                v-for="(item, index) in content1"
                :key="index"
                :class="
                  item.id === contentValue.id ? 'font18 active' : 'font18'
                "
              >
                {{ item.title }}
              </li>
            </ul>
          </v-col>

          <v-col cols="6" class="pa-7 pr-0">
            <h3 class="text-secondary text-upercase">
              {{ contentValue.title }}
            </h3>
            <p v-html="contentValue.description" class="text-white"></p>
          </v-col>
        </v-row>
      </v-container>
    </div>
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
            Inscrivez-vous vite pour savoir votre revenu, ainsi votre tour de
            voiture.
          </p>
        </div>
        <v-btn
          color="primary"
          link
          to="/"
          class="d-flex ml-auto no-shadow bg-primary-landing"
        >
          Créer votre compte
        </v-btn>
      </div>
    </v-container>
    <v-footer primary class="bg-primary" padless>
      <v-container class="itemcontent">
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
                <NuxtLink
                  :to="!$auth.loggedIn ? '/' : null"
                  v-scroll-to="'#top'"
                  class="text-white"
                  >Accueil</NuxtLink
                >
              </p>
              <p class="cursor-pointor text-white w-fit-content">
                <NuxtLink
                  :to="!$auth.loggedIn ? '/' : null"
                  v-scroll-to="'#list-colis'"
                  class="text-white"
                  >A propos</NuxtLink
                >
              </p>

              <p class="cursor-pointor text-white w-fit-content">
                <span class="text-white"
                  >Conditions Générales d'Utilisation</span
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
  head: {
    titleTemplate: "R23 - Conditions d'utilisation de R23",
  },
  data() {
    return {
      contentValue: {
        id: 1,
        title: "Conditions d'utilisation",
        description:
          "Même si vous pouvez être tenté de ne pas lire les présentes conditions d'utilisation, il est important que vous sachiez ce que vous pouvez attendre de nous lorsque vous utilisez les services R23, et inversement.<br><br>Les présentes conditions d'utilisation traduisent le fonctionnement de R23, les lois qui s'appliquent à notre entreprise et certains principes que nous avons toujours tenus pour vrais. Par conséquent, ces conditions d'utilisation contribuent à définir votre relation avec R23 lorsque vous interagissez avec nos services. Elles couvrent entre autres les thèmes suivants :<br><br>Ce que vous pouvez attendre de notre part, qui décrit comment nous proposons et développons nos services.<br><br>La section :<br>Ce que nous attendons de votre part énonce certaines règles concernant l'utilisation de nos services.<br><br>La section :<br>Contenue dans les services R23, présente les droits de propriété intellectuelle associés aux contenus que vous trouvez dans nos services, que ces contenus vous appartiennent ou soient la propriété de R23 ou de tiers.<br><br>La section :<br>En cas de problèmes ou de désaccords présente d'autres droits dont vous jouissez et décrit les conséquences d'une violation des présentes conditions d'utilisation.Il est essentiel de bien comprendre ces conditions, car vous les acceptez en utilisant nos services.<br><br>Outre les présentes conditions, nous avons également publié des Règles de confidentialité. Même si ces règles ne font pas partie de ces conditions, nous vous invitons à les lire attentivement afin de mieux comprendre comment modifier, gérer, exporter et supprimer vos données.",
      },
      loadDownload: false,
      content: [
        {
          id: 1,
          title: "Conditions d'utilisation",
          description:
            "Même si vous pouvez être tenté de ne pas lire les présentes conditions d'utilisation, il est important que vous sachiez ce que vous pouvez attendre de nous lorsque vous utilisez les services R23, et inversement.<br><br>Les présentes conditions d'utilisation traduisent le fonctionnement de R23, les lois qui s'appliquent à notre entreprise et certains principes que nous avons toujours tenus pour vrais. Par conséquent, ces conditions d'utilisation contribuent à définir votre relation avec R23 lorsque vous interagissez avec nos services. Elles couvrent entre autres les thèmes suivants :<br><br>Ce que vous pouvez attendre de notre part, qui décrit comment nous proposons et développons nos services.<br><br>La section :<br>Ce que nous attendons de votre part énonce certaines règles concernant l'utilisation de nos services.<br><br>La section :<br>Contenue dans les services R23, présente les droits de propriété intellectuelle associés aux contenus que vous trouvez dans nos services, que ces contenus vous appartiennent ou soient la propriété de R23 ou de tiers.<br><br>La section :<br>En cas de problèmes ou de désaccords présente d'autres droits dont vous jouissez et décrit les conséquences d'une violation des présentes conditions d'utilisation.Il est essentiel de bien comprendre ces conditions, car vous les acceptez en utilisant nos services.<br><br>Outre les présentes conditions, nous avons également publié des Règles de confidentialité. Même si ces règles ne font pas partie de ces conditions, nous vous invitons à les lire attentivement afin de mieux comprendre comment modifier, gérer, exporter et supprimer vos données.",
        },
        {
          id: 2,
          title: "Fournisseur de services",
          description:
            "Les services R23 vous sont fournis par la société ci-dessous avec laquelle vous concluez un contrat :<br><br>KREA AGENCY Sarl U<br>Société immatriculée dans l'État de Madagascar et régie par la législation Malgache<br><br>II B C ter Amboditsiry<br>Antananarivo, Madagascar<br>Tél : 038 23 025 23<br>https://www.r23mada.com<br><br>",
        },
        {
          id: 3,
          title: "Limite d'âge",
          description:
            "Si vous n'avez pas atteint la limite d'âge pour gérer votre propre compte R23, vous devez avoir l'autorisation d'un parent ou d'un représentant légal pour utiliser un compte R23. Veuillez demander à un parent ou à un représentant légal de lire les présentes conditions avec vous.<br><br>Si vous êtes un parent ou un représentant légal, et si vous autorisez votre enfant à utiliser les services, les présentes conditions s'appliquent à vous, et vous êtes responsable des activités de votre enfant sur ces services.<br><br>Certains services R23 prévoient une limite d'âge indiquée dans leurs Conditions supplémentaires spécifiques.",
        },
      ],
      content1: [
        {
          id: 4,
          title: "R23 recrute : COMMUNITY MANAGER - Réf : CM R23",
          description:
            "MISSIONS :<br>- Interagir avec la communauté de fans,<br>- Créer du contenu : rédaction d’articles<br>- Développer la notoriété de l'entreprise sur le web, sur les réseaux sociaux<br>- Établir le reporting et l'analyse<br>- Faire de la veille informationnelle et concurrentielle<br><br>PROFIL<br>QUALITÉ :<br>- Curiosité,<br>- Polyvalence,<br>- Organisation,<br>- Créativité.<br><br>COMPÉTENCES :<br>- Orthographe et syntaxe impeccable,<br>- Connaissances approfondies de l’utilisation des réseaux sociaux.<br>- Capacité à faire le buzz,<br>- Connaissances des droits du commerce électronique et pratiques sur le web,<br>- Réalisations de contenus, images<br><br>Nous recherchons des candidats passionnés par leur métier. <br>Pour postuler : Envoyer CV + lettre de motivation + photo + prétentions salariales + contact par mail r23mada@gmail.com en mentionnant la référence « CM - R23 »",
        },
        {
          id: 5,
          title: "R23 recrute : COMMERCIAL - Réf : CL R23",
          description:
            "MISSIONS :<br>Participer à la définition de la politique commerciale de l’entreprise, à partir de la stratégie de l’entreprise<br>- Prospection et développement du portefeuille clients (BtoC et BtoB), négociation et conclusion de vente<br>- Fixer les objectifs et les axes prioritaires<br>- Traitement et suivi des dossiers<br>- La présentation et la démonstration des produits ou services de l’entreprise<br>- La finalisation de la vente<br>- Gestion du réseau professionnel, des clients et des ventes : entretenir des bonnes relations avec les entreprises/partenaires /clients, faire un suivi et une analyse<br>- Organisation d’évènement commercial<br>- Promotion de l'offre de services ou de produits<br>- Élaboration d'une proposition commerciale et participation à l'élaboration de la proposition technique<br><br>PROFIL<br>Diplômé(e) Bac+4 /5 en Commerce et marketing et justifiant d’une expérience similaire de 2 ans minimum<br>- Une forte capacité rédactionnelle et d’organisation<br>- Une aisance dans le traitement d’informations multicanaux (auditeurs, formateurs, clients, partenaires)<br>- Une appétence à travailler en mode start-up<br>- Bonne maîtrise du français, et bonne compréhension de l’anglais<br>- Maîtrise des outils bureautiques<br><br>Nous recherchons des candidats passionnés par leur métier. <br>Pour postuler : Envoyer CV + lettre de motivation + photo + prétentions salariales + contact par mail r23mada@gmail.com en mentionnant la référence « CL - R23 »",
        },
        {
          id: 6,
          title: "R23 recrute : DESIGNER GRAPHISTE - Réf : DG R23",
          description:
            "MISSIONS :<br>-Mise en place d’un concept graphique.<br>- Réaliser la conception de logos et d’affiches<br>- Reproduire du texte et des idées en images et en identité visuelle.<br>- Manipuler et Fournir des contenus visuels attractifs en procédant au détourage,<br>- Au nettoyage, au redimensionnement, ou encore à la retouche des images à travailler.<br>- Améliorer le rendu final des photos en respectant des critères précis.<br><br>PROFIL<br>- Diplômé en multimédia/ ou d’Arts appliqués<br>- Bonne maitrise d'Adobe Photoshop, XD...<br>- Bonne capacité à suivre les consignes et de compréhension<br>- Vocation et talents artistiques indéniables.<br>- Autonome, Rapide, Apte à travailler en équipe<br><br>Nous recherchons des candidats passionnés par leur métier. <br>Pour postuler : Envoyer CV + lettre de motivation + photo + prétentions salariales + contact par mail r23mada@gmail.com en mentionnant la référence « DG - R23 »",
        },
      ],
    };
  },
  middleware: "auth",
  auth: "guest",
  methods: {
    downloadApk() {
      this.loadDownload = true;
      const link = document.createElement("a");
      link.href = "/r23.apk";
      link.download = "r23.apk";
      link.target = "_blank";
      link.click();
      setTimeout(() => {
        this.loadDownload = false;
      }, 3000);
    },
    createAccount() {
      this.$store.commit("default/changestatusLanding", "register");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/landing.scss";
img._90f0._9kug._21op._1-qs._9mk0.img.w-100 {
  height: 400px;
  border-radius: 5px;
}
img.logo-cods {
  width: 40px;
  margin-top: 5px;
}
a._9lvt ._cmsPalettePolicyCard__card ._9lvu {
  overflow: hidden !important;
}
a._9lvt:hover img._90f0._9kug._21op._1-qs._9mk0.img.w-100 {
  transform: scale(1.02);
  transition: all 0.8s;
}
ul.list-style-none {
  list-style: none;
  padding: 0;
}
ul.list-style-none.list-cust-condition li {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.582);
}
ul.list-style-none.list-cust-condition li.active {
  color: #032153;
  font-family: "gilroy-bold";
  position: relative;
}
ul.list-style-none.list-cust-condition li.active::after {
  color: #ff3354;
  content: "→";
  position: absolute;
  left: -15px;
  top: 0px;
  font-family: "gilroy-bold";
}
.bg-condion {
  background: linear-gradient(to right, #ddd 50%, #032153 50%);
}
@media (max-width: 959px) {
  img._90f0._9kug._21op._1-qs._9mk0.img.w-100 {
    height: 250px;
  }
}
@media (max-width: 890px) {
  .flex-row-res-cond {
    flex-direction: column;
  }
  .flex-row-res-cond .col.col-4 {
    max-width: 100%;
  }
}
@media (max-width: 564px) {
  a.font12.button-revenir-res {
    display: none;
  }
  header.header-top.condition-usage .v-toolbar__content,
  header.header-top.condition-usage {
    height: 70px !important;
  }
}
div#variableConditionUsage.variable-res {
  display: none;
}
@media (max-width: 700px) {
  .row-condition-usage {
    flex-direction: column;
  }
  .container.container-condes {
    padding: 10px !important;
  }
  div#variableConditionUsage.variable-res {
    display: block;
  }
  .row-condition-usage .col.col-6 {
    padding: 15px !important;
    max-width: 100%;
    background-color: #ffffff9e;
  }
  .row-condition-usage .col.col-6 p.text-white {
    color: #032153 !important;
  }
  ul.list-style-none.list-cust-condition li.active::after {
    content: "→";
  }
}
</style>

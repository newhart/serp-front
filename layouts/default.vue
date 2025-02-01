<template>
  <div>
    <v-app v-if="$auth.loggedIn && $route.name !== 'condition-usage'" dark>
      <transition name="fade">
        <Loading v-if="loadLogout" />
      </transition>
      <FrontHeader
        :menu_users="menu_users"
        :unreadNotification="unreadNotification"
        @loadingDisconnect="loadLogout = true"
      />
      <v-main>
        <FrontDefaultInfouser />
        <!-- <v-container>
          <div class="d-flex justify-between h-100">
            <div class="block-left"></div>
          </div>
        </v-container> -->
      </v-main>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <FrontAddgamme
        :dialogueaddgammevoiture="dialogueaddgammevoiture"
        @success="
          (dialogueaddgammevoiture = false), (dialogueadddestination = true)
        "
      />
      <!--            create new  destination for cooperative-->
      <v-dialog
        v-model="dialogueadddestination"
        width="500"
        overlay-color="#000"
        overlay-opacity="0.5"
        content-class="pa-6"
        persistent
      >
        <v-card>
          <v-row class="ma-0">
            <v-row class="ma-0">
              <v-col class="pa-1" cols="12">
                <h3 class="text-secondary text-center text-bold mb-4">
                  Ajouter votre nouvelle destination
                </h3>
              </v-col>
            </v-row>

            <FrontGestionVehiculeAddDestination
              @saveDetination="
                (dialogueadddestination = false), (dialogueaddvoiture = true)
              "
            />
          </v-row>
        </v-card>
      </v-dialog>
      <!--            end create new destination-->
      <!--            create new  vehicule for cooperative-->
      <v-dialog
        v-model="dialogueaddvoiture"
        width="500"
        overlay-color="#000"
        overlay-opacity="0.5"
        content-class="pa-6"
        persistent
      >
        <v-card>
          <v-row class="ma-0">
            <v-row class="ma-0">
              <v-col class="pa-1" cols="12">
                <h3 class="text-secondary text-center text-bold mb-4">
                  Ajouter votre nouvelle voiture
                </h3>
              </v-col>
            </v-row>

            <FrontGestionVehiculeAddVehicule
              @register="
                (dialogueaddvoiture = false), (dialogueaddgestTours = true)
              "
              :is_created="true"
              :form_vehicul_props="null"
            />
          </v-row>
        </v-card>
      </v-dialog>
      <!--            end create new vehicule-->
      <!--            create new  gestion tours-->
      <v-dialog
        v-model="dialogueaddgestTours"
        width="500"
        overlay-color="#000"
        overlay-opacity="0.5"
        content-class="pa-6"
        persistent
      >
        <FrontAddgestiontours
          @success="(dialogueaddgestTours = false), successInscription()"
        />
      </v-dialog>
      <!--            end create gestion tours-->
    </v-app>
    <v-app v-else>
      <nuxt keep-alive />
    </v-app>
    <transition name="fade">
      <Loading v-if="loadLogout" />
    </transition>
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      dialogueaddgammevoiture: false,
      dialogueaddvoiture: false,
      dialogueadddestination: false,
      dialogueaddgestTours: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      urlActive: null,
      users: [],
      loadingPage: false,
      connectedUser: false,
      loadLogout: false,
      etapeTuto: 0,
      menu_users: [],
      unreadNotification: 0,
    };
  },

  methods: {
    onResize() {
      this.$store.commit("default/changewindowWidth", window.innerWidth);
    },
    successInscription() {
      let beat = new Audio("../sound/mixkit-success.wav");
      beat.volume = 0.1;
      beat.play();
      Swal.fire({
        title: "Bravo!",
        text: "C’est fait! Maintenant, allez changer le monde ! Et n’oubliez pas de vous amuser.",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#032153",
        confirmButtonText: "Jouer avec R23 !",
        focusConfirm: false,
        showCancelButton: false,
      }).then((result) => {
        if (result.value) {
          this.$store.commit("chat/changenewCooperative", null);
          localStorage.setItem("newCooperative", null);
        }
      });
    },
    tuto() {
      if (this.connectedUser) {
        Swal.fire({
          title: "Bienvenue, " + this.$auth.user.user.cooperative_name,
          text: "Notre mission est de vous aidez plus productif. Cela ne prendra qu'une minute.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#032153",
          confirmButtonText: "C'est parti !",
          focusConfirm: false,
          showCancelButton: false,
          allowOutsideClick: () => {
            const popup = Swal.getPopup();
            setTimeout(() => {
              popup.classList.add("animate__animated", "animate__headShake");
            });
            setTimeout(() => {
              popup.classList.remove("animate__animated", "animate__headShake");
            }, 500);
            return false;
          },
        }).then((result) => {
          if (result.value) {
            // Swal.fire("Supprimé!", "Votre publicité a été supprimé.", "success");
            this.dialogueaddgammevoiture = true;
          }
        });
      }
    },
  },
  async fetch() {
    const userData = await this.$axios.get("api/user-registred-latest");
    this.users = userData.data.users;
    // get data when user auth
    if (this.$auth.loggedIn) {
      const response = await this.$axios.get("api/user-menu");
      const menus = response.data.user_type.menus;
      menus.forEach((item) => {
        if (item.name === "Réservation") {
          item.to = {
            name: "username",
            params: {
              username: this.$auth.user.user.url,
            },
          };
        } else if (item.name === "Mon compte") {
          item.to = {
            name: "account",
            params: {
              index: this.$auth.user.user.url,
            },
          };
        } else {
          item.to = {
            name: item.url,
          };
        }
      });
      this.menu_users = menus;
      const response_notification = await this.$axios.get(
        "api/user/notification/count/unread"
      );
      this.unreadNotification = response_notification.data.count;
    }
  },
  watch: {
    $route(to, from) {
      this.urlActive = to.name;
      if (to.name === "condition-usage") {
        this.pageAdding = true;
      } else {
        this.pageAdding = false;
      }
      if (to.name === "actualites" && from.name === "index") {
        this.$fetch();
      }
    },
    "$store.state.chat.newCooperative": {
      handler(value) {
        if (value && value != "null") {
          this.tuto();
        }
      },
      deep: true,
      immediate: true,
    },
    "$auth.loggedIn": {
      handler(value) {
        if (process.client) {
          if (value && this.$route.name !== "condition-usage") {
            this.connectedUser = true;
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
          } else {
            this.loadLogout = true;
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
            setTimeout(() => {
              this.connectedUser = false;
              this.loadLogout = false;
              document.getElementsByTagName("html")[0].style.overflow =
                "visible";
            }, 2500);
          }
        } else {
          if (value) {
            this.connectedUser = true;
          } else {
            this.loadLogout = true;
            setTimeout(() => {
              this.connectedUser = false;
              this.loadLogout = false;
            }, 1000);
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    this.onResize();
    if (process.client) {
      this.$store.commit(
        "chat/changenewCooperative",
        localStorage.getItem("newCooperative")
      );
    }
  },
};
</script>
<style lang="scss">
.home-enter-active,
.home-leave-active {
  transition: opacity 0.5s;
}
.home-enter,
.home-leave-active {
  opacity: 0;
}
</style>

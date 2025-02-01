<template>
  <div v-if="profil">
    <v-img
      :lazy-src="
        changeCover
          ? changeCover
          : profil.user.profil && profil.user.profil.cover
          ? profil.user.profil.cover
          : '/icons/default/cover.webp'
      "
      :src="
        changeCover
          ? changeCover
          : profil.user.profil && profil.user.profil.cover
          ? profil.user.profil.cover
          : '/icons/default/cover.webp'
      "
      class="couverture"
    >
      <div class="transparence-bg"></div>
      <v-container class="h-100 pt-0">
        <div class="d-flex justify-between h-100">
          <div class="block-left justify-center py-0">
            <v-navigation-drawer
              :permanent="windowWidth <= 1100 ? false : true"
              :temporary="windowWidth <= 1100 ? true : false"
              :fixed="windowWidth <= 1100 ? true : false"
              class="accueil-left"
              v-model="leftBlock"
              hide-overlay
              overlay-opacity="0"
            >
              <div class="sticky-pos pt-8">
                <div
                  @click="viewProfile()"
                  class="cursor-pointor img-user mx-auto"
                >
                  <img
                    :src="
                      changePicture
                        ? changePicture
                        : profil.user.profiluser
                        ? profil.user.profiluser.picture
                        : '/icons/default/default.webp'
                    "
                    alt="profil-user"
                  />
                  <div class="enlign"></div>
                </div>
                <div @click="viewProfile()" class="info-name w-100">
                  <h4
                    class="text-white text-center mt-3 limite1-lign"
                    v-if="profil && profil?.user?.user_type?.id !== 1"
                  >
                    {{ profil.user.lastname }}
                    {{ profil.user.name }}
                  </h4>
                  <h4 class="text-white text-center mt-3" v-else>
                    {{ profil ? profil.user.cooperative_name : "" }}
                  </h4>
                  <p class="mt-2 mb-0 text-white text-center limite1-lign">
                    <span>
                      <v-icon color="secondary"> mdi-heart </v-icon>
                      {{ profil.user.likecount }} j'aime(s)
                    </span>
                    <span class="pl-4">
                      <v-icon color="secondary"> mdi-account </v-icon>
                      {{ profil.user.friendscount }} contact(s)
                    </span>
                  </p>
                </div>
              </div>
              <div class="marge-auto" v-if="urlActive === 'message'">
                <FrontMessageListConversationInPageMessage />
              </div>
              <div class="marge-auto" v-else>
                <div class="bg-culd">
                  <v-btn
                    color="primary"
                    rounded
                    width="100%"
                    height="45"
                    class="my-2"
                    @click="addPub()"
                  >
                    Créer des publicités
                  </v-btn>
                  <FrontDefaultDernierInscrit :users="users" />
                  <FrontDefaultItemPublicity
                    v-if="publicity"
                    :publicity="publicity"
                  />
                  <FrontDefaultContactEnlign
                    v-if="onlineUser"
                    :onlineUser="onlineUser"
                  />
                  <div class="my-3">
                    <div class="d-flex align-center justify-between">
                      <p class="text-primary font-bold">SUGGESTION D'AMIS</p>
                      <!-- <p class="text-success">Afficher tout</p> -->
                    </div>
                    <div class="list-suggestion mt-2">
                      <FrontDefaultSuggestionAmis
                        v-for="(item, index) in suggestFriends"
                        :key="index"
                        :user="item"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </v-navigation-drawer>
          </div>
          <div
            id="center-r23"
            @scroll="handleScroll"
            class="right-block pt-8 nuxt-right-global"
          >
            <div
              class="d-flex justify-between absolute-boutton-mes-reservation align-center"
            >
              <div
                @click="leftBlock = true"
                class="d-flex align-center button-foating-left"
              >
                <v-avatar
                  v-if="windowWidth <= 1100"
                  color="secondary"
                  size="37"
                  rounded="15"
                >
                  <v-icon size="20" class="text-white">
                    mdi-format-list-bulleted-square
                  </v-icon>
                </v-avatar>
                <v-btn v-if="windowWidth <= 1100" icon>
                  <v-icon color="secondary"> mdi-chevron-double-right </v-icon>
                </v-btn>
              </div>
              <v-btn
                v-if="profil && profil?.user?.user_type?.id === 1"
                :to="{ name: 'mes-reservation' }"
                @click="$fetch()"
                class="font12"
                color="secondary"
                :absolute="windowWidth <= 1100 ? false : true"
              >
                <v-badge
                  bordered
                  color="success"
                  offset-x="-5"
                  offset-y="0"
                  v-if="countNotificationReservation > 0"
                  :content="countNotificationReservation"
                >
                  Mes réservations
                </v-badge>
                <span v-else>Mes réservations</span>
              </v-btn>
            </div>
            <div class="marg-bott"></div>
            <div>
              <Nuxt
                keep-alive
                :keep-alive-props="{
                  exclude: ['pages/groups/modify/_id.vue'],
                }"
              />
            </div>
            <transition name="fade">
              <a
                @click="refreshActuality()"
                v-if="scrollTop > 500"
                class="back-to-top d-flex align-center MoveUpDown justify-center"
              >
                <v-icon class="text-white"> mdi-arrow-up </v-icon>
              </a>
            </transition>
          </div>
          <transition name="fade">
            <div
              v-if="
                urlActive === 'message' && targetuser && windowWidth >= 1101
              "
              class="block-left justify-center pt-8"
            >
              <div class="sticky-pos opacity0">
                <div class="cursor-pointor img-user mx-auto">
                  <img
                    :src="
                      targetuser
                        ? targetuser.target_user.img
                        : '/icons/default/default.webp'
                    "
                    alt="profil-user"
                  />
                  <div class="enlign"></div>
                </div>
                <div @click="viewProfile()" class="info-name w-100">
                  <h4 class="text-white text-center mt-3">
                    {{
                      targetuser ? targetuser.target_user.name : "Invalide user"
                    }}
                  </h4>
                  <p class="mt-2 mb-0 text-white text-center limite1-lign">
                    <span>
                      <v-icon color="secondary"> mdi-heart </v-icon>
                      {{ targetuser ? targetuser.target_user.likecount : 0 }}
                      j'aime
                    </span>
                    <span class="pl-4">
                      <v-icon color="secondary"> mdi-account </v-icon>
                      {{ targetuser ? targetuser.target_user.friendscount : 0 }}
                      contact(s)
                    </span>
                  </p>
                </div>
              </div>
              <div class="marge-auto">
                <FrontMessageGallery />
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div
              v-if="
                (urlActive === 'actualites' ||
                  urlActive === 'groups' ||
                  urlActive === 'groups-create' ||
                  urlActive === 'groups-modify-id') &&
                windowWidth >= 1101
              "
              class="block-left left-actuality justify-center pt-8"
            >
              <div class="sticky-pos opacity0">
                <div class="cursor-pointor img-user mx-auto">
                  <img alt="profil-user" />
                  <div class="enlign"></div>
                </div>
                <div class="info-name w-100">
                  <h4 class="text-white text-center mt-3">Invalide user</h4>
                  <p class="mt-2 mb-0 text-white text-center limite1-lign">
                    <span>
                      <v-icon color="secondary"> mdi-heart </v-icon>
                      0 j'aime
                    </span>
                    <span class="pl-4">
                      <v-icon color="secondary"> mdi-account </v-icon>
                      0 contact(s)
                    </span>
                  </p>
                </div>
              </div>
              <div class="marge-auto">
                <div class="bg-culd">
                  <FrontGroupsLayout
                    :myGroups="myGroups"
                    :iAmInGroup="iAmInGroup"
                    :popularGroup="popularGroup"
                    :suggestGroup="suggestGroup"
                    @handelAcced="changePopularData"
                    @handelVisited="changeStatusMyGroup"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </v-container>
    </v-img>
  </div>
</template>
<script>
export default {
  data() {
    return {
      urlActive: null,
      targetuser: null,
      profil: null,
      suggestFriends: [],
      onlineUser: [],
      users: [],
      publicity: null,
      windowWidth: 0,
      leftBlock: true,
      changeCover: null,
      changePicture: null,
      countNotificationReservation: 0,
      myGroups: [],
      iAmInGroup: [],
      popularGroup: [],
      suggestGroup: [],
      scrollTop: 0,
    };
  },
  async fetch() {
    // get the latest register
    const userData = await this.$axios.get("api/registred-latest");
    this.users = userData.data.users;
    if (this.$auth.loggedIn) {
      const friendData = await this.$axios.get("api/sugger-friend");
      this.suggestFriends = friendData.data.request.data;

      this.profil = this.$auth.user;
      // get all user online
      const response = await this.$axios.get("api/all-online");
      this.onlineUser = response.data;
      //  resource group api
      const myGroups = await this.$axios.get("api/groups/my-group");
      this.myGroups = myGroups.data.data;
      const groups = await this.$axios.get("api/groups/i-am-member");
      this.iAmInGroup = groups.data.data;
      const popular = await this.$axios.get("api/groups/popular");
      this.popularGroup = popular.data;
      if (this.iAmInGroup.length === 0 && this.myGroups.length === 0) {
        const responseSuggestion = await this.$axios.get(
          "api/groups/suggest-group"
        );
        this.suggestGroup = responseSuggestion.data;
      }
    }
  },
  async mounted() {
    await this.getCountReservation();
    if (process.client) {
      // await this.$echo
      //   .private("users." + this.$auth.user.user.id)
      //   .notification((notification) => {
      //     if (
      //       notification.type === "App\\Notifications\\NotificationReservation"
      //     ) {
      //       this.getCountReservation();
      //     }
      //   });
    }
  },
  methods: {
    handleScroll(e) {
      this.$store.commit("default/changescrollCenter", e.srcElement.scrollTop);
      this.scrollTop = e.srcElement.scrollTop;
    },
    refreshActuality() {
      let els = document.getElementById("center-r23");
      this.$store.commit("default/changerefreshPage", true);
      els.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    addPub() {
      this.$router.push({
        name: "publicity",
        params: {
          action: "add",
        },
      });
    },
    changePopularData(item) {
      this.$axios
        .get("api/groups/popular")
        .then((res) => {
          this.popularGroup = res.data;
          this.popularGroup = this.popularGroup.filter((g) => g.id !== item.id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    changeStatusMyGroup(item) {
      this.$axios
        .get("api/groups/my-group")
        .then((res) => {
          this.myGroups = res.data.data;
          this.myGroups = this.myGroups.filter((g) => g.id !== item.id);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCountReservation() {
      this.$axios
        .get("api/user/notification/count/reservation")
        .then((res) => {
          this.countNotificationReservation = res.data.count;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    viewProfile() {
      this.$router.push({
        name: "account",
        params: {
          index: this.user.url,
        },
      });
    },
    getNewPub() {
      this.$axios
        .get("/api/publicity/random/" + 1)
        .then((res) => {
          this.publicity = res.data.publicity;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    "$route.name": {
      handler(name) {
        this.urlActive = name;
        if (this.$auth.loggedIn) {
          this.getNewPub();
        }
      },
      immediate: true,
      deep: true,
    },
    "$store.state.chat.discussioninPage": {
      handler(value) {
        this.targetuser = value;
      },
      deep: true,
      immediate: true,
    },
    "$store.state.default.windowWidth": {
      handler: function (size) {
        this.windowWidth = size;
        if (size >= 1101) {
          this.leftBlock = true;
        } else {
          this.leftBlock = false;
        }
      },
      deep: true,
      immediate: true,
    },
    "$store.state.default.cover": {
      handler: function (value) {
        if (value) {
          this.changeCover = value;
        }
      },
      deep: true,
      immediate: true,
    },
    "$store.state.default.picture": {
      handler: function (value) {
        if (value) {
          this.changePicture = value;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/infouser.scss";
.block-left {
  overflow-y: scroll;
  height: calc(100vh - 63px);
}
.back-to-top {
  position: fixed;
  background: #032153;
  bottom: 20px;
  margin-left: 30px;
  z-index: 38;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  transition: all 0.8s;
}
.transparence-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.30196);
  z-index: -1;
  top: 0;
}
.img-user.mx-auto {
  position: sticky;
  top: 0;
  z-index: -1;
}
.sticky-pos {
  position: sticky;
  top: 0;
  z-index: -1;
}
.absolute-boutton-mes-reservation {
  position: sticky !important;
  top: 0;
}
.marg-bott {
  margin-bottom: 205px;
}
.transparence-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000004d;
  z-index: -1;
}
</style>

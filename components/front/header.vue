<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      expand-on-hover
    >
      <v-list>
        <v-list-item-group v-model="listMenu">
          <v-list-item
            v-for="(item, i) in menu_users"
            :key="i"
            :to="item.name != 'Notifications' ? item.to : null"
            keep-alive
            router
            exact
            @click="show(item.name)"
          >
            <v-list-item-action>
              <img class="icon-menu" v-if="item.icon" :src="item.icon" alt="" />
              <img
                class="icon-menu placeholder placeholder-wave"
                v-else
                alt=""
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                <p class="text-primary mb-0 font14">
                  {{ item.name }}
                </p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="secondary"
      elevation="0"
      :clipped-left="clipped"
      fixed
      app
      class="header-top"
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
            icon
            @click.stop="
              (shownotification = false), (showmessage = !showmessage)
            "
          >
            <v-badge
              :color="countmessagenotsee > 0 ? 'success' : null"
              :content="countmessagenotsee > 0 ? countmessagenotsee : null"
              class="message-icon"
            >
              <img
                src="~/static/icons/default/message.svg"
                class="icons-header"
                alt=""
              />
            </v-badge>
          </v-btn>
          <v-btn icon @click.stop="toggleNotification()">
            <v-badge
              :color="unreadNotification > 0 ? 'success' : null"
              :content="unreadNotification"
              class="notification-icon"
            >
              <img
                src="~/static/icons/default/notification.svg"
                class="icons-header notification"
                alt=""
              />
            </v-badge>
          </v-btn>
          <v-menu
            bottom
            left
            min-width="182px"
            rounded
            offset-y
            content-class="pasfixt top-fixed-parametra"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon class="pb-1" v-on="on">
                <img
                  v-if="$auth.loggedIn"
                  class="img-user-sm"
                  :src="
                    $auth.user.user.profiluser
                      ? $auth.user.user.profiluser.picture
                      : '/icons/default/default.webp'
                  "
                  alt=""
                />
                <div class="enlign format-sm"></div>
              </v-btn>
            </template>
            <v-list-item-content class="justify-center py-1">
              <ul class="list-item-menu">
                <li
                  @click="viewProfile($auth.user.user.url)"
                  class="cursor-pointor mb-2 font12 text-white"
                >
                  <v-icon class="text-white"> mdi-account-outline </v-icon>
                  Mon profil
                </li>
                <li
                  @click="makesetting()"
                  class="cursor-pointor my-2 font12 text-white"
                >
                  <v-icon class="text-white"> mdi-cog-outline </v-icon>
                  Paramètres
                </li>
                <hr class="widthplusdesconnect my-0" />
                <li
                  @click="dialogdeeconnection = true"
                  class="cursor-pointor mt-2 font12 text-white"
                >
                  <v-icon class="text-white"> mdi-power </v-icon>
                  Déconnexion
                </li>
              </ul>
            </v-list-item-content>
          </v-menu>
          <v-dialog
            v-model="dialogdeeconnection"
            persistent
            width="418"
            overlay-color="#000"
            overlay-opacity="0.8"
          >
            <v-card>
              <div class="d-flex justify-center">
                <v-icon size="60" color="secondary">
                  mdi-logout-variant
                </v-icon>
              </div>
              <p class="my-4 text-center text-primary">
                Vous voulez vraiment vous déconnecter?
              </p>
              <v-card-actions class="justify-center">
                <v-btn
                  color="primary"
                  class="w90 text-white no-shadow font12 mx-1"
                  @click.prevent="logout()"
                >
                  Oui
                </v-btn>
                <v-btn
                  @click="dialogdeeconnection = false"
                  color="secondary"
                  class="w90 text-white no-shadow font12 mx-1"
                >
                  Non
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-tabs
          v-if="windowWidth <= 1263 && windowWidth > 0"
          class="menu-respo"
          :class="'petite-menu'"
          fixed-tabs
          v-model="listMenu"
        >
          <v-tab
            v-for="(item, i) in windowWidth < 760
              ? menu_users.slice(0, 10)
              : menu_users"
            :key="i"
            keep-alive
            :to="item.name != 'Notifications' ? item.to : null"
            @click="show(item.name)"
          >
            <img class="icon-menu" v-if="item.icon" :src="item.icon" alt="" />
            <img class="icon-menu placeholder-wave" v-else alt="" />
          </v-tab>
          <v-menu
            bottom
            left
            origin="center center"
            transition="scale-transition"
            class="px-0"
            min-width="175"
            v-if="menu_users.length > 10 && windowWidth < 760"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-tab @click="listMenu = null" v-bind="attrs" v-on="on">
                <img
                  class="icon-menu"
                  src="~/static/icons/menu/menu-hide-b.png"
                  alt=""
                />
              </v-tab>
            </template>

            <v-list-item-content class="justify-center py-1 bg-primary">
              <ul class="list-item-menu">
                <li
                  v-for="(item, index) in menu_users.slice(10, 15)"
                  :key="index"
                  class="cursor-pointor font12 text-white d-flex align-center"
                  @click="view(item.url)"
                >
                  <img class="icon-menu pr-2" :src="item.icon" alt="" />
                  {{ item.name }}
                </li>
              </ul>
            </v-list-item-content>
          </v-menu>
        </v-tabs>
      </div>
    </v-app-bar>
    <div
      :class="shownotification || showmessage ? 'Marge-right' : ''"
      class="float-discussion"
    >
      <FrontMessageDiscussionFloating />
    </div>
    <v-navigation-drawer
      v-model="showmessage"
      right
      temporary
      fixed
      clipped
      overlay-opacity="0"
      class="message-notification"
      width="350"
    >
      <FrontMessageListConversation />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="shownotification"
      right
      temporary
      fixed
      clipped
      overlay-opacity="0"
      class="message-notification"
      width="350"
    >
      <FrontNotificationList :notifications="notifications" />
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  props: ["menu_users", "unreadNotification"],
  data() {
    return {
      clipped: true,
      drawer: false,
      drawer1: true,
      drawerhover: false,
      fixed: false,
      dialogdeeconnection: false,
      listMenu: null,
      items: [
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
        {
          icon: null,
          name: null,
          to: null,
          click: null,
        },
      ],
      miniVariant: true,
      right: true,
      showmessage: false,
      shownotification: false,
      name: "R-23",
      countmessagenotsee: 0,
      windowWidth: 0,
      notifications: [],
      loadingDisconnect: false,
    };
  },
  mounted() {
    this.getNotification();
  },
  created() {
    if (process.client) {
      // this.$echo
      //   .private("users." + this.$auth.user.user.id)
      //   .notification((notification) => {
      //     if (
      //       notification.type === "App\\Notifications\\NotificationReservation"
      //     ) {
      //       this.$axios
      //         .get("api/user/notification/count/unread")
      //         .then((res) => {
      //           this.unreadNotification = res.data.count;
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //         });
      //       this.getNotification();
      //     }
      //   });
    }
  },
  methods: {
    view(e) {
      this.$router.push({
        name: e,
      });
    },
    show(e) {
      // let beat = new Audio('../sound/mixkit-cool-interface-click-tone-2568.wav');
      // console.log(beat);
      // beat.volume = 0.08;
      // beat.play();
      if (e === "Notifications") {
        this.shownotification = !this.shownotification;
      }
    },
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    makesetting() {
      this.$router.push({
        name: "setting",
      });
    },
    makeReadNotification() {
      this.$axios
        .post("api/user/read/notification", {
          user_id: this.$auth.user.user.id,
        })
        .then((res) => {
          this.getNotification();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleNotification() {
      this.showmessage = false;
      this.shownotification = !this.shownotification;
      if (this.shownotification) {
        this.makeReadNotification();
      }
    },
    getNotification() {
      this.$axios
        .get("api/user/notification")
        .then((res) => {
          this.$store.commit("notification/CHANGENOTIFICATION", res.data);
          this.notifications = this.$store.state.notification.notifications;
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
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
    async logout() {
      this.$emit("loadingDisconnect", true);
      this.$store.commit("default/changecover", null);
      this.$store.commit("default/changepicture", null);
      console.log("logout");
      this.$router.push({
        name: "index",
      });
      await this.$auth.logout().then(() => {
        if (!this.$auth.loggedIn) {
          this.$router.push({
            name: "index",
          });
        }
      });
    },
  },
  watch: {
    "$store.state.chat.countmessagenotsee": {
      handler(value) {
        this.countmessagenotsee = value;
      },
      deep: true,
      immediate: true,
    },
    "$store.state.default.windowWidth": {
      handler: function (size) {
        this.windowWidth = size;
        if (size >= 1264) {
          this.drawer = true;
        } else {
          this.drawer = false;
        }
      },
      deep: true,
      immediate: true,
    },
    shownotification: {
      handler(value) {
        if (value) {
          this.makeReadNotification();
        } else {
          this.listMenu = null;
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/header.scss";
.menu-respo {
  width: calc(100% + 32px);
  display: flex;
  justify-content: center;
  margin: 0 -16px;
  margin-bottom: -5px;
}
.menu-respo .v-item-group {
  width: 100%;
}
.menu-respo .v-slide-group__content {
  justify-content: center;
}
.menu-respo .v-list-item {
  min-height: 0 !important;
  height: 41px;
  display: flex;
  justify-content: center;
}
.menu-respo .v-list-item .v-list-item__action {
  margin: 0;
}
@media (max-width: 630px) {
  .petite-menu img.icon-menu {
    width: 20px;
    height: 20px;
  }
  .petite-menu .v-tab {
    padding: 0 10px;
  }
}
@media (max-width: 470px) {
  .petite-menu img.icon-menu {
    width: 18px;
    height: 18px;
  }
  .petite-menu .v-tab {
    padding: 0 7.5px;
  }
}
@media (max-width: 360px) {
  .petite-menu .v-tab {
    padding: 0 7px;
  }

  .petite-menu img.icon-menu {
    width: 15px;
    height: 15px;
  }
}
</style>

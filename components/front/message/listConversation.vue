<template>
  <div class="list-discussion">
    <transition name="fade">
      <div
        v-if="!focusInputSearch && (!search || search === '')"
        class="d-flex align-center justify-between action-tab mb-3 mx-3"
      >
        <div class="font14 text-primary">
          <v-btn
            @click="tab = 0"
            :color="tab === 0 ? 'secondary' : 'transparent'"
            class="font12 no-shadow w-100"
          >
            Discussion
            <v-avatar
              v-if="discussionnotseen > 0"
              color="success"
              size="18"
              class="ml-1"
            >
              <span class="white--text font10">{{ discussionnotseen }}</span>
            </v-avatar>
          </v-btn>
        </div>
        <div class="font14 text-primary">
          <v-btn
            @click="tab = 1"
            :color="tab === 1 ? 'secondary' : 'transparent'"
            class="font12 no-shadow w-100"
          >
            Invitation
            <v-avatar
              v-if="invitationnotseen > 0"
              color="success"
              size="18"
              class="ml-1"
            >
              <span class="white--text font10">{{ invitationnotseen }}</span>
            </v-avatar>
          </v-btn>
        </div>
        <div class="font14 text-primary">
          <v-btn
            @click="tab = 2"
            :color="tab === 2 ? 'secondary' : 'transparent'"
            class="font12 no-shadow w-100"
          >
            Contact
          </v-btn>
        </div>
      </div>
    </transition>
    <div class="mx-3 position-relative">
      <input
        v-model="search"
        placeholder="Rechercher..."
        class="pl-2 search w-100"
        @input="searchDiscussion()"
        @focus="focusInputSearch = true"
        @blur="focusInputSearch = false"
      />
      <v-progress-linear
        :active="loadingSearch"
        :indeterminate="loadingSearch"
        absolute
        bottom
        height="1"
        color="secondary"
        class="loading-filter"
      ></v-progress-linear>
    </div>
    <v-tabs-items
      v-if="!focusInputSearch && (!search || search === '')"
      v-model="tab"
    >
      <v-tab-item>
        <v-list v-if="items" two-line>
          <v-list-item-group
            v-if="items.length > 0"
            v-model="selected1"
            active-class="pink--text"
          >
            <div v-for="(item, index) in items" :key="'discussion' + index">
              <v-list-item @click="showconversation(item)">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img :src="item.avatar"></v-img>
                    <div
                      :class="
                        item.statusEnlign === 'online'
                          ? 'enlign'
                          : 'enlign deconnecte'
                      "
                    ></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.title"
                      class="font-bold"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12"
                      v-text="$dayjs(item.action).fromNow()"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="my-2">
                    <v-avatar
                      v-if="item.notseecount > 0"
                      class="mr-0.5"
                      color="success"
                      size="22"
                    >
                      <span class="font10 text-white">
                        {{ item.notseecount }}
                      </span>
                    </v-avatar>

                    <v-icon v-if="!active" color="primary">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>

                    <v-icon v-else color="primary">
                      mdi-dots-horizontal-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </div>
          </v-list-item-group>
          <div v-else class="vide-result d-flex align-center justify-center">
            <div>
              <v-icon color="dark" size="60" class="d-flex">
                mdi-chat-remove-outline
              </v-icon>
              <p class="text-primary font12 text-center">Aucune conversation</p>
            </div>
          </div>
        </v-list>
        <v-list v-else two-line>
          <v-list-item-group v-model="selected1" active-class="pink--text">
            <div v-for="(item, index) in 9" :key="index">
              <v-list-item>
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img class="placeholder"></v-img>
                    <div class="enlign"></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-bold placeholder"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12 placeholder"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      class="placeholder"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2 placeholder">
                    <v-icon color="primary"> </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider v-if="index < 9 - 1" :key="index"></v-divider>
            </div>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list v-if="allconversationInviting" two-line>
          <v-list-item-group
            v-if="allconversationInviting.length > 0"
            v-model="selected2"
            active-class="pink--text"
          >
            <div
              v-for="(item, index) in allconversationInviting"
              :key="'invitation' + index"
            >
              <v-list-item @click="showconversation(item)">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img :src="item.avatar"></v-img>
                    <div
                      :class="
                        item.statusEnlign === 'online'
                          ? 'enlign'
                          : 'enlign deconnecte'
                      "
                    ></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.title"
                      class="font-bold"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12"
                      v-text="$dayjs(item.action).fromNow()"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="my-2">
                    <v-avatar
                      v-if="item.notseecount > 0"
                      class="mr-0.5"
                      color="success"
                      size="22"
                    >
                      <span class="font10 text-white">
                        {{ item.notseecount }}
                      </span>
                    </v-avatar>

                    <v-icon v-if="!active" color="primary">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>

                    <v-icon v-else color="primary">
                      mdi-dots-horizontal-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < allconversationInviting.length - 1"
                :key="index"
              ></v-divider>
            </div>
          </v-list-item-group>
          <div v-else class="vide-result d-flex align-center justify-center">
            <div>
              <v-icon color="dark" size="60" class="d-flex">
                mdi-chat-plus-outline
              </v-icon>
              <p class="text-primary font12 text-center">
                Aucune invitation pour le moment
              </p>
            </div>
          </div>
        </v-list>
        <v-list v-else two-line>
          <v-list-item-group v-model="selected1" active-class="pink--text">
            <div v-for="(item, index) in 9" :key="index">
              <v-list-item>
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img class="placeholder"></v-img>
                    <div class="enlign"></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-bold placeholder"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12 placeholder"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      class="placeholder"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2 placeholder">
                    <v-icon color="primary"> </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider v-if="index < 9 - 1" :key="index"></v-divider>
            </div>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
      <v-tab-item>
        <v-list v-if="friends" two-line>
          <v-list-item-group
            v-if="friends.length > 0"
            v-model="selected3"
            active-class="pink--text"
          >
            <div v-for="(item, index) in friends" :key="'friends' + index">
              <v-list-item @click="showconversationcontact(item)">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img :src="item.profiluser.picture"></v-img>
                    <div
                      :class="
                        item.status === 'online'
                          ? 'enlign'
                          : 'enlign deconnecte'
                      "
                    ></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="
                        item.cooperative_name
                          ? item.cooperative_name
                          : item.lastname
                      "
                      class="font-bold"
                    ></v-list-item-title>

                    <!-- <v-list-item-subtitle
                      class="text-primary font12"
                      v-text="'En ligne y a 20min'"
                    ></v-list-item-subtitle> -->

                    <v-list-item-subtitle
                      v-text="item.friendcommun + ' ami(s) en commun(s)'"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="my-2">
                    <v-icon v-if="!active" color="primary">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>

                    <v-icon v-else color="primary">
                      mdi-dots-horizontal-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < friends.length - 1"
                :key="index"
              ></v-divider>
            </div>
          </v-list-item-group>
          <div v-else class="vide-result d-flex align-center justify-center">
            <div>
              <v-icon color="dark" size="60" class="d-flex">
                mdi-account-group
              </v-icon>
              <p class="text-primary font12 text-center">Aucun contact</p>
            </div>
          </div>
        </v-list>
        <v-list v-else two-line>
          <v-list-item-group v-model="selected1" active-class="pink--text">
            <div v-for="(item, index) in 9" :key="index">
              <v-list-item>
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img class="placeholder"></v-img>
                    <div class="enlign"></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      class="font-bold placeholder"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12 placeholder"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      class="placeholder"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2 placeholder">
                    <v-icon color="primary"> </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider v-if="index < 9 - 1" :key="index"></v-divider>
            </div>
          </v-list-item-group>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
    <v-tabs-items v-model="tab1" v-else>
      <v-tab-item>
        <v-list two-line>
          <v-list-item-group
            v-if="resultSearch.length > 0"
            active-class="pink--text"
          >
            <div v-for="(item, index) in resultSearch" :key="'friend' + index">
              <v-list-item @click="showconversation(item)">
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img :src="item.avatar"></v-img>
                    <div
                      :class="
                        item.statusEnlign === 'online'
                          ? 'enlign'
                          : 'enlign deconnecte'
                      "
                    ></div>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="item.title"
                      class="font-bold"
                    ></v-list-item-title>

                    <v-list-item-subtitle
                      class="text-primary font12"
                      v-text="$dayjs(item.action).fromNow()"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="my-2">
                    <v-avatar
                      v-if="item.notseecount > 0"
                      class="mr-0.5"
                      color="success"
                      size="22"
                    >
                      <span class="font10 text-white">
                        {{ item.notseecount }}
                      </span>
                    </v-avatar>

                    <v-icon v-if="!active" color="primary">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>

                    <v-icon v-else color="primary">
                      mdi-dots-horizontal-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </div>
          </v-list-item-group>
          <div v-else class="vide-result d-flex align-center justify-center">
            <div>
              <v-icon color="dark" size="60" class="d-flex">
                mdi-magnify-expand
              </v-icon>
              <p class="text-primary font12 text-center">Aucun resultat</p>
            </div>
          </div>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  data: () => ({
    selected1: [],
    selected2: [],
    selected3: [],
    focusInputSearch: false,
    tab: 0,
    items: null,
    allconversationInviting: null,
    friends: null,
    discussionnotseen: 0,
    invitationnotseen: 0,
    search: null,
    resultSearch: [],
    loadingSearch: false,
    tab1: 0,
    debounce: false,
  }),
  created() {
    if (process.client) {
      // this.$echo.private("message").listen(".chat-channel", (message) => {
      //   (this.selected1 = []),
      //     (this.selected2 = []),
      //     (this.selected3 = []),
      //     this.$fetch();
      // });
    }
  },
  methods: {
    nameTarget(element) {
      if (element.user_one) {
        if (element.user_one.cooperative_name) {
          return element.user_one.cooperative_name;
        } else {
          return element.user_one.name + " " + element.user_one.lastname;
        }
      } else {
        if (element.user_two.cooperative_name) {
          return element.user_two.cooperative_name;
        } else {
          return element.user_two.name + " " + element.user_two.lastname;
        }
      }
    },
    searchDiscussion() {
      this.loadingSearch = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$axios
          .get(
            `/api/messenger/search-conversation/${
              this.search && this.search !== "" ? this.search : "null"
            }`
          )
          .then((res) => {
            this.resultSearch = [];
            this.loadingSearch = false;
            res.data.allconversation.data.forEach((element) => {
              this.resultSearch.unshift({
                avatar: this.imageAvatar(element),
                action: element.last_message.created_at,
                statusEnlign: element.user_one
                  ? element.user_one.status
                  : element.user_two.status,

                subtitle:
                  element.last_message.type === "image"
                    ? "Un photo a été envoyer"
                    : element.last_message.message,
                title: this.nameTarget(element),
                id: element.user_one
                  ? element.user_one.id
                  : element.user_two.id,
                friendscount: element.user_one
                  ? element.user_one.friendscount
                  : element.user_two.friendscount,
                likecount: element.user_one
                  ? element.user_one.likecount
                  : element.user_two.likecount,
                notseecount: element.notseecount,
              });
            });
          })
          .catch((error) => {
            this.loadingSearch = false;
            console.log(error);
          });
      }, 2000);
    },
    showconversation(item) {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: item.id,
          name: item.title,
          img: item.avatar,
        },
      });
      this.seeMessage(item.id);
    },
    showconversationcontact(item) {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: item.id,
          name: item.cooperative_name ? item.cooperative_name : item.lastname,
          img: item.profiluser.picture,
        },
      });
      this.seeMessage(item.id);
    },
    seeMessage(e) {
      if (this.$auth.user.user.id != e) {
        this.$axios
          .post(`/api/messenger/ajax/make-seen`, {
            withId: e,
          })
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    },
    imageAvatar(element) {
      if (element.user_one) {
        if (element.user_one.profiluser) {
          return element.user_one.profiluser.picture;
        } else {
          return "/icons/default/admin.webp";
        }
      } else {
        if (element.user_two.profiluser) {
          return element.user_two.profiluser.picture;
        } else {
          return "/icons/default/admin.webp";
        }
      }
    },
  },
  async fetch() {
    const conversations = await this.$axios.get(
      "/api/messenger/all-Conversation"
    );
    if (conversations.data.allconversation.data) {
      this.items = [];
      conversations.data.allconversation.data.forEach((element) => {
        this.items.unshift({
          avatar: this.imageAvatar(element),
          action: element.last_message.created_at,
          statusEnlign: element.user_one
            ? element.user_one.status
            : element.user_two.status,
          subtitle:
            element.last_message.type === "image"
              ? "Un photo a été envoyer"
              : element.last_message.message,
          title: this.nameTarget(element),
          id: element.user_one ? element.user_one.id : element.user_two.id,
          friendscount: element.user_one
            ? element.user_one.friendscount
            : element.user_two.friendscount,
          likecount: element.user_one
            ? element.user_one.likecount
            : element.user_two.likecount,
          notseecount: element.notseecount,
        });
        this.discussionnotseen = this.discussionnotseen + element.notseecount;
        this.$store.commit(
          "chat/changecountmessagenotsee",
          element.notseecount
        );
      });
    }

    if (this.$auth.loggedIn) {
      const invitation = await this.$axios.get(
        "/api/messenger/all-Conversation-invitation"
      );
      if (invitation.data.allconversation.data) {
        this.allconversationInviting = [];
        invitation.data.allconversation.data.forEach((element) => {
          this.allconversationInviting.unshift({
            avatar: this.imageAvatar(element),
            action: element.last_message.created_at,
            statusEnlign: element.user_one
              ? element.user_one.status
              : element.user_two.status,
            subtitle:
              element.last_message.type === "image"
                ? "Un photo a été envoyer"
                : element.last_message.message,
            title: this.nameTarget(element),
            id: element.user_one ? element.user_one.id : element.user_two.id,
            friendscount: element.user_one
              ? element.user_one.friendscount
              : element.user_two.friendscount,
            likecount: element.user_one
              ? element.user_one.likecount
              : element.user_two.likecount,
            notseecount: element.notseecount,
          });
          this.invitationnotseen = this.invitationnotseen + element.notseecount;
          this.$store.commit(
            "chat/changecountmessagenotsee",
            element.notseecount
          );
        });
      }
      const friendsData = await this.$axios.get(
        `api/other-profil/${this.$auth.user.user.id}`
      );
      this.friends = friendsData.data.profile.friends;
    }
  },
};
</script>

<style scoped>
.list-discussion {
  padding: 20px 0px;
  box-shadow: 0px 0px 6px #9e9e9e7a;
  border-radius: 15px;
  background-color: #fff;
  height: 100%;
}
.img-user.rounded-0 {
  border-radius: 10px !important;
  overflow: visible;
}
.mr-0\.5 {
  margin-right: 1px;
}
.img-user .enlign {
  bottom: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
}
.action-tab {
  border: 1px #ff33543d solid;
  border-radius: 10px;
}
</style>

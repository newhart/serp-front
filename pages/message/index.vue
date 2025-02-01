<template>
  <div class="w-100">
    <div v-if="targetuser" class="d-flex">
      <div class="messagePage w-100">
        <FrontMessageItemConversationInPage
          :targetuser="targetuser.target_user"
        />
      </div>
    </div>
    <div v-else class="vide-message">
      <v-card class="card-default pa-3">
        <div class="d-flex align-center">
          <div
            @click="viewProfile()"
            class="cursor-pointor img-user position-relative mr-4"
          >
            <img
              :src="
                userAuth && userAuth.profiluser
                  ? userAuth.profiluser.picture
                  : '/icons/default/default.webp'
              "
              alt="profil-user"
            />
            <div class="enlign"></div>
          </div>
          <h1 class="text-primary">
            Avec R23, restez en contact avec votre entourage.
            <br />
            <span class="font-bold text-secondary limite1-lign">
              {{
                userAuth.cooperative_name
                  ? userAuth.cooperative_name
                  : userAuth.lastname + " " + userAuth.name
              }}
            </span>
          </h1>
        </div>
        <div class="mt-5">
          <p>Voici quelques actions rapides pour vous familiariser</p>
          <div class="d-flex align-center mt-3">
            <v-card class="mx-auto w-50 card-default mr-1" max-width="400">
              <v-img
                class="white--text align-end img-presentation"
                height="200px"
                src="/icons/default/friends.webp"
              >
                <v-card-title class="font-bold"
                  >Créer une nouvelle discussion</v-card-title
                >
                <div class="transparence-bg"></div>
              </v-img>

              <!-- <v-card-subtitle class="pb-0">
                20 amis de vous a été actif pour le moment
              </v-card-subtitle> -->

              <v-card-text class="text--primary">
                <p>Discutez sur cette plateforme.</p>
              </v-card-text>

              <v-card-actions>
                <v-dialog
                  v-model="dialogueDemmarreDiscussion"
                  width="400"
                  overlay-color="#000"
                  overlay-opacity="0.8"
                  content-class="pa-10"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="secondary"
                      class="max-w-100 font12 no-shadow"
                    >
                      <p class="w-100">
                        <span class="limite1-lign"> Démarrer maintenant </span>
                      </p>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-row class="justify-center">
                      <v-col class="pa-1" cols="12">
                        <p class="text-primary">Sélectionner un destinataire</p>
                        <v-autocomplete
                          v-model="modelfriends"
                          :disabled="isUpdating"
                          :items="people"
                          filled
                          chips
                          color="secondary"
                          item-text="name"
                          item-value="name"
                          class="input-global-autoload"
                          hide-details
                          return-object
                        >
                          <template v-slot:selection="data">
                            <v-chip
                              v-bind="data.attrs"
                              :input-value="data.selected"
                              close
                              @click="data.select"
                              @click:close="remove(data.item)"
                            >
                              <v-avatar left>
                                <v-img :src="data.item.avatar"></v-img>
                              </v-avatar>
                              {{ data.item.name }}
                            </v-chip>
                          </template>
                          <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                              <v-list-item-content
                                v-text="data.item"
                              ></v-list-item-content>
                            </template>
                            <template v-else>
                              <v-list-item-avatar>
                                <img :src="data.item.avatar" />
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title
                                  v-html="data.item.name"
                                ></v-list-item-title>
                                <v-list-item-subtitle
                                  v-html="data.item.group"
                                ></v-list-item-subtitle>
                              </v-list-item-content>
                            </template>
                          </template>
                        </v-autocomplete>
                      </v-col>
                      <v-col class="pa-1" cols="12">
                        <p class="text-primary">Message</p>
                        <textarea
                          class="input-global1 w-100"
                          type="text"
                          v-model="messageDemande"
                          required
                          placeholder="..."
                        ></textarea>
                      </v-col>
                      <v-col class="pa-1" cols="9">
                        <v-btn
                          @click="sendmessage()"
                          color="secondary"
                          class="font12 w-100"
                        >
                          Envoyer votre message
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
            <v-card class="mx-auto w-50 card-default ml-1" max-width="400">
              <v-img
                class="white--text align-end img-presentation"
                height="200px"
                src="/icons/default/admin.webp"
              >
                <v-card-title class="font-bold"
                  >Discuter avec l'admin</v-card-title
                >
                <div class="transparence-bg"></div>
              </v-img>

              <!-- <v-card-subtitle class="pb-0">
                L'administrateur est hors ligne pour le moment.
              </v-card-subtitle> -->

              <v-card-text class="text--primary">
                <p>Faites-nous part de vos nouvelles</p>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  @click="contacterAdmin()"
                  color="secondary"
                  class="max-w-100 font12 no-shadow"
                >
                  <p class="w-100">
                    <span class="limite1-lign"> Démarrer maintenant </span>
                  </p>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    titleTemplate:
      "R23 - N'hésitez pas à passer du temps à discuter avec les voyageurs",
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      targetuser: null,
      userAuth: this.$auth.user.user,

      autoUpdate: true,
      modelfriends: null,
      isUpdating: false,
      name: "Midnight Crew",
      people: [],
      title: "The summer breeze",
      messageDemande: "",
      debounce: false,
      dialogueDemmarreDiscussion: false,
    };
  },
  methods: {
    itemcollapse() {},
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    contacterAdmin() {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: 1,
          name: "Admin R23",
          img: "/icons/default/admin.webp",
        },
      });
    },
    viewProfile() {
      this.$router.push({
        name: "account",
        params: {
          index: this.$auth.user.user.url,
        },
      });
    },
    findFriend(value) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$axios
          .get("api/friends", {
            params: {
              search: value,
            },
          })
          .then((response) => {
            if (response.data) {
              response.data.forEach((element) => {
                this.people.push({
                  name: element.cooperative_name
                    ? element.cooperative_name
                    : element.name + " " + element.lastname,
                  group: element.usertype.name,
                  id: element.id,
                  avatar: element.profiluser
                    ? element.profiluser.picture
                    : "/icons/default/default.webp",
                });
              });
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }, 2000);
    },
    sendmessage() {
      if (this.messageDemande != "") {
        this.$axios
          .post(`/api/messenger/send`, {
            withId: this.modelfriends.id,
            message: this.messageDemande,
          })
          .then((res) => {
            dialogueDemmarreDiscussion: false;
            this.$store.commit("chat/changediscussioninPage", {
              user_id: this.$auth.user.user.id,
              target_user: {
                id: this.modelfriends.id,
                name: this.modelfriends.name,
                img: this.modelfriends.avatar,
                friendscount: "0",
                likecount: "0",
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  watch: {
    "$store.state.chat.discussioninPage": {
      handler(value) {
        console.log(value);
        this.targetuser = value;
      },
      deep: true,
      immediate: true,
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    modelfriends: {
      handler(value) {
        if (value) {
          this.findFriend(value);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.findFriend();
  },
};
</script>
<style lang="scss" scoped>
.img-user img {
  width: 95px;
  height: 95px;
  border-radius: 15px;
}
.img-user .enlign {
  right: -5px;
}
.transparence-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.30196);
  z-index: -1;
  top: 0;
  right: 0;
}
.close-dialogue {
  position: absolute;
  top: -13px;
  right: -25px;
}
@media (max-width: 768px) {
  h1 {
    font-size: 16px;
  }
  .img-user {
    width: 60px;
    height: 60px;
  }
  .img-user img {
    width: 60px;
    height: 60px;
    border-radius: 15px;
  }
}

@media (max-width: 500px) {
  .v-card__title {
    font-size: 15px;
  }
}
@media (max-width: 575px) {
  .v-image.img-presentation {
    height: 130px !important;
  }
  .vide-message .v-card__text.text--primary {
    padding: 10px;
  }
}
@media (max-width: 1400px) {
  .vide-message h1.text-primary {
    font-size: 22px;
  }
  .img-user img,
  .img-user {
    width: 65px !important;
    height: 65px !important;
    border-radius: 15px;
  }
}
@media (max-width: 670px) {
  .vide-message h1.text-primary {
    font-size: 14px;
  }
}
</style>

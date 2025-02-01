<template>
  <div class="py-3">
    <v-row class="ma-0 block-filtre my-4">
      <v-col
        @click="tab = 0"
        class="pa-2 d-flex cursor-pointor"
        :class="tab === 0 ? 'bg-secondary active' : ''"
        cols="4"
      >
        <v-icon class="mr-2" color="secondary"> mdi-account-group </v-icon>
        <p class="text-primary">Tous les amis</p>
      </v-col>
      <v-col
        :class="tab === 1 ? 'bg-secondary active' : ''"
        @click="tab = 1"
        class="pa-2 d-flex cursor-pointor"
        cols="4"
      >
        <v-icon class="mr-2" color="secondary">
          mdi-account-multiple-plus
        </v-icon>
        <p class="text-primary">Suggestion d'amis</p>
      </v-col>
      <v-col
        :class="tab === 2 ? 'bg-secondary active' : ''"
        @click="tab = 2"
        class="pa-2 d-flex cursor-pointor"
        cols="4"
      >
        <v-icon class="mr-2" color="secondary">
          mdi-account-multiple-check
        </v-icon>
        <p class="text-primary">Demande d'amis</p>
      </v-col>
    </v-row>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="card-default pa-3">
          <v-row class="list-vehicul ma-0">
            <v-col cols="12" class="pa-1 d-flex justify-between align-center">
              <p v-if="friends" class="text-primary font-bold">
                Vous avez
                <span class="text-secondary">{{ friendscount }}</span> amie(s)
              </p>
              <p v-else class="text-primary font-bold">Chargement...</p>
              <div class="position-relative">
                <input
                  class="input-global1 pa-2 w-250 search-in-friends"
                  type="text"
                  @input="handleSearchFriends($event)"
                  placeholder="Rechercher..."
                />
                <v-progress-linear
                  :active="loadingSearchFriends"
                  :indeterminate="loadingSearchFriends"
                  absolute
                  bottom
                  height="1"
                  color="secondary"
                  class="loading-filter"
                ></v-progress-linear>
              </div>
            </v-col>
            <hr class="border-primary w-plus" />
            <v-col
              cols="12"
              xl="3"
              lg="4"
              md="4"
              sm="6"
              xs="6"
              class="pa-1"
              v-for="(item, index) in friends ? friends : 6"
              :key="index"
            >
              <FrontDefaultUser :user="item" typeuser="amis" />
            </v-col>
            <v-col v-if="friends && friends.length === 0" class="pa-1">
              <div>
                <FrontDefaultNoresult />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <v-row class="list-vehicul ma-0">
            <v-col cols="12" class="pa-1 d-flex justify-between align-center">
              <p v-if="suggestions" class="text-primary font-bold">
                Vous avez
                <span class="text-secondary">plusieurs</span> suggestion d'amis
              </p>
              <p v-else class="text-primary font-bold">Chargement...</p>
              <div class="position-relative">
                <input
                  class="input-global1 pa-2 w-250 search-in-friends"
                  type="text"
                  @input="searchSuggestFriends($event)"
                  placeholder="Rechercher..."
                />
                <v-progress-linear
                  :active="loadingSearchSuggestFriends"
                  :indeterminate="loadingSearchSuggestFriends"
                  absolute
                  bottom
                  height="1"
                  color="secondary"
                  class="loading-filter"
                ></v-progress-linear>
              </div>
            </v-col>
            <hr class="border-primary w-plus" />
            <v-col
              cols="12"
              xl="3"
              lg="4"
              md="4"
              sm="6"
              xs="6"
              class="pa-1"
              v-for="(item, index) in suggestions ? suggestions : 6"
              :key="index"
            >
              <FrontDefaultUser :user="item" typeuser="suggestion" />
            </v-col>
            <v-col cols="12" class="pa-1">
              <infinite-loading
                v-if="suggestions && suggestions.length"
                spinner="bubbles"
                @infinite="infiniteScroll"
              >
                <div slot="no-results" class="text-secondary">
                  Il n'y a plus de résultat
                </div>
                <div slot="no-more" class="text-secondary">
                  Il n'y a plus de données
                </div>
              </infinite-loading>
            </v-col>
            <v-col v-if="suggestions && suggestions.length === 0" class="pa-1">
              <div>
                <FrontDefaultNoresult />
              </div>
            </v-col>
          </v-row>
          <!-- <div v-else>
            <FrontDefaultNoresult />
          </div> -->
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <v-row class="list-vehicul ma-0">
            <v-col cols="12" class="pa-1 d-flex justify-between align-center">
              <p v-if="requests" class="text-primary font-bold">
                Vous avez
                <span class="text-secondary">{{
                  requests ? requests.length : 0
                }}</span>
                demande(s) d'ami(s)
              </p>
              <p v-else class="text-primary font-bold">Chargement...</p>
              <div class="position-relative">
                <input
                  class="input-global1 pa-2 w-250 search-in-friends"
                  type="text"
                  @input="handleSearchRequestFriends($event)"
                  placeholder="Rechercher..."
                />
                <v-progress-linear
                  :active="loadingSearchRequestFriends"
                  :indeterminate="loadingSearchRequestFriends"
                  absolute
                  bottom
                  height="1"
                  color="secondary"
                  class="loading-filter"
                ></v-progress-linear>
              </div>
            </v-col>
            <hr class="border-primary w-plus" />
            <v-col
              cols="12"
              xl="3"
              lg="4"
              md="4"
              sm="6"
              xs="6"
              class="pa-1"
              v-for="(item, index) in requests ? requests : 6"
              :key="index"
            >
              <FrontDefaultUser :user="item" typeuser="demande" />
            </v-col>
            <v-col v-if="requests && requests.length === 0" class="pa-1">
              <div>
                <FrontDefaultNoresult />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  head: {
    titleTemplate: "R23 - Inviter un(e) ami(e)",
  },
  data() {
    return {
      tab: 0,
      friends: null,
      requests: null,
      suggestions: null,
      friendscount: 0,
      search: null,
      loadingSearchFriends: false,
      timer: null,
      loadingSearchRequestFriends: false,
      loadingSearchSuggestFriends: false,
      pagesuggestion: 1,
    };
  },
  methods: {
    infiniteScroll($state) {
      this.pagesuggestion++;
      this.$axios
        .get("api/sugger-friend", {
          params: {
            search: this.search,
            page: this.pagesuggestion,
          },
        })
        .then((res) => {
          if (res.data.request.data.length > 1) {
            res.data.request.data.forEach((element) => {
              this.suggestions.push(element);
            });
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchSuggestFriends(event) {
      this.loadingSearchSuggestFriends = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$axios
          .get("api/sugger-friend", {
            params: {
              search: event.target.value,
            },
          })
          .then((res) => {
            this.timer = null;
            this.loadingSearchSuggestFriends = false;
            this.suggestions = res.data.request.data;
          })
          .catch((error) => {
            console.log(error);
            this.loadingSearchSuggestFriends = false;
          });
      }, 800);
    },
    handleSearchFriends(event) {
      clearTimeout(this.timer);
      this.loadingSearchFriends = true;
      this.timer = setTimeout(() => {
        this.$axios
          .get(`api/searh-other-profil/${this.$auth.user.user.id}`, {
            params: {
              search: event.target.value,
            },
          })
          .then((res) => {
            this.timer = null;
            this.friends = res.data;
            this.loadingSearchFriends = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingSearchFriends = false;
          });
      }, 800);
    },
    handleSearchRequestFriends(event) {
      this.loadingSearchRequestFriends = true;
      clearTimeout(this.timer);
      if (!event.target.value) {
        this.$fetch();
        this.loadingSearchRequestFriends = false;
        return false;
      }
      this.timer = setTimeout(() => {
        this.$axios
          .get(`api/search-request-friend`, {
            params: {
              search: event.target.value,
            },
          })
          .then((res) => {
            this.loadingSearchRequestFriends = false;
            this.timer = null;
            this.requests = res.data;
          })
          .catch((error) => {
            console.log(error);
            this.loadingSearchRequestFriends = false;
          });
      }, 800);
    },
  },
  async fetch() {
    const friendsData = await this.$axios.get(
      `api/other-profil/${this.$auth.user.user.id}`
    );
    this.friends = friendsData.data.profile.friends;
    this.friendscount = friendsData.data.profile.friendscount;
    const friendData = await this.$axios.get("api/sugger-friend");
    this.suggestions = friendData.data.request.data;
    const requestsData = await this.$axios.get(`/api/request-friends`);
    this.requests = requestsData.data.request.pending_friends_from;
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/username.scss";
.ma-0.block-filtre {
  border: 1px #0321533b solid;
  margin-top: 7px !important;
}
.block-filtre {
  background-color: #ffffffd9;
  border-radius: 10px;
  padding: 5px;
}
.active {
  border-radius: 8px !important;
  .text-primary {
    color: #fff;
  }
}
hr.border-primary {
  border-bottom: 1px #03215324 solid;
  border-top: none;
}
.w-plus {
  width: calc(100% + 24px) !important;
  margin: 10px -12px;
}
@media (max-width: 740px) {
  .block-filtre .d-flex p {
    display: none;
  }
  .block-filtre .d-flex {
    justify-content: center;
  }
  .block-filtre .d-flex .mr-2 {
    margin-right: 0 !important;
  }
}
.loading-filter {
  bottom: 0px !important;
}
@media (max-width: 600px) {
  .row.ma-0.block-filtre.my-4 {
    margin-bottom: 0 !important;
  }
}
@media (max-width: 440px) {
  .search-in-friends {
    max-width: 155px;
  }
}
</style>

<template>
  <v-card class="mx-auto card-cust" max-width="434" height="170" tile>
    <v-img
      v-if="user && typeof user === 'object'"
      height="100%"
      class="card-cust"
      :src="
        user.profiluser && user.profiluser.cover
          ? user.profiluser.cover
          : '/icons/default/cover.webp'
      "
    >
      <v-row align="end" class="fill-height ma-0">
        <v-col align-self="start" class="pa-0 d-flex" cols="12">
          <v-avatar class="profile cursor-pointor" color="grey" size="100" tile>
            <v-img
              :src="
                user.profiluser && user.profiluser.picture
                  ? user.profiluser.picture
                  : '/icons/default/default.webp'
              "
              @click="viewProfile()"
            ></v-img>
          </v-avatar>
          <div @click="viewProfile()" class="details-info cursor-pointor pa-3">
            <p class="text-white font12 limite1-lign">{{ user.genre }}</p>
            <p class="text-white font12 limite1-lign">{{ user.adresse }}</p>
            <p
              v-if="user.displayPhoneNumber"
              class="text-white font12 limite1-lign"
            >
              {{ user.phone_number }}
            </p>
            <p class="text-white font12 limite1-lign">
              Inscrit(e) le :
              {{ $moment(user.created_at).format("D MMMM YYYY") }}
            </p>
            <!-- si c'est un chauffeur -->
            <!-- <p class="text-white font12">Véhicule: 2536TBS</p> -->
            <!-- end if -->
          </div>
        </v-col>
        <v-col cols="12" class="py-0 d-flex align-center justify-between">
          <v-list-item
            style="max-width: calc(100% - 80px)"
            color="rgba(0, 0, 0, .4)"
            class="pa-0"
            dark
          >
            <v-list-item-content
              @click="viewProfile()"
              class="cursor-pointor pt-0 pr-1"
            >
              <v-list-item-title class="text-h6">
                <span class="limite1-lign">{{
                  user.cooperative_name
                    ? user.cooperative_name
                    : user.lastname + " " + user.name
                }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class="limite1-lign">{{
                  user.usertype ? user.usertype.name : "admin"
                }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-btn
            :disabled="is_friend == null && i_pend == null && you_pend == null"
            :color="
              !is_friend
                ? 'primary'
                : i_pend && is_friend.status === 'pedding'
                ? 'dark'
                : you_pend && is_friend.status === 'pedding'
                ? 'primary'
                : 'secondary'
            "
            @click="
              !is_friend
                ? sendinvitation()
                : i_pend && is_friend.status === 'pedding'
                ? cancelinvitation()
                : you_pend && is_friend.status === 'pedding'
                ? confirminvitation()
                : null
            "
            rounded
            class="font12"
            :loading="loadingButton"
            v-if="user.id !== $auth.user.user.id"
          >
            {{
              !is_friend
                ? "Ajouter"
                : i_pend && is_friend.status === "pedding"
                ? "Annuler"
                : you_pend && is_friend.status === "pedding"
                ? "Confirmer"
                : "Amis"
            }}
          </v-btn>
        </v-col>
      </v-row>
      <div class="bg-semi-dark"></div>
    </v-img>
    <v-img v-else height="100%" class="card-cust placeholder-wave">
      <v-row align="end" class="fill-height ma-0">
        <v-col align-self="start" class="pa-0 d-flex" cols="12">
          <v-avatar class="profile placeholder" color="grey" size="100" tile>
            <v-img></v-img>
          </v-avatar>
          <div class="details-info pa-3">
            <p class="text-white font12 placeholder"></p>
            <p class="text-white font12 placeholder"></p>
            <p class="text-white font12 placeholder"></p>
            <p class="text-white font12 placeholder"></p>
            <!-- si c'est un chauffeur -->
            <!-- <p class="text-white font12">Véhicule: 2536TBS</p> -->
            <!-- end if -->
          </div>
        </v-col>
        <v-col cols="12" class="py-0 d-flex align-center justify-between">
          <v-list-item color="rgba(0, 0, 0, .4)" class="pa-0 pr-3" dark>
            <v-list-item-content>
              <v-list-item-title class="text-h6 placeholder">
              </v-list-item-title>
              <v-list-item-subtitle class="placeholder"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-btn
            :color="
              typeuser === 'amis'
                ? 'secondary'
                : typeuser === 'demande'
                ? 'primary'
                : typeuser === 'suggestion'
                ? 'primary'
                : 'primary'
            "
            class="font12"
          >
          </v-btn>
        </v-col>
      </v-row>
      <div class="bg-semi-dark"></div>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: ["typeuser", "user"],
  data() {
    return {
      is_friend: null,
      i_pend: null,
      you_pend: null,
      loadingButton: false,
    };
  },
  methods: {
    viewProfile() {
      this.$router.push({
        name: "account",
        params: {
          index: this.user.url,
        },
      });
    },
    confirminvitation() {
      this.loadingButton = true;
      this.$axios
        .post("/api/accept-request", { target_id: this.user.id })
        .then((res) => {
          if (res.data.success) {
            this.is_friend = true;
            this.you_pend = undefined;
            this.loadingButton = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadingButton = false;
        });
    },
    sendinvitation() {
      this.loadingButton = true;
      this.$axios
        .post(`/api/send-request`, {
          target_id: this.user.id,
        })
        .then((res) => {
          if (res.data.envoye) {
            this.i_pend = true;
            this.is_friend = {
              status: "pedding",
            };
            this.loadingButton = false;
          }
          if (res.data.annulation) {
            this.i_pend = undefined;
            this.is_friend = false;
            this.loadingButton = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadingButton = false;
        });
    },
    cancelinvitation() {
      this.sendinvitation();
    },
    retirefriend() {
      this.$axios
        .post(`/api/retire-friend`, {
          target_id: this.user.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.is_friend = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getaction() {
      this.$axios
        .get(`api/other-profil/${this.user.id}`)
        .then((res) => {
          this.is_friend = res.data.is_friend;
          this.i_pend = res.data.i_pend;
          this.you_pend = res.data.you_pend;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    user: {
      handler(value) {
        if (value && typeof this.user == "object") {
          this.getaction();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-cust {
  border-radius: 5px !important;
}
.v-avatar.profile.rounded-0 {
  top: 6px !important;
  left: 6px !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 20px !important;
}
@media (max-width: 767px) {
  .v-avatar.profile {
    width: 75px !important;
    height: 75px !important;
    min-width: 75px !important;
  }
  .mx-auto.card-cust {
    height: 140px !important;
  }
  .v-list-item__title.text-h6 {
    font-size: 15px !important;
  }
}
</style>

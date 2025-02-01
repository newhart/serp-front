<template>
  <v-card class="pa-2 item-contact-enlign my-1">
    <div class="d-flex justify-between">
      <v-img
        :lazy-src="user.profil.picture"
        :src="user.profil.picture"
        class="img-user-connecter cursor-pointor"
        @click="viewProfile()"
      >
      </v-img>
      <div class="details d-flex justify-between direction-column w-100">
        <div @click="viewProfile()" class="cursor-pointor">
          <p class="text-primary font12 limite1-lign">
            {{ user.cooperative_name ? user.cooperative_name : user.lastname }}
            <span class="text-secondary">{{
              user.cooperative_name ? "" : user.name
            }}</span>
          </p>
          <p class="font12 limite2-lign">
            {{ user.friendcommun }} ami(s) en commun(s)
          </p>
        </div>
        <div class="d-flex align-center justify-between">
          <p class="font12 limite1-lign"></p>
          <v-btn
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
                ? sendinvitation()
                : you_pend && is_friend.status === 'pedding'
                ? confirminvitation()
                : null
            "
            rounded
            :loading="loadInvitation"
            class="font12"
            :disabled="loadAction"
          >
            {{
              loadAction
                ? "..."
                : !is_friend
                ? "Ajouter"
                : i_pend && is_friend.status === "pedding"
                ? "Annuler"
                : you_pend && is_friend.status === "pedding"
                ? "Confirmer"
                : "Amis"
            }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      i_pend: null,
      you_pend: null,
      is_friend: null,
      loadInvitation: false,
      loadAction: false,
    };
  },
  methods: {
    getaction() {
      this.loadAction = true;
      this.$axios
        .get(`api/other-profil/${this.user.id}`)
        .then((res) => {
          this.is_friend = res.data.is_friend;
          this.i_pend = res.data.i_pend;
          this.you_pend = res.data.you_pend;
          this.loadAction = false;
        })
        .catch((error) => {
          this.loadAction = false;
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
    sendinvitation() {
      this.loadInvitation = true;
      this.$axios
        .post(`/api/send-request`, {
          target_id: this.user.id,
        })
        .then((res) => {
          if (res.data.envoye) {
            this.loadInvitation = false;
            this.i_pend = true;
            this.is_friend = {
              status: "pedding",
            };
          }
          if (res.data.annulation) {
            this.loadInvitation = false;
            this.i_pend = undefined;
            this.is_friend = false;
          }
        })
        .catch((error) => {
          this.loadInvitation = false;
          console.log(error);
        });
    },
    confirminvitation() {
      this.loadInvitation = true;
      this.$axios
        .post("/api/accept-request", { target_id: this.user.id })
        .then((res) => {
          if (res.data.success) {
            this.loadInvitation = false;
            this.is_friend = true;
            this.you_pend = undefined;
          }
        })
        .catch((error) => {
          this.loadInvitation = false;
          console.log(error);
        });
    },
  },
  mounted() {
    this.getaction();
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/suggestionamis.scss";
</style>

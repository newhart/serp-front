<template>
  <div v-if="onlineUser.length > 0" class="py-2">
    <div class="d-flex align-center justify-between">
      <p class="text-primary font-bold">CONTACTS EN LIGNE</p>
      <!-- <p class="text-success">Afficher tout</p> -->
    </div>
    <div class="ma-0">
      <v-card
        v-for="(user, index) in onlineUser"
        :key="index"
        class="pa-2 item-contact-enlign my-1"
        :to="{
          name: 'account',
          params: {
            index: user.url,
          },
        }"
      >
        <div class="d-flex justify-between">
          <v-img
            :lazy-src="user?.profil?.picture"
            :src="user?.profil?.picture"
            class="img-user-connecter"
          >
          </v-img>
          <div class="details d-flex justify-between direction-column w-100">
            <p class="text-primary font12 limite1-lign">
              {{
                user.cooperative_name
                  ? user.cooperative_name
                  : user.lastname + " " + user.name
              }}
            </p>
            <p class="font12">{{ user.friendcommun }} ami(s) en commun</p>
          </div>
          <div class="d-flex justify-center direction-column">
            <div class="enlign position-relative"></div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  props: ["onlineUser"],
};
</script>
<style lang="scss" scoped>
@import "~/assets/contactenlign.scss";
.enlign {
  width: 13px;
  height: 13px;
  background-color: #3f8d0c;
  border-radius: 50%;
  border: 1px #fff solid;
}
</style>

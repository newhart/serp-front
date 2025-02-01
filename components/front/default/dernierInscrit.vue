<template>
  <div class="py-2">
    <div class="d-flex align-center justify-between">
      <p class="text-primary font-bold">DERNIERS INSCRITS</p>
      <!-- <p class="text-success">Afficher tout</p> -->
    </div>
    <v-row v-if="users" class="ma-0">
      <v-menu
        v-for="(user, index) in users"
        :key="index"
        open-on-hover
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-col
            @click="viewProfile(user.url)"
            v-bind="attrs"
            v-on="on"
            cols="3"
            class="pa-1 cursor-pointor"
          >
            <div class="position-relative">
              <v-img
                :lazy-src="
                  user.profil
                    ? user.profil.picture
                    : '/icons/default/default.webp'
                "
                :src="
                  user.profil
                    ? user.profil.picture
                    : '/icons/default/default.webp'
                "
                class="img-user"
              >
              </v-img>
              <div
                :class="
                  user.status === 'online' ? 'enlign' : 'enlign deconnecte'
                "
              ></div>
            </div>
            <p class="text-center text-primary font12 limite1-lign">
              {{
                user.cooperative_name
                  ? user.cooperative_name
                  : user.lastname + " " + user.name
              }}
            </p>
          </v-col>
        </template>
        <!-- <FrontDefaultUser :user="user" /> -->
      </v-menu>
    </v-row>
    <v-row v-else class="ma-0">
      <v-col v-for="(item, index) in 6" :key="index" cols="3" class="pa-1">
        <div class="position-relative">
          <v-img class="img-user placeholder"> </v-img>
          <div class="enlign"></div>
        </div>
        <p class="text-center text-primary font12 limite1-lign placeholder"></p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["users"],
  data: () => ({}),
  methods: {
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/dernierinscrit.scss";
</style>

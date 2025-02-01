<template>
  <v-col cols="12" class="py-2 px-0">
    <v-card class="pa-1 d-flex card-flexable-res-1">
      <v-img
        :lazy-src="item.user.vehiculs[0].image"
        :src="item.user.vehiculs[0].image"
        class="img-vehicule-cooperative"
      >
        <div class="position-relative h-100">
          <img
            :src="item.image ? item.image : '~/static/icons/default/vip.webp'"
            class="img-logo-cooperative"
          />
          <!-- <div class="enlign"></div> -->
        </div>
      </v-img>
      <div class="details d-flex direction-column justify-between w-100 mx-4">
        <div>
          <div class="block-itm d-flex justify-between py-2">
            <div>
              <h3 class="text-secondary font-bold">
                {{ item.parent.name }} - {{ item.name }}
              </h3>
              <p class="text-primary font12">
                {{ item.user.cooperative_name }}
              </p>
            </div>
            <div class="position-relative">
              <img
                :src="item.user.profiluser.picture"
                @click="viewProfile(item.user.url)"
                class="img-logo-cooperative-1 cursor-pointor"
              />
              <div class="enlign"></div>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm d-flex py-2">
            <div class="w-65 d-flex align-start">
              <img
                class="mr-2 pt-1"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary font12">
                {{ item.user.adress }}
              </p>
            </div>
            <div class="position-relative">
              <p class="text-primary font12">
                Inscrit le<span class="text-secondary font14 pl-1">{{
                  $moment(item.user.created_at).format("D MMMM YYYY")
                }}</span>
              </p>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm py-2">
            <div class="w-65 d-flex align-center">
              <v-btn class="font12 no-shadow min-w-0 px-2" color="secondary">
                {{ item.user.vehiculs.length }}
              </v-btn>
              <p class="text-primary font12 pl-2">Voitures disponibles</p>
            </div>
            <div class="list-itineraire my-1">
              <div
                v-for="(destination, i) in item.destination_types"
                :key="i * 4"
              >
                <div
                  v-for="(itineraire, index) in destination.intineraires"
                  :key="index"
                  class="item-itineraire d-flex py-1"
                >
                  <p class="font12 text-primary font-bold w-65">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-arrow-right-thin
                    </v-icon>
                    {{ itineraire.departure }} - {{ itineraire.arrival }} :
                  </p>
                  <p class="font12 text-primary font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ itineraire.price.toLocaleString() }} Ar/pers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="d-flex align-center justify-between pb-4 flex-boutton-bottom1"
        >
          <div class="d-flex align-center flex-vue-accueil">
            <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary font12 limite1-lign">
                <span class="text-secondary">{{ item.user.friendscount }}</span>
                contact(s)
              </p>
            </div>
            <!-- <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary font12  limite1-lign">
                <span class="text-secondary">25</span> vues
              </p>
            </div> -->
            <div class="d-flex align-center pr-6">
              <img class="pr-2" src="~/static/icons/default/user.svg" alt="" />
              <p class="text-primary font12 limite1-lign">
                <span class="text-secondary">{{ item.user.friendcommun }}</span>
                ami(s) en commun
              </p>
            </div>
          </div>
          <v-btn
            :to="{
              name: 'find-place-namecooperative',
              params: {
                namecooperative: item.id,
              },
            }"
            color="secondary"
            class="font12"
          >
            Trouvez votre place
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    contacter() {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: this.item.ower.id,
          name: this.item.ower.cooperative_name
            ? this.item.ower.cooperative_name
            : this.item.ower.lastname,
          img: this.item.ower.profiluser
            ? this.item.ower.profiluser.picture
            : "~/static/icons/default/default.webp",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/itemcooperative.scss";
</style>

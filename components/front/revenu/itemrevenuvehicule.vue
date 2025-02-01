<template>
  <div>
    <div v-if="revenu" class="d-flex justify-between w-100 item-cadrechoise">
      <v-img
        :lazy-src="revenu.vehicul.image"
        :src="revenu.vehicul.image"
        class="img-vehicule-cooperative"
      >
        <div class="position-relative h-100" v-if="revenu.vehicul.chauffeur">
          <img
            :src="revenu.vehicul.chauffeur.profiluser.picture"
            class="img-logo-cooperative"
          />
          <div
            :class="
              revenu.vehicul.chauffeur.status === 'online'
                ? 'enlign deconnecte'
                : ''
            "
          ></div>
        </div>
      </v-img>
      <div
        class="details d-flex justify-between direction-column w-100 ml-4 mr-2"
      >
        <div>
          <p class="text-primary mb-2 font-bold">
            {{ revenu.vehicul.type }}
            <span class="text-secondary">
              - {{ revenu.vehicul.categorie.name }}</span
            >
          </p>
          <div class="ma-0 pa-0 list-itineraire">
            <p class="text-primary limite1-lign">
              {{
                revenu.vehicul.owner
                  ? revenu.vehicul.owner.lastname
                  : revenu.vehicul.user.lastname
              }}
              {{
                revenu.vehicul.owner
                  ? revenu.vehicul.owner.name
                  : revenu.vehicul.user.name
              }}
            </p>
            <p class="text-primary">
              Destination: {{ revenu.vehicul.gamme.name }}
            </p>
          </div>
        </div>
        <div class="d-flex align-center justify-between">
          <p class="text-secondary limite1-lign">
            {{ revenu.vehicul.vehicule_number }}
            <span class="text-primary">
              |
              <span class="text-secondary">{{
                revenu.vehicul.place_number
              }}</span>
              places</span
            >
          </p>
          <div class="d-flex align-center proprietaire">
            <v-btn color="secondary" class="font12 mb-1 mr-3 no-shadow">
              {{ revenu.total_price }} Ar
            </v-btn>
            <div class="position-relative h-100">
              <img
                :src="
                  revenu.vehicul.owner
                    ? revenu.vehicul.owner.profiluser.picture
                    : revenu.vehicul.user.profiluser.picture
                "
                class="img-logo-cooperative"
              />
              <div
                :class="
                  revenu.vehicul.owner.status === 'online'
                    ? 'enlign'
                    : 'enlign deconnecte'
                "
                v-if="revenu.vehicul.owner"
              ></div>
              <div
                :class="
                  revenu.vehicul.user.status === 'online'
                    ? 'enlign'
                    : 'enlign deconnecte'
                "
                v-else
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="d-flex justify-between w-100 item-cadrechoise placeholder-wave"
    >
      <v-img class="placeholder img-vehicule-cooperative"> </v-img>
      <div
        class="details d-flex justify-between direction-column w-100 ml-4 mr-2"
      >
        <div>
          <p class="text-primary mb-2 font-bold placeholder"></p>
          <div class="ma-0 pa-0 list-itineraire">
            <p class="text-primary limite1-lign placeholder mr-2"></p>
            <p class="text-primary placeholder"></p>
          </div>
        </div>
        <div class="d-flex align-center justify-between">
          <p class="text-secondary limite1-lign placeholder"></p>
          <div class="d-flex align-center proprietaire">
            <v-btn
              color="secondary"
              class="font12 mb-1 mr-3 no-shadow placeholder"
            >
            </v-btn>
            <div class="position-relative h-100">
              <img class="img-logo-cooperative placeholder" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["revenu"],
  data() {
    return {
      radios: null,
    };
  },

  methods: {
    addPlace(e, index) {
      if (index > -1) {
        this.arrayplace = this.arrayplace.map((item) => {
          if (item && item.numero === e && item.statusPlace === "libre") {
            return {
              numero: e,
              statusPlace: "MyPlace",
            };
          }
          if (item && item.numero === e && item.statusPlace === "MyPlace") {
            return {
              numero: e,
              statusPlace: "libre",
            };
          }
          return item;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/choicecadre.scss";
.img-vehicule-cooperative {
  width: 110px;
  max-width: 110px;
  height: 110px;
}
.item-cadrechoise {
  padding: 10px;
  border-bottom: none;
  box-shadow: 2px 3px 6px rgb(150 150 150 / 34%) !important;
  border-radius: 15px;
}
@media (max-width: 1459px) and (min-width: 1264px) {
  .img-vehicule-cooperative {
    width: 70px;
    max-width: 70px;
    height: 70px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 20px !important;
  }
}
@media (max-width: 600px) {
  .item-cadrechoise {
    margin: 0 !important;
  }
  .v-application .details.ml-4.mr-2 {
    margin-left: 0 !important;
    padding: 10px 10px 0;
  }
}
</style>

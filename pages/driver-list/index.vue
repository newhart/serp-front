<template>
  <div class="py-3">
    <v-card class="card-default pa-3">
      <v-row class="list-vehicul ma-0">
        <v-col cols="12" class="pa-1 d-flex justify-between align-center">
          <p v-if="drivers" class="text-primary font-bold">
            Vous avez
            <span class="text-secondary">{{ drivers.length }}</span>
            chauffeur(s) disponible(s)
          </p>
          <p v-else class="text-primary font-bold">Chargement...</p>
          <input
            class="input-global1 pa-2 w-250 search-in-friends"
            type="text"
            @input="findDriverFriend($event)"
            placeholder="Rechercher..."
          />
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
          v-for="(item, index) in drivers ? drivers : 8"
          :key="index"
        >
          <FrontDefaultUser :user="item" typeuser="amis" />
        </v-col>
        <v-col v-if="drivers && drivers.length === 0" class="pa-1">
          <div>
            <FrontDefaultNoresult />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  head: {
    titleTemplate: "R23 - Liste des chauffeurs",
  },
  data() {
    return {
      drivers: null,
      debounce: false,
    };
  },
  async fetch() {
    const driver = await this.$axios.get("api/driver-friend");
    this.drivers = driver.data;
  },
  methods: {
    findDriverFriend(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$axios
          .get("api/driver-friend", {
            params: {
              search: event.target.value,
            },
          })
          .then((response) => {
            if (response.data) {
              this.drivers = response.data;
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }, 2000);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/username.scss";
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

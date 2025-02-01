<template>
  <div>
    <div class="py-2">
      <v-card v-if="myGroups" class="card-default pa-3">
        <div class="d-flex align-center justify-between">
          <p class="text-primary font-bold">
            Un endroit pour interagir avec votre communauté.
          </p>
        </div>
        <v-row v-if="myGroups.length > 0" class="ma-0">
          <v-col
            v-for="(item, index) in myGroups"
            :key="index"
            cols="6"
            xl="3"
            lg="3"
            md="3"
            sm="4"
            class="pa-1"
          >
            <FrontGroupsItem :index="index" :item="item" />
          </v-col>
        </v-row>
        <div class="no-pub" v-else>
          <v-icon color="secondary" size="60"> mdi-newspaper-remove </v-icon>
          <p class="mt-2">Aucune groupe disponible pour le moment.</p>
        </div>
      </v-card>
      <v-card v-else class="card-default pa-3">
        <div class="d-flex align-center justify-between">
          <p class="text-primary font-bold">Chargement...</p>
        </div>
        <div class="item-publication card">
          <div class="load-pub">
            <v-progress-circular
              :width="3"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myGroups: null,
    };
  },
  async fetch() {
    const myGroups = await this.$axios.get("api/groups/get-all");
    this.myGroups = myGroups.data.data;
  },
};
</script>

<style scoped>
.card-default {
  min-height: 500px !important;
}
</style>

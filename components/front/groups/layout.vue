<template>
  <div>
    <v-btn
      color="primary"
      width="100%"
      height="45"
      class="my-2"
      rounded
      @click="create()"
    >
      Créer un groupe
    </v-btn>
    <div v-if="publicity === false" class="py-2">
      <img width="100%" height="400" class="pub-img placeholder-wave" alt="" />
    </div>
    <div v-else-if="publicity !== null" class="py-2">
      <a target="_blank" :href="publicity.title">
        <img
          width="100%"
          height="400"
          class="pub-img"
          :src="publicity.image"
          alt=""
      /></a>
    </div>
    <div class="py-2" v-if="suggestGroup.length > 0">
      <div class="d-flex align-center justify-between">
        <p class="text-primary font-bold text-uppercase">
          Groupes qui pourraient vous intéresser.
        </p>
      </div>
      <v-row class="ma-0">
        <v-col
          v-for="(item, index) in suggestGroup"
          :key="index"
          cols="12"
          class="pa-1"
        >
          <FrontGroupsItem1
            :index="index"
            :item="item"
            @handelAcced="handelAcced"
          />
        </v-col>
      </v-row>
    </div>
    <!-- to="/groups/create" -->
    <div class="py-2" v-if="popularGroup.length > 0">
      <div class="d-flex align-center justify-between">
        <p class="text-primary font-bold">POPULAIRES AUTOUR DE VOUS</p>
      </div>
      <v-row class="ma-0">
        <v-col
          v-for="(item, index) in popularGroup"
          :key="index"
          cols="6"
          class="pa-1"
        >
          <FrontGroupsItem
            :index="index"
            :item="item"
            @handelAcced="handelAcced"
          />
        </v-col>
      </v-row>
    </div>
    <div class="py-2" v-if="myGroups.length > 0">
      <div class="d-flex align-center justify-between">
        <p class="text-primary font-bold">GROUPES QUE VOUS GEREZ</p>
      </div>
      <v-row class="ma-0">
        <v-col
          v-for="(item, index) in myGroups"
          :key="index"
          cols="12"
          class="pa-1"
        >
          <FrontGroupsItem1
            status="members"
            :index="index"
            :item="item"
            @handelVisited="handelVisited"
          />
        </v-col>
      </v-row>
    </div>
    <div class="py-2" v-if="iAmInGroup.length > 0">
      <div class="d-flex align-center justify-between">
        <p class="text-primary font-bold">GROUPES DONT VOUS ETES MEMBRES</p>
      </div>
      <v-row class="ma-0">
        <v-col
          v-for="(item, index) in iAmInGroup"
          :key="index"
          cols="12"
          class="pa-1"
        >
          <FrontGroupsItem1 status="members" :index="index" :item="item" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["myGroups", "iAmInGroup", "popularGroup", "suggestGroup"],
  data() {
    return {
      imagePub: false,
      urlPub: null,
      publicity: false,
    };
  },
  methods: {
    create() {
      this.$router.push({
        name: "groups-create",
      });
    },
    handelAcced(item) {
      this.$emit("handelAcced", item);
    },
    handelVisited(item) {
      this.$emit("handelVisited", item);
    },
    getNewPub() {
      this.$axios
        .get("/api/publicity/random/" + 4)
        .then((res) => {
          this.publicity = res.data.publicity;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getNewPub();
  },
};
</script>

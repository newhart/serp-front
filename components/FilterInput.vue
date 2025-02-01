<template>
  <v-row class="ma-0 block-filtre">
    <v-col
      class="pa-2 d-flex align-center cursor-pointor"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      sm="6"
      xs="6"
    >
      <v-icon color="secondary" class="mr-2"> mdi-timeline-clock </v-icon>
      <vue-select
        :options="allDestination"
        autocomplete="on"
        @input="handelChangeDestination($event, 'arrival')"
        placeholder="Départ"
        label="name"
        class="w-100"
        hide-details
      >
        <template #no-options="{ search, searching, loading }">
          Aucun résultat
        </template>
      </vue-select>
    </v-col>
    <v-col
      class="pa-2 d-flex align-center cursor-pointor"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      sm="6"
      xs="6"
    >
      <v-icon color="secondary" class="mr-2"> mdi-timeline-clock </v-icon>
      <vue-select
        :options="allArrival"
        @input="handelChangeDestination($event, 'departure')"
        placeholder="Arrivée"
        label="name"
        class="w-100"
        hide-details
      >
        <template #no-options="{ search, searching, loading }">
          Aucun résultat
        </template>
      </vue-select>
    </v-col>
    <v-col
      class="pa-2 d-flex align-center cursor-pointor"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      sm="6"
      xs="6"
    >
      <v-icon color="secondary" class="mr-2"> mdi-car-seat-cooler </v-icon>
      <vue-select
        :options="cooperativeOption"
        v-model="cooperaviteModel"
        :item-text="type === 'reservation' ? 'cooperative_name' : 'name'"
        :label="type === 'reservation' ? 'cooperative_name' : 'name'"
        :placeholder="
          type === 'reservation' ? 'Coopérative' : 'Gamme de voiture'
        "
        class="w-100 text-primary"
        @input="handelChangeCooperative($event)"
        hide-details
      >
        <template #no-options="{ search, searching, loading }">
          Aucun résultat
        </template>
      </vue-select>
    </v-col>
    <v-col
      class="pa-2 d-flex align-center cursor-pointor"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      sm="6"
      xs="6"
      v-if="type !== 'vehiculs'"
    >
      <v-icon color="secondary" class="mr-2"> mdi-clipboard-text-clock </v-icon>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        transition="scale-transition"
        offset-y
        min-width="auto"
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="type === 'tours' ? 'Du' : 'Date de départ'"
            readonly
            clearable
            outlined
            class="input-global2 choisedate"
            v-bind="attrs"
            v-on="on"
            solo
            hide-details
          ></v-text-field>
        </template>
        <v-row justify="center">
          <v-date-picker
            v-model="date"
            :max="'2052-01-01'"
            :min="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            @change="save"
          ></v-date-picker>
        </v-row>
      </v-menu>
    </v-col>
    <v-progress-linear
      :active="loadingfilter"
      :indeterminate="loadingfilter"
      absolute
      bottom
      height="1"
      color="secondary"
      class="loading-filter"
    ></v-progress-linear>
  </v-row>
</template>

<script>
export default {
  props: [
    "allDestination",
    "cooperativeOption",
    "allArrival",
    "type",
    "loadingfilter",
  ],
  data() {
    return {
      menu: false,
      date: null,
      cooperaviteModel: null,
    };
  },
  watch: {
    date: {
      handler(value) {
        this.save(value);
      },
    },
  },
  methods: {
    handelChangeDestination(event, type) {
      this.$emit("handelChangeDestination", event, type);
    },
    handelChangeCooperative(event) {
      this.$emit("handelChangeCooperative", event);
    },
    // change the date
    save(date) {
      this.$store.commit("date/changedepart", date);
      this.$refs.menu.save(date);
      this.$emit("save", date);
    },
  },
  async mounted() {
    if (
      this.$auth.user.user.user_type_id === 1 &&
      this.type === "reservation"
    ) {
      this.cooperaviteModel = this.$auth.user.user;
    }
  },
};
</script>

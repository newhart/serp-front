<template>
  <div class="py-3">
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
        <v-icon color="secondary" class="mr-2">
          mdi-calendar-month-outline
        </v-icon>
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          min-width="auto"
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter_date_launch"
              readonly
              clearable
              label="Du"
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
              v-model="filter_date_launch"
              @change="changeDate($event)"
            ></v-date-picker>
          </v-row>
        </v-menu>
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
        <v-icon color="secondary" class="mr-2">
          mdi-calendar-month-outline
        </v-icon>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          min-width="auto"
          bottom
          left
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="filter_date_end"
              readonly
              clearable
              label="Au"
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
              v-model="filter_date_end"
              @change="changeDate($event)"
            ></v-date-picker>
          </v-row>
        </v-menu>
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
        <v-icon color="secondary" class="mr-2"> mdi-routes </v-icon>
        <vue-select
          label="name"
          :options="destinations"
          v-model="filter_destination"
          @input="changeDestination($event)"
          placeholder="Route nationale"
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
        <v-icon color="secondary" class="mr-2"> mdi-car </v-icon>
        <vue-select
          :disabled="display_vehicul"
          :options="vehiculs"
          v-model="filter_vehicule"
          @input="changeVehicul($event)"
          placeholder="Voiture"
          label="vehicule_number"
          class="w-100"
          hide-details
        >
          <template #no-options="{ search, searching, loading }">
            Aucun résultat
          </template>
        </vue-select>
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
    <v-card v-if="all_revenue" class="card-default mt-5 pa-3">
      <v-row v-if="all_revenue.length > 0" class="list-vehicul ma-0">
        <v-col cols="12" class="pa-1">
          <p class="text-primary font-bold">
            Total de revenu du semaine de
            <span class="text-secondary">{{
              filter_date_launch
                ? $moment(filter_date_launch).format("D MMMM YYYY")
                : $moment().startOf("week").format("D MMMM YYYY")
            }}</span>
            au
            <span class="text-secondary">{{
              filter_date_end
                ? $moment(filter_date_end).format("D MMM YYYY")
                : $moment().endOf("week").format("D MMMM YYYY")
            }}</span>
            :
            <span class="text-secondary pl-7">{{ total }} Ar</span>
          </p>
        </v-col>
        <hr class="border-primary w-plus" />
        <v-col
          cols="12"
          xl="6"
          lg="6"
          md="12"
          class="pa-1"
          v-for="(revenu, index) in all_revenue"
          :key="index"
        >
          <FrontRevenuItemrevenuvehicule :revenu="revenu" />
        </v-col>
      </v-row>
      <div v-else>
        <FrontDefaultNoresult />
      </div>
    </v-card>
    <v-card v-else class="card-default mt-5 pa-3">
      <v-row class="list-vehicul ma-0">
        <v-col cols="12" class="pa-1">
          <p class="text-primary">
            <span class="text-secondary font-bold">Chargement...</span>
          </p>
        </v-col>
        <hr class="border-primary w-plus" />
        <v-col
          cols="12"
          xl="6"
          lg="6"
          md="12"
          class="pa-1"
          v-for="(revenu, index) in 4"
          :key="index"
        >
          <FrontRevenuItemrevenuvehicule />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  head: {
    titleTemplate: "R23 - Détails de revenue",
  },
  data() {
    return {
      all_revenue: null,
      total: 0,
      menu1: false,
      menu2: false,
      filter_date_launch: null,
      filter_date_end: null,
      filter_vehicule: null,
      filter_destination: null,
      destinations: [],
      vehiculs: [],
      display_vehicul: true,
      loadingfilter: false,
    };
  },
  async fetch() {
    const type =
      this.$auth.user.user.user_type_id === 4 ? "proprietaire" : "cooperative";
    const res = await this.$axios.get("api/revenue", {
      params: {
        type,
      },
    });
    this.all_revenue = res.data;
    const total = await this.$axios.get("api/revenu-forweek", {
      params: {
        type,
      },
    });
    this.total = total.data.total;
    // get all desitnation for cooperative
    const categorie = await this.$axios.get("api/categorie/all");
    this.destinations = categorie.data.categories;
  },
  methods: {
    changeDestination(event) {
      if (event) {
        this.loadingfilter = true;
        this.$axios
          .get("api/vehicul/gamme-for-destination", {
            params: {
              gamme_name: event.name,
            },
          })
          .then((res) => {
            this.loadingfilter = false;
            this.vehiculs = res.data;
            this.display_vehicul = false;
          })
          .catch((error) => {
            this.loadingfilter = false;
            console.error(error);
          });
      } else {
        if (process.client) {
          this.$fetch();
        }
      }
    },
    changeDate(event) {
      if (event) {
        if (this.filter_date_launch && this.filter_date_end) {
          this.loadingfilter = true;
          this.$axios
            .get("api/revenue", {
              params: {
                start: this.filter_date_launch,
                end: this.filter_date_end,
              },
            })
            .then((res) => {
              this.loadingfilter = false;
              this.all_revenue = res.data;
            })
            .catch((error) => {
              this.loadingfilter = false;
              console.error(error);
            });

          //  get total for intervall
          this.$axios
            .get("api/revenu-forweek", {
              params: {
                start: this.filter_date_launch,
                end: this.filter_date_end,
                type:
                  this.$auth.user.user.user_type_id === 4
                    ? "proprietaire"
                    : "cooperative",
              },
            })
            .then((res) => {
              this.total = res.data.total;
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          if (process.client) {
            this.$fetch();
          }
        }
      } else {
        if (process.client) {
          this.$fetch();
        }
      }
    },
    changeVehicul(event) {
      if (event) {
        this.loadingfilter = true;
        // get count  revenue for choiced
        this.$axios
          .get("api/revenu-forweek", {
            params: {
              type:
                this.$auth.user.user.user_type_id === 4
                  ? "proprietaire"
                  : "cooperative",
              categorie: this.filter_vehicule.vehicule_number,
            },
          })
          .then((res) => {
            this.total = res.data.total;
          })
          .catch((error) => {
            console.error(error);
          });
        this.$axios
          .get("api/revenue", {
            params: {
              destination: this.filter_destination.name,
              vehicul: this.filter_vehicule.vehicule_number,
              start: this.filter_date_launch ? this.filter_date_launch : null,
              end: this.filter_date_end ? this.filter_date_end : null,
            },
          })
          .then((res) => {
            this.loadingfilter = false;
            this.all_revenue = res.data;
          })
          .catch((error) => {
            this.loadingfilter = false;
            console.error(error);
          });
      } else {
        this.$fetch();
      }
    },
  },
  watch: {
    filter_date_launch: {
      handler(newvalue) {
        if (!newvalue) {
          // console.log(oldvalue, newvalue);
          if (process.client) {
            this.$fetch();
          }
        }
      },
      immediate: true,
    },
    filter_date_end: {
      handler(newvalue) {
        // console.log(oldvalue, newvalue);
        if (!newvalue) {
          if (process.client) {
            this.$fetch();
          }
        }
      },
      immediate: true,
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
@media (max-width: 600px) {
  .row.ma-0.block-filtre.my-4 {
    margin-bottom: 0 !important;
  }
  .card-default.mt-5.pa-3 {
    margin-top: 0 !important;
  }
}
</style>

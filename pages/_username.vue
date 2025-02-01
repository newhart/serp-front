<template>
  <div class="py-3">
    <FilterInput
      :allDestination="allDestination"
      :cooperativeOption="cooperativeOption"
      :allArrival="allArrival"
      type="reservation"
      @handelChangeDestination="getValueDestination"
      @handelChangeCooperative="choiceCooperative"
      :loadingfilter="loadingfilter"
    />
    <div v-if="gammes">
      <div v-if="gammes.length > 0" class="mt-4 block-res1">
        <v-row
          v-for="(item, index) in gammes"
          :key="index"
          class="ma-0 list-cooperative"
        >
          <FrontPublicityItemAccueil
            @deleted="deletedPub($event, index)"
            :item="item"
            v-if="item.ower"
          />
          <FrontCooperativeItem :item="item" v-else />
        </v-row>
        <infinite-loading
          v-if="gammes.length > 5"
          spinner="bubbles"
          @infinite="infiniteScroll"
        >
          <div slot="no-results" class="text-secondary">
            Il n'y a plus de résultat
          </div>
        </infinite-loading>
      </div>
      <div v-else>
        <FrontDefaultNoresult />
      </div>
    </div>
    <v-row v-else class="ma-0 list-cooperative">
      <FrontCooperativeItemSkeleton v-for="(item, index) in 2" :key="index" />
    </v-row>
  </div>
</template>

<script>
import FilterInput from "../components/FilterInput.vue";
export default {
  head: {
    titleTemplate: "R23 - Réserver votre place en ligne avec R23",
  },
  components: {
    FilterInput,
  },
  data: () => ({
    gammes: null,
    simpleSuggestionList: [],
    activePicker: null,
    date: null,
    menu: false,
    cooperativeOption: [],
    allDestination: [],
    allArrival: [],
    arrival: null,
    depart: null,
    cooperative: null,
    publicity: null,
    loadingfilter: false,
    page: 1,
  }),

  async fetch() {
    const data = await this.$axios.get("api/cooperative-suggest", {
      params: {
        cooperative_id:
          this.$auth.user.user.user_type_id === 1 && this.cooperative == null
            ? this.$auth.user.user.id
            : null,
      },
    });
    this.gammes = data.data.gamme.data;
    data.data.publicity.forEach((element) => {
      const max = this.gammes.length + 2;
      var num = Math.floor(Math.random() * max + 1);
      this.gammes.splice(num, 0, element);
    });
    const option = await this.$axios.get("api/all-cooperative");
    this.cooperativeOption = option.data;
    const res = await this.$axios.get("api/all-intineraire");
    this.allDestination = res.data;
    this.allArrival = res.data;
  },
  fetchOnServer: false,
  methods: {
    deletedPub(event, index) {
      this.gammes = this.gammes.filter((item) => item.id !== event);
    },
    save(date) {
      this.$store.commit("date/changedepart", date);
      this.$refs.menu.save(date);
    },
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++; // next page
        this.$axios
          .get("api/cooperative-suggest", {
            params: {
              cooperative_id:
                this.$auth.user.user.user_type_id === 1
                  ? this.$auth.user.user.id
                  : null,
              page: this.page,
            },
          })
          .then((resp) => {
            if (resp.data.gamme.data.length > 0) {
              // check if any left
              resp.data.gamme.data.forEach((item) => {
                this.gammes.push(item);
              }); // push it into the items array so we can display the data
              $state.loaded();
            } else {
              $state.complete();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },

    getValueDestination(event, type) {
      if (event) {
        if (type === "arrival") {
          this.depart = event;
          this.allArrival = this.allDestination.filter(
            (item) => item.name !== event.name
          );
        } else {
          this.arrival = event;
          this.allDestination = this.allArrival.filter(
            (item) => item.name !== event.name
          );
        }

        if (this.arrival && this.depart) {
          this.loadingfilter = true;
          this.$axios
            .get("api/cooperative-suggest", {
              params: {
                arrival: this.arrival.name,
                depart: this.depart.name,
                cooperative_id: this.cooperative ? this.cooperative.id : null,
              },
            })
            .then((res) => {
              this.gammes = res.data.gamme.data;
              res.data.publicity.forEach((element) => {
                const max = this.gammes.length + 2;
                var num = Math.floor(Math.random() * max + 1);
                this.gammes.splice(num, 0, element);
              });
              this.loadingfilter = false;
            })
            .catch((error) => {
              console.log(error);
              this.loadingfilter = false;
            });
        }
      } else {
        this.$fetch();
      }
    },
    getCooperativeSuggest(query = null) {
      this.loadingfilter = true;
      this.$axios
        .get("api/cooperative-suggest", {
          params: {
            cooperative_id: query,
            arrival: this.arrival ? this.arrival.name : null,
            depart: this.depart ? this.depart.name : null,
          },
        })
        .then((res) => {
          this.gammes = res.data.gamme.data;
          res.data.publicity.forEach((element) => {
            const max = this.gammes.length + 2;
            var num = Math.floor(Math.random() * max + 1);
            this.gammes.splice(num, 0, element);
          });
          this.loadingfilter = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingfilter = false;
        });
    },

    choiceCooperative(event) {
      if (event) {
        this.cooperative = event;
        this.getCooperativeSuggest(event.id);
      } else {
        this.$axios
          .get("api/cooperative-suggest")
          .then((res) => {
            this.gammes = res.data.gamme.data;
            res.data.publicity.forEach((element) => {
              const max = this.gammes.length + 2;
              var num = Math.floor(Math.random() * max + 1);
              this.gammes.splice(num, 0, element);
            });
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      }
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
    "$store.state.chat.newCooperative": {
      handler(value, oldvalue) {
        if (oldvalue && (value === "null" || value === null)) {
          this.$fetch();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/username.scss";
</style>

<template>
  <div>
    <v-card class="card-default pa-3">
      <client-only>
        <FrontActualityCreatePub
          @status="changeStatus"
          @newPub="changeNewPub"
          :id_group="null"
        />
      </client-only>
      <div class="list-publication">
        <div
          v-show="statusCreatePub === 'importation'"
          class="importation item-publication card"
        >
          <p class="font12 text-primary mb-2">
            Importation de votre publication...
          </p>
          <v-progress-linear
            color="secondary"
            indeterminate
          ></v-progress-linear>
        </div>
        <div v-if="items">
          <div v-if="items.length > 0">
            <div v-for="(item, index) in items" :key="index">
              <FrontActualityItemPublication
                :typeAffichage="typeAffichage"
                :item="item"
                @removedPub="removedPub"
                @newUpdate="newUpdate"
              />
              <div
                v-if="index === 0 && popularGroup && popularGroup.length > 0"
                class="groups-slide"
              >
                <p class="text-primary font-bold px-1">
                  Populaire en ce moment
                </p>
                <div class="position-relative groups-slide-liste">
                  <v-btn
                    @click="prev()"
                    v-if="popularGroup.length > 3"
                    icon
                    class="arrow-left arrow"
                  >
                    <v-icon size="35"> mdi-arrow-left-circle </v-icon>
                  </v-btn>
                  <VueSlickCarousel
                    class="max-w-100"
                    ref="groups"
                    v-bind="settings"
                  >
                    <div
                      class="pa-1"
                      v-for="(item, index) in popularGroup"
                      :key="index"
                    >
                      <FrontGroupsItem :index="index" :item="item" />
                    </div>
                  </VueSlickCarousel>
                  <v-btn
                    @click="next()"
                    v-if="popularGroup.length > 3"
                    icon
                    class="arrow-right arrow"
                  >
                    <v-icon size="35"> mdi-arrow-right-circle </v-icon>
                  </v-btn>
                </div>
              </div>
              <div
                v-if="index === 3 && publicity && publicity.length > 0"
                class="groups-slide"
              >
                <p class="text-primary font-bold px-1">Nouveaux publicités</p>
                <div class="position-relative groups-slide-liste">
                  <v-btn
                    @click="prevPub()"
                    v-if="publicity && publicity.length > 3"
                    icon
                    class="arrow-left arrow"
                  >
                    <v-icon size="35"> mdi-arrow-left-circle </v-icon>
                  </v-btn>
                  <VueSlickCarousel
                    class="max-w-100"
                    ref="publicities"
                    v-bind="settings"
                  >
                    <div
                      class="pa-1"
                      v-for="(item, index) in publicity"
                      :key="index"
                    >
                      <v-card class="card-groupe">
                        <v-img
                          :src="
                            item.image
                              ? item.image
                              : 'https://picsum.photos/350/165?random'
                          "
                          height="150"
                          cover
                          class="bg-grey-lighten-2"
                        >
                        </v-img>
                        <div>
                          <v-card-title class="py-0 px-3">
                            <p
                              class="font-bold font16 limite1-lign text-primary"
                            >
                              {{ item.title }}
                            </p>
                          </v-card-title>
                          <v-card-text class="text--primary py-0 px-3">
                            <p class="limite1-lign line-h">
                              {{
                                item.description
                                  ? item.description
                                  : "Voiture à louer"
                              }}
                            </p>
                          </v-card-text>
                        </div>

                        <v-card-actions class="px-3 pb-3">
                          <v-btn
                            @click="contacter(item.ower)"
                            :color="'secondary'"
                            class="font12 max-w-100"
                            v-if="item.ower.id !== $auth.user.user.id"
                          >
                            <span class="limite1-lign"> Contacter </span>
                          </v-btn>
                          <v-btn
                            @click="modifyPub(item.id)"
                            :color="'secondary'"
                            class="font12 max-w-100"
                            v-else
                          >
                            <span class="limite1-lign">
                              Modifier votre publicité
                            </span>
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </VueSlickCarousel>
                  <v-btn
                    @click="nextPub()"
                    v-if="publicity && publicity.length > 3"
                    icon
                    class="arrow-right arrow"
                  >
                    <v-icon size="35"> mdi-arrow-right-circle </v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            <client-only>
              <infinite-loading
                v-show="items && items.length > 4"
                spinner="bubbles"
                @infinite="pagination"
              >
                <div slot="no-results" class="text-secondary">
                  Il n'y a plus de résultat
                </div>
                <div slot="no-more" class="text-secondary">
                  Il n'y a plus de données
                </div>
              </infinite-loading>
            </client-only>
          </div>
          <div class="no-pub" v-else>
            <v-icon color="secondary" size="60"> mdi-newspaper-remove </v-icon>
            <p class="mt-2">Aucune publication disponible pour le moment.</p>
          </div>
        </div>
        <div v-else class="item-publication card">
          <div class="load-pub">
            <client-only>
              <v-progress-circular
                :width="3"
                color="secondary"
                indeterminate
              ></v-progress-circular>
            </client-only>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  head: {
    titleTemplate: "R23 - Actualités en temps réel à Madagascar",
  },
  components: { VueSlickCarousel },
  data() {
    return {
      TableList: [],
      popularGroup: [],
      indexShare: null,
      statusCreatePub: null,
      typeAffichage: "publication",
      stocked: false,
      changeFilter: false,
      newPub: null,
      items: null,
      typeFiltre: "all",
      page: 1,
      publicity: [],
      settings: {
        arrows: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.5,
              slidesToScroll: 1.5,
            },
          },
        ],
      },
    };
  },
  methods: {
    removedPub(e) {
      this.items = this.items.filter(function (itm) {
        return itm.id !== e;
      });
    },
    newUpdate(e) {
      this.items.forEach((element) => {
        if (element.id === e.id) {
          (element.id = e.id),
            (element.background = e.background),
            (element.background_id = e.background_id),
            (element.typePublication =
              e.images.length > 0 || e.background_id ? "publication" : "text"),
            (element.images = e.images),
            (element.content = e.content),
            (element.ower = e.owner),
            (element.created_at = e.created_at),
            (element.comments = e.comments),
            (element.commentscount = e.commentscount),
            (element.countlike = e.countlike),
            (element.hasLiked = e.hasLiked),
            (element.group = e.group);
        }
      });
    },
    contacter(user) {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: user.id,
          name: user.cooperative_name
            ? user.cooperative_name
            : user.lastname
            ? user.lastname
            : "R23 - Administrateur",
          img: user.profiluser
            ? user.profiluser.picture
            : "~/static/icons/default/default.webp",
        },
      });
    },
    next() {
      this.$refs.groups[0].next();
      // console.log(this.$refs.groups.next());
    },
    prev() {
      this.$refs.groups[0].prev();
      // console.log(this.$refs.groups.prev());
    },
    nextPub() {
      this.$refs.publicities[0].next();
      console.log(this.$refs.groups);
    },
    prevPub() {
      this.$refs.publicities[0].prev();
      console.log(this.$refs.groups);
    },
    changeNewPub(e) {
      this.items.unshift({
        id: e.id,
        background: e.background,
        typePublication:
          e.images.length > 0 || e.background_id ? "publication" : "text",
        images: e.images ? e.images : null,
        content: e.content,
        ower: e.owner,
        created_at: e.created_at,
        comments: e.comments,
        commentscount: e.commentscount,
        countlike: 0,
        hasLiked: e.hasLiked,
      });
    },
    changeStatus(e) {
      this.statusCreatePub = e;
    },
    modifyPub(id) {
      this.$router.push({
        name: "publicity-modify-id",
        params: {
          id: id,
        },
      });
    },
    pagination($state) {
      this.page++;
      this.$axios
        .get("api/actualites/index", {
          params: {
            page: this.page,
          },
        })
        .then((res) => {
          res.data.data.forEach((element) => {
            this.items.push({
              id: element.id,
              background: element.background,
              typePublication:
                element.images.length > 0 || element.background_id
                  ? "publication"
                  : "text",
              images: element.images,
              content: element.content,
              ower: element.owner,
              created_at: element.created_at,
              comments: element.comments,
              commentscount: element.commentscount,
              countlike: element.countlike,
              hasLiked: element.hasLiked,
              group: element.group,
            });
          });
          if (res.data.data.length > 0) {
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    share(i) {
      this.indexShare = i;
    },
    scroollToTop() {
      if (
        process.client &&
        document.getElementsByClassName("centerContent")[0]
      ) {
        document.getElementsByClassName("centerContent")[0].scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    verDetailsPers() {
      this.$emit("verDetailsPers", "verDetailsPers");
    },
  },
  async fetch() {
    // get the latest register
    const publications = await this.$axios.get("api/actualites/index");
    this.items = [];
    publications.data.data.forEach((element) => {
      this.items.push({
        id: element.id,
        background: element.background,
        typePublication:
          element.images.length > 0 || element.background_id
            ? "publication"
            : "text",
        images: element.images,
        content: element.content,
        ower: element.owner,
        created_at: element.created_at,
        comments: element.comments,
        commentscount: element.commentscount,
        countlike: element.countlike,
        hasLiked: element.hasLiked,
        group: element.group,
      });
    });
    const popular = await this.$axios.get("api/groups/popular-actuality");
    this.popularGroup = popular.data;
    const publicity = await this.$axios.get(
      `api/publicity/actuality-latest-publicity`
    );
    this.publicity = publicity.data.allPublicity;
  },
  watch: {
    "$store.state.default.refreshPage": {
      handler: function (value) {
        if (value) {
          this.$fetch();
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.no-pub {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

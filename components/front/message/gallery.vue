<template>
  <div class="bg-white right-message">
    <client-only>
      <VueGallerySlideshow
        :images="images"
        :index="indexImg"
        @close="indexImg = null"
      />
    </client-only>
    <div class="d-flex align-center justify-between">
      <h3 class="text-primary font-bold py-2 px-3">Contenus multimédias</h3>
    </div>

    <v-divider></v-divider>
    <div v-if="gallery">
      <v-row v-if="gallery.length > 0" class="ma-0 pa-3">
        <v-col
          v-for="(item, n) in gallery"
          :key="n"
          class="d-flex child-flex pa-1"
          cols="4"
        >
          <v-img
            :src="item.src"
            :lazy-src="item.src"
            aspect-ratio="1"
            class="grey lighten-2"
            @click="indexImg = n"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
      <div v-else class="vide-result d-flex align-center justify-center">
        <div>
          <v-icon color="dark" size="60" class="d-flex">
            mdi-camera-document-off
          </v-icon>
          <p class="text-primary font12 text-center">
            Aucun contenu multimédia
          </p>
        </div>
      </div>
    </div>
    <v-row v-else class="ma-0 pa-3">
      <v-col v-for="n in 9" :key="n" class="d-flex child-flex pa-1" cols="4">
        <v-img aspect-ratio="1" class="grey lighten-2 placeholder-wave">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import VueGallerySlideshow from "vue-gallery-slideshow";
export default {
  components: {
    VueGallerySlideshow,
  },
  data() {
    return {
      indexImg: null,
      images: [],
      selfOthers: null,
      participants: null,
      page: 24,
      targetuser: null,
      gallery: null,
    };
  },
  methods: {
    getAllGallery() {
      this.$axios
        .get(`/api/messenger/all-gallery/${this.targetuser.id}/${this.page}`)
        .then((res) => {
          this.page = this.page + 24;
          this.messages = [];
          this.nextpage = res.data.pagination.next_page_url;
          this.gallery = [];
          res.data.allgallery.forEach((item) => {
            if (item.type === "image") {
              this.images.push(item.type === "image" ? item.message : null);
            }
            this.gallery.push({
              src: item.type === "image" ? item.message : null,
              participantId: item.sender_id,
              timestamp: {
                year: this.$moment(item.created_at).format("YYYY"),
                month: this.$moment(item.created_at).format("MM"),
                day: this.$moment(item.created_at).format("DD"),
                hour: this.$moment(item.created_at).format("HH"),
                minute: this.$moment(item.created_at).format("mm"),
                second: this.$moment(item.created_at).format("ss"),
                millisecond: 0,
              },
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    "$store.state.chat.discussioninPage": {
      handler(value) {
        this.targetuser = value.target_user;
        this.getAllGallery();

        this.participants = [
          {
            name: this.targetuser.name,
            id: this.targetuser.id,
            profilePicture: this.targetuser.img,
          },
          {
            name: this.$auth.user.user.cooperative_name
              ? this.$auth.user.user.cooperative_name
              : this.$auth.user.user.lastname,
            id: this.$auth.user.user.id,
            profilePicture: this.$auth.user.user.profiluser.picture,
          },
        ];
        this.selfOthers = {
          name: this.targetuser.name,
          id: this.targetuser.id,
          profilePicture: this.targetuser.img,
        };
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.right-message {
  padding: 0 0 15px 0px;
  box-shadow: 0px 0px 6px #9e9e9e7a;
  border-radius: 15px;
  background-color: #fff;
  height: 100%;
}
</style>

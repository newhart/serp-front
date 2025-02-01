<template>
  <div class="d-flex flex-imgdetails">
    <v-carousel
      class="w-100 h-100vh carousel-img-pub"
      hide-delimiters
      @change="getNextValue($event)"
      :show-arrows="items.length > 0 ? true : false"
    >
      <v-btn @click="closeModal" class="close-dialog" icon>
        <v-icon> mdi-close </v-icon>
      </v-btn>
      <v-carousel-item
        v-for="(item, i) in image_item"
        :key="i"
        :src="item"
        :active-class="
          item === itemChoiced ? 'v-window-item--active' : undefined
        "
      ></v-carousel-item>
    </v-carousel>
    <div class="details-comments petite">
      <div class="border-itambaranr">
        <FrontActualityText
          :content="item.content"
          :item="item"
          :time="item.created_at"
          :typePublication="item.typePublication"
          @newUpdate="newUpdate"
        />
        <FrontActualityInfoutilisateur
          :CountNewComment="CountNewComment"
          :item="item"
          :target_img="detail_image[0]"
        />
        <FrontActualityCommentaire
          :item="item"
          :commentscount="detail_image[0] ? detail_image[0].commentscount : 0"
          :ContentNewComment="ContentNewComment"
          :details="false"
          :type="'ActualiteImage::class'"
          :is_image="detail_image ? detail_image[0].id : 1"
        />
        <div class="send-details">
          <FrontActualitySend
            :item="item"
            @newComment="newComment"
            :type="'App\\Models\\ActualiteImage'"
            :target_id="detail_image[0] ? detail_image[0].id : 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "itemChoiced", "image_item"],
  data() {
    return {
      ContentNewComment: null,
      CountNewComment: 0,
      items: [],
      detail_image: [],
    };
  },
  methods: {
    newComment(e) {
      this.ContentNewComment = e;
      this.CountNewComment++;
      this.detail_image = this.detail_image;
      this.$forceUpdate();
    },
    closeModal() {
      this.$emit("closeModal", true);
    },
    newUpdate(e) {
      this.$emit("newUpdate", e);
    },
    getNextValue(event) {
      console.log("change");
      this.detail_image = this.item.images.filter(
        (item, index) => index === event
      );
      console.log(this.detail_image);
      // this.CountNewComment = this.detail_image[0].commentscount;
    },
  },
  watch: {
    item: {
      handler(value) {
        if (value) {
          value.images.forEach((element) => {
            this.items.push({ src: element.image });
          });
          this.detail_image = value.images.filter(
            (item) => item.image === this.itemChoiced
          );
        }
      },
      immediate: true,
    },
    itemChoiced: {
      handler(value) {
        if (value && this.item) {
          this.detail_image = this.item.images.filter(
            (item) => item.image === this.itemChoiced
          );
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
button.close-dialog {
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #00000045;
  z-index: 2;
  border-radius: 50% !important;
}

@media (min-width: 961px) {
  .details-comments.petite {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 0;
  }
  .details-comments.petite {
    min-width: 380px;
    max-width: 380px;
    background-color: #0000000a;
    /* padding: 15px; */
  }
}
@media (max-width: 960px) {
  .flex-imgdetails {
    flex-direction: column;
  }
  .v-application .v-dialog.v-dialog--fullscreen {
    width: calc(100% + 3px);
  }
  .details-comments.petite {
    background-color: #0000000a;
    /* padding: 15px; */
  }
}
</style>

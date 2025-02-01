<template>
  <div>
    <div v-if="item" class="item-publication card">
      <FrontActualityText
        @removedPub="removedPub"
        :content="item.content"
        :item="item"
        :typePublication="item.typePublication"
        v-if="item.typePublication === 'text'"
        @newUpdate="newUpdate"
        @voirCommentaire="dialogItemDetails = true"
      />
      <FrontActualityImage
        v-show="item.images.length > 0 || item.background"
        :images="item.images"
        :item="item"
        @removedPub="removedPub"
        @newUpdate="newUpdate"
      />
      <FrontActualityInfoutilisateur
        :CountNewComment="CountNewComment"
        :item="item"
        :target_img="null"
      />
      <div class="border-itambaranr">
        <FrontActualityText
          @removedPub="removedPub"
          v-if="item.typePublication !== 'text' && !item.background"
          :content="item.content"
          :item="item"
          :time="item.created_at"
          :typePublication="item.typePublication"
          @newUpdate="newUpdate"
          @voirCommentaire="dialogItemDetails = true"
        />
        <FrontActualityCommentaire
          :item="item"
          :commentscount="item.commentscount"
          :ContentNewComment="ContentNewComment"
          @voirCommentaire="dialogItemDetails = true"
          :type="'Actuality::class'"
          :is_image="null"
        />
      </div>
      <FrontActualitySend
        :item="item"
        :type="'App\\Models\\Actuality'"
        :target_id="item.id"
        @newComment="newComment"
      />
      <v-dialog
        v-model="dialogItemDetails"
        width="100%"
        content-class="item-pub"
      >
        <v-container class="pa-0">
          <div class="d-flex justify-between h-100">
            <div class="block-left"></div>
            <div class="item-pub-details-bg pb-0 right-block">
              <FrontActualityItemDetails
                :item="item"
                @removedPub="removedPub"
                @newUpdate="newUpdate"
                @closeDialogue="dialogItemDetails = false"
              />
            </div>
            <div class="block-left left-actuality justify-center"></div>
          </div>
        </v-container>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      ContentNewComment: null,
      CountNewComment: 0,
      dialogItemDetails: false,
    };
  },
  methods: {
    newUpdate(e) {
      this.$emit("newUpdate", e);
      // this.ValueNewUpdate = e;
    },
    removedPub(e) {
      this.$emit("removedPub", e);
    },
    newComment(e) {
      this.ContentNewComment = e;
      this.CountNewComment++;
    },
    verDetailsPers() {
      this.$emit("verDetailsPers", "verDetailsPers");
    },
  },
};
</script>
<style scoped>
.item-publication {
  /* padding: 10px 0; */
  border: none;
}
</style>

<template>
  <div>
    <div v-if="item" class="item-publication card">
      <div
        class="sticky-top titre-pub-details d-flex justify-between align-center"
      >
        <div></div>
        <h3 class="text-primary limite1-lign font-bold">
          Publication de
          {{
            item.ower.cooperative_name
              ? item.ower.cooperative_name
              : item.ower.lastname + " " + item.ower.name
          }}
        </h3>
        <v-btn @click="closeDialogue" class="mr-3" icon>
          <v-icon color="primary"> mdi-close-circle </v-icon>
        </v-btn>
      </div>
      <FrontActualityText
        @removedPub="removedPub"
        :content="item.content"
        :item="item"
        :typePublication="item.typePublication"
        v-if="item.typePublication === 'text'"
        @newUpdate="newUpdate"
      />
      <FrontActualityImage
        v-if="item.images.length > 0 || item.background"
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
        />
        <FrontActualityCommentaire
          :item="item"
          :commentscount="item.commentscount"
          :ContentNewComment="ContentNewComment"
          :details="true"
          :type="'Actuality::class'"
          :is_image="null"
        />
      </div>
      <div class="send-details">
        <FrontActualitySend
          :item="item"
          :type="'App\\Models\\Actuality'"
          :target_id="item.id"
          @newComment="newComment"
        />
      </div>
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
    };
  },
  methods: {
    newUpdate(e) {
      this.$emit("newUpdate", e);
      // this.ValueNewUpdate = e;
    },
    closeDialogue() {
      this.$emit("closeDialogue", true);
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
  border: none;
}
.close-icon {
  position: absolute;
  right: 15px;
  top: 7px;
}
</style>

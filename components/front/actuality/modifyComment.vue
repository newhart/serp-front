<template>
  <div class="sticky-details">
    <div v-if="imgUpload.length > 0" class="list-img-upload row pb-1 ma-0">
      <v-col style="max-width: 60px !important" cols="2" class="pa-1">
        <div class="add-img-coments position-relative">
          <v-icon color="primary" size="20" dark> mdi-camera </v-icon>
          <input
            @change="handelPreviewFile($event)"
            type="file"
            class="inputImg"
          />
        </div>
      </v-col>
      <v-col
        v-for="(item, index) in imgUpload"
        :key="index"
        cols="2"
        class="pa-1 img-comments"
      >
        <v-img
          :src="item"
          :lazy-src="item"
          aspect-ratio="1"
          cover
          class="bg-grey-lighten-2"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <div class="deleted_img align-center justify-center w-100 h-100">
            <v-btn color="white" @click="deleteImg(index)" icon>
              <v-icon color="secondary" size="20">
                mdi-trash-can-outline
              </v-icon>
            </v-btn>
          </div>
        </v-img>
      </v-col>
    </div>
    <div class="card-content-details-pub form-send-comments">
      <div class="pr-3 position-relative">
        <v-icon color="primary" size="20"> mdi-image-multiple </v-icon>
        <input
          @change="handelPreviewFile($event)"
          type="file"
          class="inputImg"
        />
      </div>
      <!-- <v-text-field
          outlined
          clearable
          solo
          class="input-globale avecBorger avec-reation"
          height="40px"
          min-height="40px"
          append-icon="mdi-emoticon-happy-outline"
          hide-details
        >
          <template v-slot:label>
            <p>Ecrire un commentaire</p>
          </template>
        </v-text-field> -->
      <client-only placeholder="Loading...">
        <VueEmoji
          class="input-globale avecBorger avec-reation"
          height="40px"
          placeholder="Ecrire un commentaire"
          ref="emoji"
          @input="onInput"
          :value="value"
        />
      </client-only>

      <v-icon
        size="30"
        color="rgb(247, 214, 2)"
        class="cursor-pointor pl-3 send-coms"
        v-if="!loadPost"
        @click="post()"
      >
        mdi-chevron-right-circle
      </v-icon>
      <v-progress-circular
        v-else
        indeterminate
        color="primary"
        size="25"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item_comment"],
  components: {
    [process.client && "VueEmoji"]: () => import("emoji-vue"),
  },
  data() {
    return {
      comment: this.item_comment.content,
      value: this.item_comment.content,
      imgUpload: [],
      loadPost: false,
    };
  },
  methods: {
    onInput(event) {
      this.comment = event.data;
    },
    deleteImg(index) {
      this.imgUpload.splice(index, 1);
    },
    handelPreviewFile(event) {
      const input = event.target;
      const that = this;
      console.log(input.files);
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log(e.target.result);
          that.imgUpload.push(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    clearTextarea() {
      this.$refs.emoji.clear();
    },
    post() {
      if (
        (this.comment === "" || !this.comment) &&
        this.imgUpload.length === 0
      ) {
        return;
      }
      this.loadPost = true;
      let content_coms = this.comment;
      let img_coms = this.imgUpload;
      this.imgUpload = [];
      this.comment = null;
      this.value = null;
      this.clearTextarea();
      this.$axios
        .post("api/comments/update", {
          content: content_coms,
          comment_id: this.item_comment.id,
          images: img_coms,
        })
        .then((res) => {
          console.log("comments", res.data);
          content_coms = null;
          img_coms = null;
          this.loadPost = false;
          this.$emit("CommentUpdated", res.data.newComment);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-img-coments {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px #0321538a solid;
  border-style: dashed;
  background-color: #00000005;
}
.card-content-details-pub {
  margin-top: 0;
}
.card-content-details-pub.form-send-comments {
  width: 275px;
  padding: 0px !important;
}
.card-content-details-pub.form-send-comments {
  padding: 10px;
  border: 1px #ececec solid;
  border-top: none;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img-user-comment {
    width: 30px;
    height: 30px;
    border-radius: 15px;

    border: 1.5px solid #fff;
    object-fit: cover;
  }
  .send-coms {
    color: #032153 !important;
  }
  .send-input {
    width: calc(100% - 120px);
    height: 35px;
    background: #fff;
    border: 0.25px solid #707070;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-radius: 5px;
    .add {
      width: 23px;
      height: 24px;
      border-radius: 4px;
      color: #fff !important;
    }
    .emojii {
      color: #ffd501 !important;
    }
    input.input-send {
      width: calc(100% - 90px);
      font-size: 14px;
      color: #7d7d7d;
      outline: none;
    }
  }
}
.avecBorger .v-input__slot {
  padding: 0 155px 0 15px !important;
  font-size: 14px !important;
}
.img-comments .deleted_img {
  display: none;
}
.img-comments:hover .deleted_img {
  display: flex;
}
.img-comments .deleted_img {
  position: relative;
}
.img-comments .deleted_img::before {
  background: #00000085;
  content: "";
  inset: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease-in-out;
  z-index: -1;
}

.img-comments:hover .deleted_img::before {
  transform: scaleX(1);
  transform-origin: left;
}
</style>

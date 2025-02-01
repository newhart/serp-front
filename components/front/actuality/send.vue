<template>
  <div class="my-3 sticky-details">
    <div v-if="imgUpload.length > 0" class="list-img-upload row pb-1 ma-0">
      <v-col cols="2" class="pa-1">
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
      <img
        :src="$auth.user.user.profiluser.picture"
        alt=""
        class="img-user-comment cursor-pointor mr-3"
      />
      <!-- <div class="pr-3">
        <v-icon color="primary" size="20"> mdi-paperclip </v-icon>
      </div> -->
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
  props: ["item", "reply_id", "target_id", "type"],
  components: {
    [process.client && "VueEmoji"]: () => import("emoji-vue"),
  },
  data() {
    return {
      comment: null,
      value: null,
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
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
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
      if (this.reply_id) {
        let content_coms = this.comment;
        let img_coms = this.imgUpload;
        this.imgUpload = [];
        this.comment = null;
        this.value = null;
        this.clearTextarea();
        this.$axios
          .post("api/comments/reply", {
            content: content_coms,
            id: this.reply_id,
            images: img_coms,
          })
          .then((res) => {
            content_coms = null;
            img_coms = null;
            this.loadPost = false;
            this.$emit("newReply", res.data.newComment);
          });
      } else {
        let content_coms = this.comment;
        let img_coms = this.imgUpload;
        this.imgUpload = [];
        this.comment = null;
        this.value = null;
        this.clearTextarea();
        this.$axios
          .post("api/comments/store", {
            content: content_coms,
            target: this.type,
            id: this.target_id,
            images: img_coms,
          })
          .then((res) => {
            content_coms = null;
            img_coms = null;
            this.loadPost = false;
            this.$emit("newComment", res.data.newComment);
          });
      }
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
.card-content-details-pub.form-send-comments {
  padding: 10px 15px;
  border: 1px #ececec solid;
  border-top: none;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  padding-top: 20px;
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
@media (max-width: 428px) {
  .card-content-details-pub.form-send-comments .img-user-comment {
    display: none;
  }
}
</style>

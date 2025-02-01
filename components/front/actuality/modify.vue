<template>
  <div>
    <div class="addphotos">
      <div class="header-textare d-flex justify-between align-items-start">
        <div
          v-if="backgroundActive"
          :style="'background-image: url(' + backgroundActive.src + ')'"
          class="with-background"
        >
          <textarea
            class="textarea-global font12"
            id="textarea-with-bg"
            v-model.trim="content"
            style="text-align: center"
          ></textarea>
        </div>
        <textarea
          class="textarea-global font12"
          placeholder="Une bonne nouvelle ?"
          v-model.trim="content"
          v-else
        ></textarea>
      </div>
      <hr class="plus1" />
      <div
        v-if="images.length === 0 && activeBg"
        class="d-flex flex-wrap mt-3 list-background"
      >
        <div
          @click="backgroundActive = null"
          :class="!backgroundActive ? 'active' : ''"
          class="ma-1 img bg-gris1 cursor-pointor"
        ></div>
        <img
          v-for="(item, index) in backgroundText"
          :key="index"
          :src="item.src"
          alt=""
          class="ma-1 img cursor-pointor"
          :class="
            backgroundActive && backgroundActive.id === item.id ? 'active' : ''
          "
          @click="backgroundActive = item"
        />
      </div>
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center my-3">
          <div
            @click="ClickAddFile('photo')"
            class="mr-3 d-flex cursor-pointor align-center"
          >
            <v-icon color="#9cd2f8" size="20"> mdi-image-multiple </v-icon>
            <p class="ml-2 font12 text-primary limite1-lign">Photo</p>
          </div>
        </div>
      </div>
      <div class="mb-3 row mx-0">
        <div class="addImgBlock col d-flex ma-1 pa-1 max-w-fit-content">
          <div class="add-img position-relative">
            <input
              style="z-index: 20"
              type="file"
              class="position-absolute w-100 h-100 opacity0"
              @input="onChangeFile"
            />
            <v-icon size="45"> mdi-plus </v-icon>
          </div>
        </div>
        <div
          v-for="n in images"
          :key="n"
          class="position-relative max-w-fit-content col pa-1 w-100"
        >
          <v-img :src="`${n}`" :lazy="`${n}`" :alt="n" class="img-item">
            <div class="deleteImg">
              <v-btn @click="disableChangeImage(n)" icon>
                <v-icon color="secondary"> mdi-close-circle </v-icon>
              </v-btn>
            </div>
          </v-img>
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          rounded
          color="secondary"
          @click="closeDialogue()"
          class="font12 mr-1"
        >
          Annuler
        </v-btn>
        <v-btn
          :loading="is_posted"
          rounded
          color="primary"
          class="font12"
          @click="post()"
        >
          Enregistrer
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      is_posted: false,
      images: [],
      backgroundActive: null,
      content: "",
      backgroundText: [],
      activeBg: true,
    };
  },
  watch: {
    content: {
      handler(value) {
        if (value) {
          if (value.length > 300) {
            this.backgroundActive = null;
            this.activeBg = false;
          } else {
            this.activeBg = true;
          }
          if (value.split("\n").length - 1 > 3) {
            this.backgroundActive = null;
            this.activeBg = false;
          } else {
            this.activeBg = true;
          }
        }
      },
      immediate: true,
    },
    images: {
      handler(value) {
        if (value) {
          if (value.length > 0) {
            this.backgroundActive = null;
          }
        }
      },
      immediate: true,
    },
    "item.images": {
      handler() {
        this.changeValue();
      },
      immediate: true,
    },
    "item.content": {
      handler() {
        this.changeValue();
      },
      immediate: true,
    },
  },
  methods: {
    changeValue() {
      if (this.item) {
        this.images = [];
        this.item.images.forEach((element) => {
          this.images.push(element.image);
        });
        this.content = this.item.content.replaceAll("<br />", "");
        this.backgroundActive = this.item.background;
        console.log(this.content);
      }
    },
    ClickAddFile(e) {
      this.FileAdd = e;
    },
    closeDialogue() {
      this.$emit("closeDialogue", true);
    },
    confidentialityget(e) {
      this.confidentiality = e;
    },
    next() {
      this.$refs.carousel.next();
    },
    post() {
      if (this.content === "" && this.images.length === 0) {
        // put here post
        return;
      }
      this.FileAdd = "";
      this.is_posted = true;
      let var_img = this.images;
      let var_content = this.content;
      this.$axios
        .post("api/actualites/update", {
          content: var_content,
          images: var_img,
          background_id: this.backgroundActive.id,
          id: this.item.id,
        })
        .then((res) => {
          this.is_posted = false;
          if (res.data.success) {
            this.$emit("newUpdate", res.data.data);
            var_content = "";
            var_img = [];
            this.images = [];
            this.content = "";
          }
        });
    },
    disableChangeImage(image) {
      this.images = this.images.filter((item) => item !== image);
    },
    onChangeFile(event) {
      const that = this;
      const input = event.target;

      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.images.push(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
  },
  mounted() {
    this.$axios.get("api/actualites/backgroundText").then((res) => {
      this.backgroundText = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.list-background {
  overflow-y: hidden;
  overflow-x: auto;
}
.avecBorger .v-input__slot {
  padding: 0 155px 0 15px !important;
  font-size: 14px !important;
}
.bg-gris1 {
  background-color: #0000000d;
}
.rigth-bot {
  position: absolute;
  top: 45px;
  right: -18px;
}
.list-background .active {
  border: 2px #03215380 solid;
}

.list-background .img {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 6px;
}
.with-background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: -15px -15px 0;
  width: calc(100% + 30px) !important;
  border-radius: 10px 10px 0;
  font-family: "gilroy-bold";
  height: 200px;
  @media (min-width: 678px) {
    height: 300px;
  }
}
.with-background textarea,
.with-background input {
  color: #000 !important;
  font-size: 15px !important;
  height: 100%;
  text-align: center;
  padding-top: 53px;
}
button.publier {
  width: 125px;
  border-radius: 25px;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: none !important;
}
button.publier1 {
  width: 125px;
  border-radius: 25px;
  box-shadow: none !important;
}
.textarea-global {
  width: 100%;
  height: 110px;
  outline: none;
}
.addphotos {
  padding: 15px;
  border: 1px #70707038 solid !important;
  border-radius: 10px;
}
hr.plus1 {
  margin: 0;
  width: calc(100% + 30px);
  margin-left: -15px;
  border: 1px #70707038 solid !important;
}
.img-item {
  width: 110px !important;
  height: 110px !important;
  border-radius: 20px !important;
  object-fit: cover;
}
.addImgBlock {
  margin-top: 5px;
}
.addImgBlock {
  width: 110px;
  min-width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px rgba(0, 0, 0, 0.23922) solid;
  border-style: dashed;
  border-radius: 20px;
}
.deleteImg {
  justify-content: center;
  align-items: center;
  height: 100%;
  display: none;
}
.img-item:hover .deleteImg {
  display: flex;
}
@media (max-width: 500px) {
  .addImgBlock,
  .img-item {
    width: 80px !important;
    min-width: 80px !important;
    height: 80px !important;
    border-radius: 10px !important;
  }
}
</style>

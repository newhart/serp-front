<template>
  <div>
    <div v-if="!images" class="loading">
      <div class="image position-relative">
        <div class="list-hobbie-left">
          <div class="hobbies-ef">
            <div class="square circle"></div>
          </div>
          <div class="hobbies-ef">
            <div class="square circle"></div>
          </div>
          <div class="hobbies-ef">
            <div class="square circle"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-header position-relative">
      <v-menu
        bottom
        left
        origin="center center"
        transition="scale-transition"
        v-if="item.ower.id === $auth.user.user.id"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="trois-poi-top"
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon color="primary"> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>

        <v-list-item-content class="justify-center py-1 bg-secondary">
          <ul class="list-item-menu">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <li
                  v-bind="attrs"
                  v-on="on"
                  class="cursor-pointor text-white font12"
                >
                  <v-icon size="20" class="text-white">
                    mdi-pencil-outline
                  </v-icon>
                  Modifier
                </li>
              </template>
              <FrontActualityModify
                @closeDialogue="dialog = false"
                @newUpdate="newUpdate"
                :item="item"
              />
            </v-dialog>
            <li
              @click="removePublication()"
              class="cursor-pointor text-white font12"
            >
              <v-icon size="20" class="text-white"> mdi-close </v-icon>
              Supprimer
            </li>
          </ul>
        </v-list-item-content>
      </v-menu>
      <!-- <v-btn
        color="transparent"
        @click="detailsImg = true"
        class="details-click d-block w-100 h-100 no-shadow"
        v-if="!item.background"
      >
      </v-btn> -->
      <v-dialog
        v-model="detailsImg"
        fullscreen
        :scrim="false"
        transition="dialog-bottom-transition"
        content-class="pa-0"
      >
        <FrontActualityImgDetails
          @closeModal="detailsImg = false"
          :item="item"
          :itemChoiced="itemChoiced"
          :image_item="all_images"
        />
      </v-dialog>
      <div
        v-if="item.background"
        :style="'background-image: url(' + item.background.src + ')'"
        class="with-background"
        v-html="item.content"
      ></div>
      <client-only v-else>
        <FrontCustomLigthbox
          :items="imagesPub"
          class="lightbox-customiser"
          @show="getIndex"
        ></FrontCustomLigthbox>
      </client-only>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["images", "item"],
  data() {
    return {
      dialog: false,
      imagesPub: [],
      all_images: [],
      detailsImg: false,
      itemChoiced: null,
    };
  },
  methods: {
    newUpdate(e) {
      this.dialog = false;
      this.$emit("newUpdate", e);
    },
    removePublication() {
      Swal.fire({
        title: "Êtes-vous vraiment supprimer?",
        text: "Vous ne pourrez pas revenir en arrière !",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#032153",
        cancelButtonColor: "#ff3354",
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        focusConfirm: false,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return this.$axios
            .post("api/actualites/delete", {
              id: this.item.id,
            })
            .then((res) => {})
            .catch((error) => {
              console.log(error);
            });
        },
      }).then((result) => {
        if (result.value) {
          this.$emit("removedPub", this.item.id);
          Swal.fire(
            "Supprimé!",
            "Votre publication a été supprimé.",
            "success"
          );
        }
      });
    },
    getIndex(index) {
      this.detailsImg = true;
      const value_for_index = this.imagesPub[index];
      this.itemChoiced = value_for_index;
      this.all_images = this.imagesPub.filter(
        (item) => item !== value_for_index
      );
      this.all_images.unshift(value_for_index);
    },
  },
  watch: {
    images: {
      handler(value) {
        this.imagesPub = [];
        if (value) {
          value.forEach((element) => {
            this.imagesPub.push(element.image);
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  height: 430px;
}
.with-background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: "gilroy-bold";
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  color: #000;
  padding: 10px;
  @media (min-height: 501px) {
    min-height: 430px;
  }
}
.circle {
  border-radius: 50% !important;
  height: 30px !important;
  width: 30px;
}
.plenEcranClick {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.pub-partager {
  filter: brightness(0.88);
  padding: 15px 10px;
  border: 1px #0003 solid;
  border-radius: 10px;
  background-color: #0000000d;
}
button.close-icons {
  z-index: 20000;
  top: 5px;
  left: 5px;
}
.status-groups {
  position: absolute;
  top: 15px;
  z-index: 20;
  right: 15px;
  max-width: 200px;
  cursor: pointer;
}
.status-groups .v-avatar {
  width: 25px !important;
  height: 25px !important;
  margin: 4px 7px 4px -9px !important;
}
.lb,
.lb-grid {
  width: 100% !important;
  height: 430px !important;
}
.card-header {
  position: relative;
  padding: 0 !important;
  .trois-poi-top {
    position: absolute;
    top: 10px;
    right: 10px;
    text-decoration: none;
    z-index: 20;
    background-color: #ffffff5e;
    i {
      color: #fff;
      font-size: 30px;
    }
  }
  .lb,
  .lb-grid {
    width: 100% !important;
    height: 430px !important;
  }
  .list-hobbie-left {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 30px;
  }
}
.hobbies-ef {
  width: 30px;
  height: 30px;
  box-shadow: 2px 3px 6px #bfbfbf;
  color: #f16f3c;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  background-color: #fff;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
@media (max-width: 500px) {
  .card-header .lb,
  .card-header .lb-grid {
    width: 100% !important;
    height: 280px !important;
  }
  .with-background {
    width: 100% !important;
    min-height: 280px !important;
    font-size: 15px;
  }
}
</style>

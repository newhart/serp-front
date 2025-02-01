<template>
  <div>
    <div
      :class="typePublication === 'text' ? 'notRadios' : ''"
      class="card-content-details-pub"
      v-if="content"
    >
      <v-dialog v-model="dialog" v-if="dialog" width="500">
        <FrontActualityModify
          @closeDialogue="dialog = false"
          @newUpdate="newUpdate"
          :item="item"
        />
      </v-dialog>
      <div class="flex-comment mb-3">
        <p v-if="typePublication !== 'publication'" class="font12">
          {{ $dayjs(item.created_at).fromNow() }}
        </p>
        <p
          v-if="typePublication === 'publication'"
          class="cursor-pointor font12"
          @click="voirCommentaire()"
        >
          <!-- Voir les commentaires -->
        </p>
        <v-menu
          bottom
          left
          origin="center center"
          transition="scale-transition"
          v-else-if="item.ower.id === $auth.user.user.id"
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
      </div>
      <v-expand-transition>
        <div
          id="textpub"
          class="details-text"
          :class="moreview ? '' : 'limite3-lign'"
          v-html="contentPub"
        ></div>
      </v-expand-transition>
      <div class="text-right">
        <v-icon @click="viewmore()" class="cursor-pointor">
          {{ moreview ? "mdi-chevron-up" : "mdi-chevron-down" }}
        </v-icon>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["item", "typePublication", "content", "time"],
  data() {
    return {
      moreview: false,
      dialog: false,
      contentPub: null,
    };
  },
  methods: {
    newUpdate(e) {
      this.dialog = false;
      this.$emit("newUpdate", e);
    },
    voirCommentaire() {
      this.$emit("voirCommentaire", true);
    },
    viewmore() {
      this.moreview = !this.moreview;
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
  },
  watch: {
    item: {
      handler(value) {
        if (value) {
          this.contentPub = value.content;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
div#textpub {
  transition: all 0.8s;
}
.card-content-details-pub {
  padding: 10px 15px;
  border: 1px #ececec solid;
  margin-top: 10px;
  border-radius: 0 0 10px 10px;
  .flex-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .details-text {
    font-size: 14px;
    color: #000;
  }
  .text-right .v-icon.v-icon {
    font-size: 25px !important;
  }
}
.notRadios {
  border-radius: 0 !important;
}
.trois-poi-top {
  background-color: #03215354;
}
</style>

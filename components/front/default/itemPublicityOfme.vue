<template>
  <v-card v-if="publicity" class="pa-2 item-contact-enlign my-1">
    <div class="d-flex justify-between">
      <v-img
        :lazy-src="
          publicity.image ? publicity.image : '/img/Cadre_centrale.webp'
        "
        :src="publicity.image ? publicity.image : '/img/Cadre_centrale.webp'"
        class="img-user-connecter"
      >
        <!-- <v-avatar size="25" class="user border-white">
          <img src="/icons/default/default.jpg" alt="John" />
        </v-avatar> -->
      </v-img>
      <div class="details d-flex justify-between direction-column w-100">
        <div>
          <div class="d-flex align-center justify-between">
            <p class="text-primary font-bold limite1-lign">
              {{ publicity.title }}
            </p>
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>

              <v-list-item-content class="justify-center py-1 bg-secondary">
                <ul class="list-item-menu">
                  <li
                    @click="modify()"
                    class="cursor-pointor mb-2 font12 text-white"
                  >
                    Modifier
                  </li>
                  <hr class="widthplusdesconnect my-0" />
                  <li
                    @click="makedelete()"
                    class="cursor-pointor mt-2 font12 text-white"
                  >
                    Supprimer
                  </li>
                </ul>
              </v-list-item-content>
            </v-menu>
          </div>
          <p
            v-if="publicity.description"
            class="text-primary font12 limite2-lign cursor-pointor"
          >
            {{ publicity.description }}
          </p>
          <p v-else class="text-primary font12 limite3-lign">
            {{ publicity.dossier ? publicity.dossier.place + " place(s)" : "" }}
            <br />{{ publicity.dossier ? publicity.dossier.energie : "" }}
          </p>
        </div>
        <div class="d-flex">
          <v-btn
            :color="publicity.status === 'En ligne' ? 'success' : 'secondary'"
            class="font12 no-shadow mt-1"
          >
            {{ publicity.status }}
          </v-btn>
          <v-btn color="primary" class="font12 mx-2 no-shadow mt-1">
            {{ publicity.day_number }} jour(s)
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
  <v-card v-else class="pa-2 item-contact-enlign my-1 placeholder-wave">
    <div class="d-flex justify-between">
      <v-img class="img-user-connecter placeholder"> </v-img>
      <div class="details d-flex justify-between direction-column w-100">
        <div>
          <div class="d-flex align-center justify-between">
            <p class="text-primary font-bold limite1-lign placeholder"></p>
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="secondary" icon v-bind="attrs" v-on="on">
                  <v-icon class="placeholder"> </v-icon>
                </v-btn>
              </template>

              <v-list-item-content class="justify-center py-1 bg-secondary">
                <ul class="list-item-menu">
                  <li
                    @click="modify()"
                    class="cursor-pointor mb-2 font12 text-white"
                  >
                    Modifier
                  </li>
                  <hr class="widthplusdesconnect my-0" />
                  <li
                    @click="makedelete()"
                    class="cursor-pointor mt-2 font12 text-white"
                  >
                    Supprimer
                  </li>
                </ul>
              </v-list-item-content>
            </v-menu>
          </div>
          <p class="text-primary font12 mb-2 limite2-lign placeholder"></p>
        </div>
        <div class="d-flex">
          <v-btn color="secondary" class="font12 no-shadow placeholder">
          </v-btn>
          <v-btn color="primary" class="font12 mx-2 no-shadow placeholder">
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["publicity"],
  methods: {
    makedelete() {
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
            .post("/api/publicity/make-delete/" + this.publicity.id)
            .then((res) => {
              if (res.data.success) {
                this.$emit("deleted", true);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        },
      }).then((result) => {
        if (result.value) {
          Swal.fire("Supprimé!", "Votre publicité a été supprimé.", "success");
        }
      });
    },
    modify() {
      this.$router.push({
        name: "publicity-modify-id",
        params: {
          id: this.publicity.id,
        },
      });
    },
    verNewLien(url) {
      window.open(url, "_blank", "noreferrer");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/publicity.scss";
.v-avatar.user {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
@media (max-width: 340px) {
  button.font12 {
    font-size: 8px !important;
    height: 23px !important;
    min-width: 0 !important;
  }
}
</style>

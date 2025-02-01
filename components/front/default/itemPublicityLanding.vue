<template>
  <v-card v-if="publicity" class="pa-2 item-contact-enlign my-1">
    <div class="d-flex justify-between">
      <v-img
        :lazy-src="publicity.image ? publicity.image : ''"
        :src="publicity.image ? publicity.image : ''"
        class="img-user-connecter cursor-pointor"
      >
      </v-img>
      <div class="details d-flex justify-between direction-column w-100">
        <div>
          <div class="d-flex align-center justify-between">
            <p class="text-primary font-bold limite1-lign cursor-pointor">
              {{ publicity.title }}
            </p>
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
              v-if="$auth.loggedIn && $auth.user.user.id === publicity.ower_id"
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
            class="text-primary font12 limite4-lign cursor-pointor"
          >
            {{ publicity.description }}
            <br />
            <a
              :href="'tel:+' + publicity.phone_number"
              v-if="$auth.loggedIn && $auth.user.user.id != publicity.ower_id"
            >
              <v-icon color="primary" class="mt-n1" size="15">
                mdi-phone
              </v-icon>
              <span class="text-secondary font-bold">
                {{ publicity.phone_number }}
              </span>
            </a>
          </p>
          <p v-else class="text-primary font12 limite4-lign">
            {{ publicity.dossier ? publicity.dossier.place + " place(s)" : "" }}
            <br />{{ publicity.dossier ? publicity.dossier.energie : "" }}
            <br />
            {{ publicity.dossier ? publicity.dossier.disponibility : "" }}
            <br />
            {{
              publicity.dossier
                ? "Vitesse " + publicity.dossier.option_vitesse
                : ""
            }}
            <br />
            <a
              :href="'tel:+' + publicity.phone_number"
              v-if="$auth.loggedIn && $auth.user.user.id != publicity.ower_id"
            >
              <v-icon color="primary" class="mt-n1" size="15">
                mdi-phone
              </v-icon>
              <span class="text-secondary font-bold">
                {{ publicity.phone_number }}
              </span>
            </a>
          </p>
        </div>
        <div
          class="d-flex align-center justify-end"
          v-if="$auth.loggedIn && $auth.user.user.id != this.publicity.ower_id"
        >
          <v-btn @click="contacter()" class="font12 mt-1" color="secondary">
            Contacter
          </v-btn>
        </div>
        <div v-else class="d-flex align-end justify-between">
          <v-btn link class="font12 mt-1" color="secondary">
            Contact: {{ publicity.phone_number }}
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
          <p class="text-primary font-bold limite1-lign placeholder"></p>
          <p class="text-primary font12 mt-2 placeholder limite3-lign"></p>
        </div>
        <p class="font12 text-secondary placeholder"></p>
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
    contacter() {
      // console.log("this.publicity.ower", this.publicity);
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: this.publicity.ower.id,
          name: this.publicity.ower.cooperative_name
            ? this.publicity.ower.cooperative_name
            : this.publicity.ower.lastname
            ? this.publicity.ower.lastname
            : this.publicity.ower.name,
          img: this.publicity.ower.profiluser
            ? this.publicity.ower.profiluser.picture
            : "/icons/default/default.webp",
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/publicity.scss";
@media (min-width: 824px) {
  .img-user-connecter {
    width: 130px !important;
    height: 130px !important;
    max-width: 130px !important;
    min-width: 130px !important;
    margin-right: 10px;
    border-radius: 20px;
  }
  .details {
    max-width: calc(100% - 140px);
  }
}
@media (max-width: 823px) {
  .details .limite4-lign {
    -webkit-line-clamp: 2;
  }
}
a.font12 {
  height: 15px !important;
}
</style>

<template>
  <v-col cols="12" class="py-2 px-0">
    <v-card class="pa-1 d-flex card-flexable-res-1">
      <v-img
        :lazy-src="item.image"
        :src="item.image"
        class="img-vehicule-cooperative"
      >
        <div
          v-if="item.ower.id !== 1"
          class="position-relative h-100 cursor-pointor"
        >
          <img
            :src="
              item.ower.profiluser
                ? item.ower.profiluser.picture
                : '~/static/icons/default/default.webp'
            "
            class="img-logo-cooperative"
            @click="viewProfile(item.ower.url)"
          />
          <div
            :class="
              item.ower.status === 'online' ? 'enlign' : 'enlign deconnecte'
            "
          ></div>
        </div>
      </v-img>
      <div class="details d-flex direction-column justify-between w-100 mx-4">
        <div>
          <div class="block-itm d-flex justify-between py-2">
            <div>
              <h3 class="text-secondary font-bold limite1-lign">
                {{ item.title }}
              </h3>
              <p class="text-primary font12">Publicité sponsorisée</p>
            </div>
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
              v-if="$auth.loggedIn && $auth.user.user.id === item.ower.id"
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
          <hr class="border-primary" />
          <div class="block-itm d-flex py-2">
            <div class="w-65 d-flex align-start">
              <img
                class="mr-2 pt-1"
                src="~/static/icons/default/location.svg"
                alt=""
              />
              <p class="text-primary font12">
                {{ item.ower.adress }}
              </p>
            </div>
            <div class="position-relative">
              <p v-if="item.dossier_id" class="text-primary font12">
                A partir de<span class="text-secondary font14 pl-1 font-bold">
                  {{
                    item.dossier
                      ? item.dossier.prix_journalier.toLocaleString()
                      : ""
                  }}
                  Ar/jour
                </span>
              </p>
              <p v-else class="text-primary font12">
                Expiré le
                <span class="text-secondary font-bold">
                  {{ $moment(item.date_launch).format("D MMMM YYYY") }}
                </span>
              </p>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm py-2">
            <div class="w-65 d-flex align-center">
              <v-btn class="font12 no-shadow min-w-0 px-2" color="secondary">
                {{ item.dossier ? item.dossier.place : "" }}
                <v-icon size="15" v-if="!item.dossier"> mdi-check </v-icon>
              </v-btn>
              <p v-if="item.dossier" class="text-primary font12 pl-2">Places</p>
              <p v-else class="text-primary font12 pl-2">{{ item.url }}</p>
            </div>
            <div v-if="item.dossier" class="list-itineraire my-1">
              <div>
                <div class="item-itineraire d-flex py-1">
                  <p class="font12 text-primary w-65 font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ item.dossier ? item.dossier.nomber_porte : "" }} porte(s)
                  </p>
                  <p class="font12 text-primary limite1-lign font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    Airbags
                  </p>
                </div>
                <div class="item-itineraire d-flex py-1">
                  <p class="font12 text-primary w-65 font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ item.dossier ? item.dossier.energie : "" }}
                  </p>
                  <p class="font12 text-primary limite1-lign font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ item.dossier ? item.dossier.disponibility : "" }}
                  </p>
                </div>
                <div class="item-itineraire d-flex py-1">
                  <p class="font12 text-primary w-65 font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ item.dossier ? item.dossier.option : "" }}
                  </p>
                  <p class="font12 text-primary limite1-lign font-bold">
                    <v-icon color="primary" size="15" class="pr-1">
                      mdi-check
                    </v-icon>
                    {{ item.dossier ? item.dossier.option_vitesse : "" }}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="list-itineraire my-1">
              <p class="text-primary font12 limite9-lign">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="d-flex align-center justify-between pb-4 flex-boutton-bottom1"
        >
          <div class="d-flex align-center flex-vue-accueil">
            <div class="d-flex align-center pr-6">
              <p
                v-if="item.dossier"
                class="text-primary font12 limite1-lign mr-3"
              >
                Carburant :
                <span class="text-secondary font-bold">{{
                  item.dossier ? item.dossier.politique_carburant : ""
                }}</span>
              </p>
            </div>
            <div class="d-flex align-center pr-6">
              <a
                class="text-primary font12 h-fit-content limite1-lign"
                :href="'tel:' + item.phone_number"
              >
                <v-icon color="primary" class="mt-n1" size="15">
                  mdi-phone
                </v-icon>
                <span class="text-secondary font-bold">
                  {{ item.phone_number }}
                </span>
              </a>
            </div>
          </div>
          <v-btn
            v-if="$auth.loggedIn && $auth.user.user.id != item.ower.id"
            color="secondary"
            class="font12"
            @click="contacter()"
          >
            {{ "JE SUIS INTERESSE" }}
          </v-btn>
          <div class="d-flex" v-else>
            <v-btn color="secondary" @click="makedelete()" class="font12">
              SUPPRIMER
            </v-btn>
            <v-btn color="primary" @click="modify()" class="font12 ml-2">
              MODIFIER
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
export default {
  props: ["item"],
  methods: {
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    contacter() {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: this.item.ower.id,
          name: this.item.ower.cooperative_name
            ? this.item.ower.cooperative_name
            : this.item.ower.lastname,
          img: this.item.ower.profiluser
            ? this.item.ower.profiluser.picture
            : "~/static/icons/default/default.webp",
        },
      });
    },
    modify() {
      this.$router.push({
        name: "publicity-modify-id",
        params: {
          id: this.item.id,
        },
      });
    },
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
            .post("/api/publicity/make-delete/" + this.item.id)
            .then((res) => {
              if (res.data.success) {
                this.$emit("deleted", this.item.id);
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
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/itemcooperative.scss";
.img-vehicule-cooperative {
  .enlign {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #3f8d0c;
    bottom: 10px;
    right: 10px;
    border-radius: 50%;
    border: 1px #fff solid;
  }
}
</style>

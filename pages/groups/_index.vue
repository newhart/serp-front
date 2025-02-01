<template>
  <div class="">
    <v-card class="card-default pa-3">
      <v-img
        height="300"
        width="100%"
        :src="detail.image ? detail.image : null"
        :lazy-src="detail.image ? detail.image : null"
        class="responsive-image-dashboard"
        :class="detail.image ? '' : 'placeholder-wave'"
      >
        <div class="d-flex direction-column justify-between h-100">
          <div
            class="d-flex justify-end align-center pt-4 pr-2"
            v-if="detail.ower_id === $auth.user.user.id"
          >
            <v-menu
              bottom
              left
              origin="center center"
              transition="scale-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2"
                  rounded
                  fab
                  dark
                  small
                  color="primary"
                >
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
          <div v-else></div>
          <div
            class="d-flex justify-between align-center pb-4 pl-4 pr-2 flex-res-account"
          >
            <div class="d-flex align-center item-pers">
              <v-badge
                bordered
                bottom
                color="#fff"
                offset-x="15"
                offset-y="15"
                :class="'badge-enlignProfile'"
              >
                <!-- v-if="idAuth == id"  -->
                <template v-slot:badge>
                  <div
                    :class="
                      detail && detail.owner && detail.owner.status === 'online'
                        ? 'enlignProfile'
                        : 'enlignProfile bg-grid'
                    "
                  ></div>
                </template>
                <v-avatar style="border-radius: 20px !important" size="84">
                  <v-img
                    :src="detail.owner ? detail.owner.profiluser.picture : ''"
                    :class="detail.image ? '' : 'placeholder'"
                  >
                  </v-img>
                </v-avatar>
              </v-badge>
              <div class="detailspers ml-3">
                <p class="limite1-lign text-white my-0 my-1">
                  {{ detail.title ? detail.title : "Chargement..." }}
                </p>
                <p class="font10 text-white">
                  <i class="fa-solid fa-user text-secondary pr-1"></i>
                  {{ detail.countmember ? detail.countmember : "..." }} membres
                </p>
              </div>
            </div>
            <div class="d-flex align-center my-3">
              <v-btn
                color="primary"
                rounded
                class="font12 mr-3"
                :disabled="text === 'Chargement ...'"
                @click="liveOrRemove()"
              >
                {{ text }}
              </v-btn>
              <v-menu
                bottom
                left
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="dark"
                    rounded
                    class="font12 mr-3"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ detail ? detail.confindetiality : "..." }}
                  </v-btn>
                </template>

                <v-list-item-content class="justify-center py-1 bg-secondary">
                  <ul class="list-item-menu">
                    <li class="cursor-pointor mb-2 font12 text-white">
                      Public
                    </li>
                    <hr class="widthplusdesconnect my-0" />
                    <li class="cursor-pointor mt-2 font12 text-white">Privé</li>
                  </ul>
                </v-list-item-content>
              </v-menu>
            </div>
          </div>
        </div>
      </v-img>
      <div class="d-flex content-bio">
        <div
          class="text-white bg-primary font12 d-flex align-center justify-between bio"
        >
          Description
        </div>
        <p class="text-primary font12 py-2">{{ detail.description }}</p>
      </div>
      <hr class="border-primary mb-3" />
      <FrontActualityCreatePub
        v-if="detail.ismember"
        :id_group="detail.id"
        @status="changeStatus"
        @newPub="changeNewPub"
      />
      <div class="list-publication">
        <div
          v-if="statusCreatePub === 'importation'"
          class="importation item-publication card"
        >
          <p class="font12 text-primary mb-2">
            Importation de votre publication...
          </p>
          <v-progress-linear
            color="secondary"
            indeterminate
          ></v-progress-linear>
        </div>
        <div v-if="items">
          <div v-if="items.length > 0">
            <div v-for="(item, index) in items" :key="index">
              <FrontActualityItemPublication
                @verDetailsPers="verDetailsPers"
                :typeAffichage="typeAffichage"
                :item="item"
                @newUpdate="newUpdate"
              />
            </div>
            <infinite-loading
              v-if="items && items.length > 4"
              spinner="bubbles"
              @infinite="pagination"
            >
              <div slot="no-results" class="text-secondary">
                Il n'y a plus de résultat
              </div>
              <div slot="no-more" class="text-secondary">
                Il n'y a plus de données
              </div>
            </infinite-loading>
          </div>
          <div class="no-pub" v-else>
            <v-icon color="secondary" size="60"> mdi-newspaper-remove </v-icon>
            <p class="mt-2">Aucune publication disponible pour le moment.</p>
          </div>
        </div>
        <div v-else class="item-publication card">
          <div class="load-pub">
            <v-progress-circular
              :width="3"
              color="secondary"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export default {
  head: {
    titleTemplate: "R23 - Actualités en temps réel à Madagascar",
  },
  data() {
    return {
      statusCreatePub: null,
      TableList: [],
      indexShare: null,
      typeAffichage: "publication",
      stocked: false,
      changeFilter: false,
      items: null,
      typeFiltre: "all",
      detail: {
        title: null,
        description: null,
        image: null,
      },
      text: "Réjoindre le groupe",
      page: 1,
    };
  },
  async fetch() {
    // get all content for the  group
    const response = await this.$axios.get(
      `api/groups/${this.$route.params.index}`
    );
    if (Object.keys(response.data).length === 0) {
      this.$nuxt.context.error({
        status: 404,
        message: "Post not found",
      });
      return false;
    }
    this.detail = response.data;

    this.text = response.data.ismember
      ? "Quitter le groupe"
      : "Réjoindre le groupe";
    this.items = [];
    response.data.actualites.forEach((element) => {
      this.items.push({
        id: element.id,
        background: element.background,
        typePublication:
          element.images.length > 0 || element.background_id
            ? "publication"
            : "text",
        images: element.images,
        content: element.content,
        ower: element.owner,
        created_at: element.created_at,
        comments: element.comments,
        commentscount: element.commentscount,
        countlike: element.countlike,
        hasLiked: element.hasLiked,
      });
    });
  },
  methods: {
    newUpdate(e) {
      this.items.forEach((element) => {
        if (element.id === e.id) {
          (element.id = e.id),
            (element.typePublication =
              e.images.length > 0 || e.background_id ? "publication" : "text"),
            (element.images = e.images),
            (element.content = e.content),
            (element.ower = e.owner),
            (element.created_at = e.created_at),
            (element.comments = e.comments),
            (element.commentscount = e.commentscount),
            (element.countlike = e.countlike),
            (element.hasLiked = e.hasLiked),
            (element.group = e.group);
        }
      });
    },
    pagination($state) {
      this.page++;
      this.$axios
        .get(`api/groups/${this.$route.params.index}`, {
          params: {
            page: this.page,
          },
        })
        .then((res) => {
          res.data.actualites.forEach((element) => {
            this.items.push({
              id: element.id,
              background: element.background,
              typePublication:
                element.images.length > 0 || element.background_id
                  ? "publication"
                  : "text",
              images: element.images,
              content: element.content,
              ower: element.owner,
              created_at: element.created_at,
              comments: element.comments,
              commentscount: element.commentscount,
              countlike: element.countlike,
              hasLiked: element.hasLiked,
            });
          });
          if (res.data.actualites.length > 0) {
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    changeStatus(e) {
      this.statusCreatePub = e;
    },
    modify() {
      this.$router.push({
        name: "groups-modify-id",
        params: {
          id: this.detail.id,
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
            .post("api/groups/delete", {
              group_id: this.detail.id,
            })
            .then((res) => {
              this.$router.push({
                name: "groups-all",
              });
            })
            .catch((error) => {
              console.error(error);
            });
        },
      }).then((result) => {
        if (result.value) {
          this.$emit("removedPub", this.item.id);
          Swal.fire("Supprimé!", "Votre group a été supprimé.", "success");
        }
      });
    },
    changeNewPub(e) {
      this.items.unshift({
        id: e.id,
        background: e.background,
        typePublication:
          (e.images && e.images.length > 0) || e.background_id
            ? "publication"
            : "text",
        images: e.images ? e.images : null,
        content: e.content,
        ower: e.owner,
        created_at: e.created_at,
        comments: e.comments,
        commentscount: e.commentscount,
        countlike: 0,
        hasLiked: e.hasLiked,
      });
    },
    share(i) {
      this.indexShare = i;
      console.log(i);
    },
    scroollToTop() {
      if (
        process.client &&
        document.getElementsByClassName("centerContent")[0]
      ) {
        document.getElementsByClassName("centerContent")[0].scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    verDetailsPers() {
      this.$emit("verDetailsPers", "verDetailsPers");
    },
    liveOrRemove() {
      this.text = "Chargement ...";
      if (this.detail.ismember) {
        if (this.detail.ower_id === this.$auth.user.user.id) {
          this.$axios
            .post("api/groups/delete", {
              group_id: this.detail.id,
            })
            .then((res) => {
              this.$router.push({
                name: "groups-all",
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          this.$axios
            .post("api/groups/leave", {
              group_id: this.detail.id,
            })
            .then((res) => {
              if (res.data.success) {
                this.text = "Réjoindre le groupe";
                this.$fetch();
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        this.$axios
          .post("api/groups/join", {
            group_id: this.detail.id,
          })
          .then((res) => {
            if (res.data.success) {
              this.text = "Quitter le groupe";
              this.$fetch();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/dernierinscrit.scss";
@import "~/assets/username.scss";

.ma-0.block-filtre {
  border: 1px #0321533b solid;
  margin-top: 7px !important;
}
.no-pub {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.block-filtre {
  background-color: #ffffffd9;
  border-radius: 10px;
  padding: 5px;
}
.active {
  border-radius: 8px !important;
  .text-primary {
    color: #fff;
  }
}
hr.border-primary {
  border-bottom: 1px #03215324 solid;
  border-top: none;
}
.w-plus {
  width: calc(100% + 24px);
  margin-left: -12px;
}
.bio {
  margin: 0;
  // border-radius: 15px 0 0;
  padding: 10px 20px;
  margin-right: 10px;
}
.content-bio {
  position: sticky;
  top: 0;
}
.block-global {
  border: 1px #dbe0e7 solid;
  border-radius: 10px;
  padding: 10px 15px;
}
.picture-input {
  width: 100% !important;
  height: 90px;
  margin: 0 auto;
  text-align: center;
}

.preview-container {
  width: 100% !important;
  height: 225px !important;
  max-width: 100% !important;
  z-index: 2 !important;
}
.absolute-icon {
  position: absolute !important;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.preview-container {
  max-width: none !important;
}
.enlignProfile.bg-grid {
  background-color: #ccc;
}
.transparence-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0000004d;
  z-index: -1;
}
@media (max-width: 900px) {
  .nomodifyInfo .v-input.input-global1 {
    display: none;
  }
}
@media (max-width: 867px) {
  .block-filtre .d-flex p {
    font-size: 11px;
    padding-top: 4px;
  }
}
@media (max-width: 740px) {
  .block-filtre .d-flex p {
    display: none !important;
  }
  .block-filtre .d-flex {
    justify-content: center;
  }
  .block-filtre .d-flex .mr-2 {
    margin-right: 0 !important;
  }
}
.deleted_img {
  // background-color: #00000085;
  display: none;
}
@media (max-width: 575px) {
  .block-filtre .d-flex p {
    display: none;
  }
  .block-filtre .d-flex {
    justify-content: center;
  }
  .modifyInfo .col.col-6 {
    flex: 100%;
    max-width: 100%;
  }
}
@media (max-width: 500px) {
  .responsive-image-dashboard {
    height: 200px !important;
  }
  .d-flex.justify-between.align-center.pb-4.pl-4.pr-2.flex-res-account {
    flex-direction: column;
    align-items: start !important;
    justify-content: start !important;
  }
  .none-res-500 {
    display: none;
  }
}
.img-media:hover .deleted_img {
  display: flex;
}
.img-media .deleted_img {
  position: relative;
}
.img-media .deleted_img::before {
  background: #00000085;
  content: "";
  inset: 0;
  position: absolute;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s ease-in-out;
  z-index: -1;
}

.img-media:hover .deleted_img::before {
  transform: scaleX(1);
  transform-origin: left;
}
</style>

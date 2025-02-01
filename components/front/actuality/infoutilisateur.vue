<template>
  <div>
    <div
      :class="item.typePublication === 'text' ? 'avecBorderLq' : ''"
      class="card-content-details-perso"
      v-if="item.ower"
    >
      <div class="left-details-perso">
        <v-badge
          bottom
          color="#fff"
          offset-x="18"
          offset-y="18"
          :class="'badge-enlignProfile'"
          v-if="item.group"
        >
          <template v-slot:badge>
            <v-avatar style="border-radius: 5px !important" size="30">
              <img
                class="img-user cursor-pointor"
                :src="item.ower.profiluser.picture"
                alt=""
                @click="verDetailsPers(item.ower.id)"
              />
            </v-avatar>
          </template>
          <img
            @click="verDetailsGroups(item.group.id)"
            class="img-user cursor-pointor"
            :src="item.group.image"
            alt=""
          />
        </v-badge>
        <img
          class="img-user cursor-pointor"
          :src="item.ower.profiluser.picture"
          alt=""
          v-else
          @click="verDetailsPers(item.ower.id)"
        />
        <div class="name-perso">
          <p class="font-bold">
            <span
              class="color-no text-primary limite1-lign cursor-pointor mr-2"
              v-if="item.group"
              @click="verDetailsGroups(item.group.id)"
            >
              {{ item.group.title }}
            </span>
            <span
              v-else
              class="color-no text-primary limite1-lign cursor-pointor mr-2"
              @click="verDetailsPers(item.ower.id)"
            >
              {{
                item.ower.cooperative_name
                  ? item.ower.cooperative_name
                  : item.ower.lastname + " " + item.ower.name
              }}
            </span>
            <span class="d-flex align-center min-w-fit-content">
              <span class="text-secondary d-flex align-center"
                ><v-icon class="pr-1" size="20">mdi-new-box</v-icon>
                {{
                  item.group
                    ? "Groupe"
                    : "Publié le " +
                      $moment(item.created_at).format("D MMMM YYYY")
                }}
              </span>
              <span class="text-secondary pl-1 font-normal">
                {{ item.group ? "(" + item.group.confindetiality + ")" : "" }}
              </span>
            </span>
          </p>
          <p class="details-localisation">
            <v-icon size="20">
              {{ item.group ? "mdi-account" : "mdi-map-marker" }}
            </v-icon>

            <span class="limite1-lign font12">
              {{
                item.group
                  ? item.ower.cooperative_name
                    ? item.ower.cooperative_name
                    : item.ower.lastname + " " + item.ower.name
                  : item.ower.adress
              }}</span
            >
          </p>
        </div>
      </div>
      <div class="right-reaction-publication">
        <v-badge
          class="cursor-pointor mx-4 badge-act"
          :color="countlike > 0 ? '#E42C4B' : 'transparent'"
          :content="countlike > 0 ? countlike : null"
        >
          <v-icon
            @click="like(item.id)"
            color="secondary"
            class="cursor-pointor reaction-image"
          >
            {{ hasLiked ? "mdi-heart" : "mdi-heart-outline" }}
          </v-icon>
        </v-badge>
        <v-badge
          class="cursor-pointor mx-4 badge-act"
          :color="
            comments_count + CountNewComment > 0 ? '#E42C4B' : 'transparent'
          "
          :content="
            comments_count + CountNewComment > 0
              ? comments_count + CountNewComment
              : null
          "
        >
          <v-icon color="primary" class="cursor-pointor reaction-image">
            mdi-comment-text
          </v-icon>
        </v-badge>
        <!-- <v-badge
          class="cursor-pointor mx-4 badge-act"
          color="#E42C4B"
          content="50"
          @click="opermodal()"
        >
          <v-icon color="primary" class="cursor-pointor reaction-image">
            mdi-share-circle
          </v-icon>
        </v-badge> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "CountNewComment", "target_img"],
  data() {
    return {
      PartagePub: false,
      PartageIngroup: false,
      PartageInamis: false,
      EnvoyeMessage: false,
      OtherOption: false,
      hasLiked: false,
      countlike: 0,
      infoUser: {
        name: "Julius Romano",
        typeUser: "Cooperative",
        ville: "Antananarivo",
        quartier: "Amboditsiry",
        pdp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9oFxkN4-08HOPBDkAwEmUjy-hIfCsrprpwA&usqp=CAU",
      },
      comments_count: 0,
    };
  },
  methods: {
    verDetailsPers(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    verDetailsGroups(id) {
      this.$router.push({
        name: "groups",
        params: {
          index: id,
        },
      });
    },
    like(id) {
      this.hasLiked = !this.hasLiked;
      if (this.hasLiked) {
        this.countlike++;
      } else {
        this.countlike--;
      }
      this.$axios
        .post("api/actualites/toggle-like", {
          id: this.target_img ? this.target_img.id : id,
          type: this.target_img ? "actualiteImage" : "actiality",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    opermodal() {
      this.PartagePub = !this.PartagePub;
    },
    dismissModale() {
      (this.PartagePub = false),
        (this.PartageIngroup = false),
        (this.PartageInamis = false),
        (this.EnvoyeMessage = false),
        (this.OtherOption = false);
    },
    shareInWatch(e) {
      if (e === "mur") {
        this.$emit("share", this.i);
        this.PartagePub = false;
      }
      if (e === "group") {
        this.PartagePub = false;
        this.PartageIngroup = true;
      }
      if (e === "amis") {
        this.PartagePub = false;
        this.PartageInamis = true;
      }
      if (e === "other") {
        this.PartagePub = false;
        this.OtherOption = true;
      }
    },
    EnvoyeMesg() {
      this.PartagePub = false;
      this.PartageIngroup = false;
      this.PartageInamis = false;
      this.EnvoyeMessage = true;
    },
    verDetailsPers() {
      this.$emit("verDetailsPers", "verDetailsPers");
    },
  },
  watch: {
    item: {
      handler(value) {
        if (value) {
          this.hasLiked = value.hasLiked;
          this.countlike = value.countlike;
          this.comments_count = value.commentscount;
        }
      },
      immediate: true,
    },
    target_img: {
      handler(value) {
        if (value) {
          this.hasLiked = value.hasLiked;
          this.countlike = value.countlike;
          this.comments_count = value.commentscount;
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.image {
  height: 430px;
}
.reaction-image {
  width: 25px;
  height: 25px;
  object-fit: contain;
}
img.img-user.h-100.w-100 {
  width: 100% !important;
  height: 100% !important;
  border-radius: 10px !important;
}
.circle {
  border-radius: 50% !important;
  height: 81px !important;
  width: 81px;
}
.card-content-details-perso {
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
  padding: 0 15px;
  padding-bottom: 15px;
  margin-bottom: -13px;
  .left-details-perso {
    display: flex;
    align-items: center;
    width: 100%;
    z-index: 0;
    .img-user {
      width: 70px;
      min-width: 70px;
      height: 70px;
      border-radius: 15px;
      border: 1.5px solid #fff;
      object-fit: cover;
      // background-color: #275ba7;
    }
    .name-perso {
      margin-top: 10px;
      p {
        margin-left: 8px;
        display: flex;
        align-items: center;
        width: 100%;
        img {
          margin: 0 5px;
          max-width: 15px;
          max-height: 15px;
        }
        span.color-no {
          font-weight: bold;
          display: block;
          width: fit-content;
        }
      }
    }
    p.details-localisation {
      display: flex;
      align-items: center;
      margin-top: 8px;
      span {
        color: #8e8e8e;
      }
      img.flag-gl {
        margin: 0 10px;
      }
      span.limite1-lign.namepay {
        max-width: calc(50% - 30px);
      }
    }
  }
  .right-reaction-publication {
    display: flex;
    align-items: center;
    margin-top: 15px;
    .reaction {
      width: 51px;
      height: 51px;
      background: #fff;
      filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.16));
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px 8px 8px;
      .count-react {
        position: absolute;
        bottom: -9px;
        right: -7px;
        width: 27px;
        height: 27px;
        background: transparent;
        font-size: 12px;
        color: #ec3338;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 50%;
      }
      i {
        font-size: 30px;
      }
    }
  }
}
.avecBorderLq {
  border: 1px #ececec solid;
  border-top: none;
  padding-bottom: 20px !important;
}
@media (max-width: 500px) {
  .reaction-image {
    width: 15px;
    height: 15px;
  }
  .card-content-details-perso {
    display: flex;
    justify-content: space-between;
    margin-top: -10px;
    padding: 0 5px;
    padding-bottom: 13px;
    margin-bottom: -11px;
  }
}
</style>

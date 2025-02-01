<template>
  <div class="card-content-details-comments">
    <div class="flex-comment mb-3">
      <p class="font12">{{ commentscountnew }} commentaire(s)</p>
      <p
        class="cursor-pointor font12"
        v-if="!details"
        @click="voirCommentaire()"
      >
        Voir plus
      </p>
    </div>
    <div class="list-comments">
      <!-- display all content in comment  -->
      <div
        v-for="(item_comment, index) in all_comments"
        :key="index"
        class="item-comments"
      >
        <img
          class="img-comment cursor-pointor"
          :src="item_comment.owner.profiluser.picture"
          alt=""
          @click="verDetailsPers(item_comment.owner.id)"
        />
        <div class="details-coments-gl">
          <div class="top-details-cons">
            <p
              @click="verDetailsPers(item_comment.owner.id)"
              class="limite1-lign cursor-pointor font-bold text-primary"
            >
              {{
                item_comment.owner.cooperative_name
                  ? item_comment.owner.cooperative_name
                  : item_comment.owner.lastname + " " + item_comment.owner.name
              }}
            </p>
            <p class="font12 hours">
              {{ $dayjs(item_comment.created_at).fromNow() }}
            </p>
          </div>
          <div class="font14 bg-comments position-relative">
            <FrontActualityModifyComment
              :item_comment="item_comment"
              v-if="itemmakemodify && itemmakemodify.id === item_comment.id"
              @CommentUpdated="CommentUpdated"
            />
            <div v-else>
              {{ item_comment.content }}
            </div>
            <v-menu
              bottom
              right
              origin="center center"
              transition="scale-transition"
              v-if="
                $auth.user.user.id === item_comment.owner.id ||
                $auth.user.user.id === item.ower.id
              "
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  class="trois-point-coms"
                  size="17"
                  v-if="
                    !itemmakemodify ||
                    (itemmakemodify && itemmakemodify.id !== item_comment.id)
                  "
                >
                  mdi-dots-vertical
                </v-icon>
                <v-icon
                  color="secondary"
                  class="trois-point-coms"
                  size="17"
                  v-else
                  @click="itemmakemodify = null"
                >
                  mdi-close
                </v-icon>
              </template>

              <v-list-item-content class="justify-center py-1 bg-secondary">
                <ul class="list-item-menu">
                  <li
                    @click="makemodify(item_comment)"
                    class="cursor-pointor mb-2 font12 text-white"
                    v-if="$auth.user.user.id === item_comment.owner.id"
                  >
                    Modifier
                  </li>
                  <hr
                    v-if="$auth.user.user.id === item_comment.owner.id"
                    class="widthplusdesconnect my-0"
                  />
                  <li
                    @click="makeDeleteComment(item_comment.id)"
                    class="cursor-pointor mt-2 font12 text-white"
                  >
                    Supprimer
                  </li>
                </ul>
              </v-list-item-content>
            </v-menu>
            <div class="reaction-count-coms text-right">
              <p style="color: #e42c4b" class="ml-1">
                {{ item_comment.countlike }}
              </p>
              <v-icon
                @click="like(item_comment.id)"
                size="20"
                color="secondary"
                class="ml-1 cursor-pointor"
              >
                {{ item_comment.hasLiked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
              <v-icon
                @click="replyChamp = item_comment.id"
                size="20"
                color="primary"
                class="ml-1 cursor-pointor"
              >
                mdi-comment-text
              </v-icon>
            </div>
          </div>
          <div class="row pb-1 ma-0">
            <v-col
              v-for="(item, index) in item_comment.images"
              :key="index"
              class="pa-1 img-comments"
            >
              <v-img
                :src="item.image"
                :lazy-src="item.image"
                aspect-ratio="1"
                cover
                class="bg-grey-lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey-lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </div>
          <div class="list-sous-comments">
            <div
              v-for="(item_sous_comment, index) in item_comment.reply"
              :key="index"
              class="item-comments"
            >
              <img
                class="img-comment cursor-pointor"
                :src="item_sous_comment.owner.profiluser.picture"
                alt=""
                @click="verDetailsPers(item_sous_comment.owner.id)"
              />
              <div class="details-coments-gl">
                <div class="top-details-cons">
                  <p
                    @click="verDetailsPers(item_sous_comment.owner.id)"
                    class="limite1-lign cursor-pointor font-bold text-primary"
                  >
                    {{
                      item_sous_comment.owner.cooperative_name
                        ? item_sous_comment.owner.cooperative_name
                        : item_sous_comment.owner.lastname +
                          " " +
                          item_sous_comment.owner.name
                    }}
                  </p>
                  <p class="font12 hours">
                    {{ $dayjs(item_sous_comment.created_at).fromNow() }}
                  </p>
                </div>
                <div class="font14 bg-comments position-relative">
                  <FrontActualityModifyComment
                    :item_comment="item_sous_comment"
                    v-if="
                      itemmakemodify &&
                      itemmakemodify.id === item_sous_comment.id
                    "
                    @CommentUpdated="CommentUpdated"
                  />
                  <div v-else>
                    {{ item_sous_comment.content }}
                  </div>
                  <v-menu
                    bottom
                    right
                    origin="center center"
                    transition="scale-transition"
                    v-if="
                      $auth.user.user.id === item_sous_comment.owner.id ||
                      $auth.user.user.id === item.ower.id
                    "
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="secondary"
                        class="trois-point-coms"
                        size="17"
                        v-if="
                          !itemmakemodify ||
                          (itemmakemodify &&
                            itemmakemodify.id !== item_sous_comment.id)
                        "
                      >
                        mdi-dots-vertical
                      </v-icon>
                      <v-icon
                        color="secondary"
                        class="trois-point-coms"
                        size="17"
                        v-else
                        @click="itemmakemodify = null"
                      >
                        mdi-close
                      </v-icon>
                    </template>

                    <v-list-item-content
                      class="justify-center py-1 bg-secondary"
                    >
                      <ul class="list-item-menu">
                        <li
                          @click="makemodify(item_sous_comment)"
                          class="cursor-pointor mb-2 font12 text-white"
                          v-if="
                            $auth.user.user.id === item_sous_comment.owner.id
                          "
                        >
                          Modifier
                        </li>
                        <hr
                          v-if="
                            $auth.user.user.id === item_sous_comment.owner.id
                          "
                          class="widthplusdesconnect my-0"
                        />
                        <li
                          @click="
                            makeDeleteReply(
                              item_sous_comment.id,
                              item_comment.id
                            )
                          "
                          class="cursor-pointor mt-2 font12 text-white"
                        >
                          Supprimer
                        </li>
                      </ul>
                    </v-list-item-content>
                  </v-menu>
                  <div class="reaction-count-coms text-right">
                    <p style="color: #e42c4b" class="ml-1">
                      {{ item_sous_comment.countlike }}
                    </p>
                    <v-icon
                      size="20"
                      color="secondary"
                      class="ml-1 cursor-pointor"
                      @click="like(item_sous_comment.id)"
                    >
                      {{
                        item_sous_comment.hasLiked
                          ? "mdi-heart"
                          : "mdi-heart-outline"
                      }}
                    </v-icon>
                    <v-icon
                      @click="replyChamp = item_comment.id"
                      size="20"
                      color="primary"
                      class="ml-1 cursor-pointor"
                    >
                      mdi-comment-text
                    </v-icon>
                  </div>
                </div>
                <div class="row pb-1 ma-0">
                  <v-col
                    v-for="(item, index) in item_sous_comment.images"
                    :key="index"
                    cols="2"
                    class="pa-1 img-comments"
                  >
                    <v-img
                      :src="item.image"
                      :lazy-src="item.image"
                      aspect-ratio="1"
                      cover
                      class="bg-grey-lighten-2"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey-lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                </div>
              </div>
            </div>
            <div
              v-if="replyChamp === item_comment.id"
              class="send-sous-comment"
            >
              <FrontActualitySend
                :reply_id="replyChamp"
                :item="item"
                :type="'App\\Models\\Actuality'"
                :target_id="item.id"
                @newReply="newReply"
              />
            </div>
          </div>
        </div>
      </div>
      <a
        class="font12 text-underline d-flex align-center"
        v-if="details && nextPage"
        @click="pagination()"
      >
        Voir plus
        <v-progress-circular
          size="20"
          class="ml-2"
          indeterminate
          v-if="loadingPagination"
          color="primary"
        ></v-progress-circular>
      </a>
      <a
        class="font12 text-underline"
        v-else-if="commentscountnew - all_comments.length > 0 && !details"
        @click="voirCommentaire()"
      >
        Voir {{ commentscountnew - all_comments.length }} autres commentaires
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "item",
    "commentscount",
    "ContentNewComment",
    "details",
    "type",
    "is_image",
  ],
  data() {
    return {
      itemmakemodify: null,
      all_comments: [],
      commentscountnew: 0,
      replyChamp: null,
      page: 0,
      loadingPagination: false,
      nextPage: true,
      ItemCommentUpdated: null,
    };
  },
  methods: {
    CommentUpdated(e) {
      this.ItemCommentUpdated = e;
      if (this.ItemCommentUpdated.parent_id === null) {
        this.all_comments.forEach((element) => {
          if (this.ItemCommentUpdated.id === element.id) {
            element.content = this.ItemCommentUpdated.content;
          }
        });
      } else {
        this.all_comments.forEach((element) => {
          if (this.ItemCommentUpdated.parent_id === element.id) {
            element.reply.forEach((element1) => {
              if (this.ItemCommentUpdated.id === element1.id) {
                element1.content = this.ItemCommentUpdated.content;
              }
            });
          }
        });
      }
      this.itemmakemodify = null;
    },
    voirCommentaire() {
      this.$emit("voirCommentaire", true);
    },
    makemodify(item) {
      this.itemmakemodify = item;
    },
    makeDeleteComment(id) {
      this.all_comments = this.all_comments.filter((itm) => itm.id !== id);
      if (this.commentscountnew > 0) {
        this.commentscountnew--;
      }
      this.$axios
        .post("api/comments/delete", {
          id: id,
        })
        .then((res) => {});
    },
    makeDeleteReply(id, parent_id) {
      this.all_comments.forEach((element) => {
        if (parent_id === element.id) {
          element.reply = element.reply.filter((itm) => itm.id !== id);
        }
      });
      this.$axios
        .post("api/comments/delete", {
          id: id,
        })
        .then((res) => {});
    },
    verDetailsPers(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    pagination() {
      this.page++;
      this.loadingPagination = true;
      const url_id = this.is_image ? this.is_image : this.item.id;
      this.$axios
        .get(`api/actualites/comments/${url_id}`, {
          params: {
            page: this.page,
            type: this.type,
          },
        })
        .then((res) => {
          if (res.data.next_page_url) {
            this.nextPage = true;
          } else {
            this.nextPage = false;
          }
          this.loadingPagination = false;
          if (res.data.data.length === 0 || this.is_image) {
            this.all_comments = [];
          }
          res.data.data.forEach((element) => {
            this.all_comments.push(element);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    like(id) {
      this.all_comments.forEach((element) => {
        if (element.id === id) {
          element.hasLiked = !element.hasLiked;
          if (element.hasLiked) {
            element.countlike++;
          } else {
            element.countlike--;
          }
        } else {
          element.reply.forEach((element1) => {
            if (element1.id === id) {
              element1.hasLiked = !element1.hasLiked;
              if (element1.hasLiked) {
                element1.countlike++;
              } else {
                element1.countlike--;
              }
            }
          });
        }
      });
      this.$axios
        .post("api/comments/toggle-like", {
          id: id,
        })
        .then((res) => {});
    },
    verDetailsPers() {
      this.$emit("verDetailsPers", "verDetailsPers");
    },
    newReply(e) {
      this.all_comments.forEach((element) => {
        if (this.replyChamp === element.id) {
          this.commentscountnew++;
          element.reply.push(e);
          this.replyChamp = null;
        }
      });
    },
  },
  watch: {
    ContentNewComment: {
      handler(value) {
        if (value) {
          this.commentscountnew++;
          this.all_comments.unshift(value);
        }
      },
      immediate: true,
    },
    item: {
      handler(value) {
        this.commentscountnew = this.commentscount;
        if (value && !this.details) {
          this.all_comments = value.comments;
        }
      },
      immediate: true,
    },
    details: {
      handler(value) {
        if (value) {
          this.pagination();
        }
      },
      immediate: true,
    },
    is_image: {
      handler(value) {
        if (value) {
          this.page = 0;
          this.pagination();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content-details-comments {
  padding: 10px 15px;
  border: 1px #ececec solid;
  border-radius: 0 0 10px 10px;
  border-top: 0;
  margin-top: -15px;
  padding-top: 35px;
  .flex-comment {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bg-comments {
    background-color: #efefef;
    padding: 7px 12px;
    border-radius: 6px;
    width: fit-content;
    min-width: 125px;
    margin-bottom: 25px;
  }
  .reaction-count-coms {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    bottom: -25px;
  }
  .list-comments {
    .item-comments {
      display: flex;
      margin-top: 15px;
      img.img-comment {
        width: 50px;
        height: 50px;
        border-radius: 15px;
        border: 1.5px solid #c0c0c0;
        object-fit: cover;
        margin-right: 10px;
      }
      .details-coments-gl {
        width: calc(100% - 60px);
        .top-details-cons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .font14 {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }
}
.img-comments .v-image {
  border-radius: 10px;
}
@media (max-width: 500px) {
  .top-details-cons {
    margin-bottom: 5px !important;
    flex-direction: column;
    align-items: flex-start !important;
  }
  .card-content-details-comments .list-comments .item-comments img.img-comment {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  .card-content-details-comments
    .list-comments
    .item-comments
    .list-sous-comments
    img.img-comment {
    width: 35px;
    height: 35px;
    border-radius: 8px;
  }
  .font12.hours {
    font-size: 10px !important;
  }
}
</style>

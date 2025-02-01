<template>
  <div v-if="discussionFloating.length > 0">
    <div class="conversationNOw">
      <div class="list-conversation">
        <v-expansion-panels accordion v-model="expendDiskute">
          <div
            class="item-scrol"
            v-for="(itemDiscussionFloating, i) in discussionFloating"
            :key="i"
          >
            <v-expansion-panel>
              <v-expansion-panel-content class="contentSansPanding">
                <FrontMessageItemConversation
                  :targetuser="itemDiscussionFloating.target_user"
                  :index="i"
                  @itemcollapse="itemcollapse"
                  v-if="discussionFloating.length > 0"
                />
              </v-expansion-panel-content>

              <div
                :class="expendDiskute === i ? 'd-none' : 'd-flex'"
                class="item-demande-amis my-1 align-center justify-between w-fit-content"
              >
                <img
                  :src="itemDiscussionFloating.target_user.img"
                  alt=""
                  class="mr-0"
                />
                <div class="action d-flex align-center">
                  <v-expansion-panel-header expand-icon="" ripple>
                    <v-icon size="35" class="cursor-pointor">
                      mdi-chevron-up
                    </v-icon>
                  </v-expansion-panel-header>
                  <v-btn @click="removeDiscussionFloating(i)" icon>
                    <v-icon color="secondary" size="25" class="cursor-pointor">
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </v-expansion-panel>
          </div>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["asset"],
  data() {
    return {
      menuActive: "discussion",
      expendDiskute: "",
      contentMessageSend: "",
      discussionMessage: [
        {
          typeUser: "you",
          typeMessage: "",
          Description: "Bonjour",
        },
        {
          typeUser: "me",
          typeMessage: "",
          Description: "Bonjour",
        },
        {
          typeUser: "you",
          typeMessage: "",
          Description: "Comment allez-vous?",
        },
        {
          typeUser: "me",
          typeMessage: "",
          Description: "Très bien et vous?",
        },
        {
          typeUser: "you",
          typeMessage: "",
          Description:
            "J'aimerai discuter avec vous à propos de ce réseaux social diskuteo",
        },
        {
          typeUser: "me",
          typeMessage: "",
          Description: "Qu'est-ce que vous souhaitez savoir ?",
        },
        {
          typeUser: "you",
          typeMessage: "EntraineEcrire",
          Description: "",
        },
      ],
      discussionFloating: null,
    };
  },
  methods: {
    showMenu(e) {
      this.menuActive = e;
    },
    itemcollapse(e) {
      this.expendDiskute = "";
    },
    sendMessage() {
      this.discussionMessage.push({
        typeUser: "me",
        typeMessage: "",
        Description: this.contentMessageSend,
      });
      this.contentMessageSend = "";
      setTimeout(() => {
        // this.scroollToBottom();
      }, 500);
    },
    verMessage() {
      this.overlay = true;
    },
    async scroollToBottom() {
      if (document.getElementById("content-chat-" + this.expendDiskute)) {
        await document
          .getElementById("content-chat-" + this.expendDiskute)
          .scrollTo({
            top: document.getElementById("list-message-" + this.expendDiskute)
              .clientHeight,
            behavior: "smooth",
          });
      }
    },
    removeDiscussionFloating(index) {
      this.$store.commit("chat/deletediscussionActiveFloatant", index);
    },
  },
  async mounted() {
    // await this.scroollToBottom();
  },
  watch: {
    expendDiskute: {
      handler(type) {
        setTimeout(() => {
          // this.scroollToBottom();
        }, 500);
      },
      immediate: true,
    },
    "$store.state.chat.discussionActiveFloatant": {
      handler(value) {
        this.discussionFloating = value;
        this.expendDiskute = this.discussionFloating.length - 1;
        this;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-demande-amis {
  width: 100%;
  height: fit-content;
  background: #fff;
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.16));
  border-radius: 20px;
  padding: 10px;
  border: 1px rgba(0, 0, 0, 0.16) solid;
}

.v-expansion-panels .v-expansion-panel {
  box-shadow: none !important;
}
.v-expansion-panel-content__wrap {
  padding: 0 0 5px 0;
}
.item-scrol {
  max-width: 335px;
  padding: 0 5px;
  width: fit-content !important;
}
.activeMenu {
  border-bottom: 3px #ff3354 solid;
}
.item-demande-amis.active {
  pointer-events: none;
}
.v-item-group.v-expansion-panels {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-items: flex-end;
  justify-content: flex-end;
}
.item-demande-amis img {
  width: 45px;
  height: 45px;
  // min-width: 45px;
  object-fit: cover;
  border-radius: 15px;
  margin-right: 15px;
}

.v-expansion-panel-content__wrap {
  padding-bottom: 5px !important;
}
.actifContact {
  width: 15px;
  height: 15px;
  background: #00dc07;
  border-radius: 50%;
}
.v-expansion-panel-header {
  padding: 0;
  border: none !important;
  box-shadow: none !important;
  border-radius: 20px !important;
}
.font18 img {
  margin-right: 0;
  width: 18px;
  height: 18px;
  object-fit: contain;
  padding-right: 5px;
}
.v-expansion-panel::before,
.v-expansion-panel-header::before,
.v-expansion-panel-header::after,
.v-expansion-panel:after {
  display: none !important;
}
.v-expansion-panel-content__wrap {
  padding: 0;
}
img.img-in-chat {
  width: 35px !important;
  height: 35px !important;
  border-radius: 10px !important;
}
.v-expansion-panels .v-expansion-panel {
  background-color: transparent !important;
}
.list-message {
  height: fit-content;
}
.card-content-details-pub.form-send-comments {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .send-coms {
    color: #032153 !important;
  }
}
.img-in-chat {
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 5px;
}
.description-text {
  padding: 10px;
  border-radius: 12px;
  max-width: 75%;
}
.content-chat {
  padding-right: 10px;
  overflow-y: auto;
  max-height: 310px;
  min-height: 310px;
}
hr.widthplus {
  width: calc(100% + 20px);
  margin-left: -10px;
  border-color: #a9a9a926;
  border-bottom: 0;
}
</style>

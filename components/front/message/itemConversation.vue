<template>
  <div :class="!nextpage ? 'nullnextpage' : ''" class="position-relative">
    <Chat
      :participants="participants"
      :myself="myself"
      :selfOthers="selfOthers"
      :messages="messages"
      :chat-title="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :border-style="borderStyle"
      :hide-close-button="hideCloseButton"
      :close-button-icon-size="closeButtonIconSize"
      :submit-icon-size="submitIconSize"
      :submit-image-icon-size="24"
      :load-more-messages="messages.length > 0 ? loadMoreMessages : null"
      :link-options="linkOptions"
      :async-mode="asyncMode"
      :scroll-bottom="scrollBottom"
      :display-header="true"
      :send-images="true"
      :acceptImageTypes="acceptImageTypes"
      :profile-picture-config="profilePictureConfig"
      :timestamp-config="timestampConfig"
      @onImageClicked="onImageClicked"
      @onImageSelected="onImageSelected"
      :viewed="viewed"
      @onMessageSubmit="onMessageSubmit"
      @onType="onType"
      @onClose="onClose"
    >
      <template v-slot:header>
        <!-- <v-btn icon>
          <v-icon color="primary"> mdi-dots-vertical </v-icon>
        </v-btn> -->
        <div class="py-3 d-flex justify-between align-center w-100">
          <div class="d-flex profile-user">
            <img :src="selfOthers.profilePicture" alt="" class="img-user" />
            <div class="details">
              <p class="custom-title limite1-lign">
                {{ selfOthers.name }}
              </p>
              <p class="custom-title font12">En ligne</p>
            </div>
          </div>
          <div class="d-flex align-center">
            <v-btn @click="itemcollapse()" icon class="action-chate1">
              <v-icon class="text-white"> mdi-chevron-down </v-icon>
            </v-btn>
            <v-btn @click="closeChat()" icon class="action-chate">
              <v-icon class="text-white"> mdi-close </v-icon>
            </v-btn>
          </div>
        </div>
      </template>
    </Chat>
  </div>
</template>
<script>
import { Chat } from "vue-quick-chat";
import "vue-quick-chat/dist/vue-quick-chat.css";
export default {
  props: ["targetuser", "index"],
  components: {
    Chat,
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
      visible: true,
      acceptImageTypes: "image/*",
      participants: [
        {
          name: this.targetuser.name,
          id: this.targetuser.id,
          profilePicture: this.targetuser.img,
        },
        {
          name: this.$auth.user.user.cooperative_name
            ? this.$auth.user.user.cooperative_name
            : this.$auth.user.user.lastname,
          id: this.$auth.user.user.id,
          profilePicture: this.$auth.user.user.profiluser
            ? this.$auth.user.user.profiluser.picture
            : "/icons/default/default.webp",
        },
      ],
      myself: {
        name: this.$auth.user.user.cooperative_name
          ? this.$auth.user.user.cooperative_name
          : this.$auth.user.user.lastname,
        id: this.$auth.user.user.id,
        profilePicture: this.$auth.user.user.profiluser
          ? this.$auth.user.user.profiluser.picture
          : "/icons/default/default.webp",
      },
      selfOthers: {
        name: this.targetuser.name,
        id: this.targetuser.id,
        profilePicture: this.targetuser.img,
      },
      messages: [],
      chatTitle: "My chat title",
      placeholder: "Votre message...",
      viewed: false,
      colors: {
        header: {
          bg: "#032153",
          text: "#fff",
        },
        message: {
          myself: {
            bg: "#032153",
            text: "#fff",
          },
          others: {
            bg: "#e3e3e3",
            text: "#000",
          },
          messagesDisplay: {
            bg: "#f7f3f3",
          },
        },
        submitIcon: "#032153",
        submitImageIcon: "#032153",
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: true,
      submitIconSize: 25,
      closeButtonIconSize: "20px",
      asyncMode: true,
      toLoad: [],
      scrollBottom: {
        messageSent: true,
        messageReceived: true,
      },
      displayHeader: true,
      profilePictureConfig: {
        others: true,
        myself: true,
        styles: {
          width: "40px",
          height: "40px",
          borderRadius: "10px",
        },
      },
      timestampConfig: {
        format: "HH:mm",
        relative: true,
      },
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function (e) {
              window.open(e.target.href, "_blank", "noreferrer");
            },
            mouseover: function (e) {
              // alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function (e) {
              window.open(e, "_blank", "noreferrer");
            },
            mouseover: function (e) {
              // alert("Link hovered!");
            },
          },
          format: function (value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          },
        },
      },
      nextpage: null,
      prevpage: null,
      page: 10,
      tempMessage: null,
      image: null,
    };
  },
  methods: {
    seeMessage(e) {
      if (this.$auth.user.user.id != e) {
        this.$axios
          .post(`/api/messenger/ajax/make-seen`, {
            withId: e,
          })
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    },
    onType: function (event) {
      //here you can set any behavior
    },
    itemcollapse() {
      this.$emit("itemcollapse", this.index);
    },
    loadMoreMessages(resolve) {
      if (this.nextpage) {
        this.getAllDiscussion();
        document
          .getElementsByClassName("container-message-display")[0]
          .scrollTo({
            top: 100,
          });
      }
    },
    closeChat() {
      this.$store.commit("chat/deletediscussionActiveFloatant", this.index);
    },
    onMessageSubmit: function (message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      this.$axios
        .post(`/api/messenger/send`, {
          withId: this.selfOthers.id,
          message: message.content,
        })
        .then((res) => {
          message.uploaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClose() {
      this.visible = false;
    },
    handelPreviewFile(event) {
      const that = this;
      if (event.file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result;
          this.sendImage();
        };
        reader.readAsDataURL(event.file);
      }
    },
    sendImage() {
      this.$axios
        .post(`/api/messenger/send`, {
          withId: this.selfOthers.id,
          message: this.image,
          type: "image",
        })
        .then((res) => {
          this.messages.at(-1).uploaded = true;
          this.messages.at(-1).src = res.data.message.message;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onImageSelected(files, message) {
      this.messages.push(files.message);
      this.handelPreviewFile(files);
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
    },
    getAllDiscussion() {
      this.$axios
        .get(`/api/messenger/all-discussion/${this.targetuser.id}/${this.page}`)
        .then((res) => {
          this.page = this.page + 10;
          this.messages = [];
          this.nextpage = res.data.pagination.next_page_url;
          res.data.alldiscussion.forEach((item) => {
            this.messages.push({
              content: item.type === "image" ? "Image" : item.message,
              src: item.type === "image" ? item.message : null,
              myself: item.sender_id === this.$auth.user.user.id,
              participantId: item.sender_id,
              timestamp: {
                year: this.$moment(item.created_at).format("YYYY"),
                month: this.$moment(item.created_at).format("MM"),
                day: this.$moment(item.created_at).format("DD"),
                hour: this.$moment(item.created_at).format("HH"),
                minute: this.$moment(item.created_at).format("mm"),
                second: this.$moment(item.created_at).format("ss"),
                millisecond: 0,
              },
              type: item.type,
              uploaded: true,
            });
            if (item.is_seen) {
              this.viewed = true;
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getAllDiscussion();
    // this.$echo.private("message").listen(".chat-channel", (message) => {
    //   if (process.client) {
    //     if (
    //       this.$auth.user.user.id !== message.message.sender_id &&
    //       message.message.sender_id === this.selfOthers.id
    //     ) {
    //       // if (this.myself.id !== message.message.sender_id) {
    //       //   console.log("okok");
    //       //   this.seeMessage(this.selfOthers.id);
    //       // }
    //       this.messages.push({
    //         content:
    //           message.message.type === "image"
    //             ? "Image"
    //             : message.message.message,
    //         src:
    //           message.message.type === "image" ? message.message.message : null,
    //         myself: message.message.sender_id === this.$auth.user.user.id,
    //         participantId: message.message.sender_id,
    //         timestamp: {
    //           year: this.$moment(message.message.created_at).format("YYYY"),
    //           month: this.$moment(message.message.created_at).format("MM"),
    //           day: this.$moment(message.message.created_at).format("DD"),
    //           hour: this.$moment(message.message.created_at).format("HH"),
    //           minute: this.$moment(message.message.created_at).format("mm"),
    //           second: this.$moment(message.message.created_at).format("ss"),
    //           millisecond: 0,
    //         },
    //         type: message.message.type,
    //         uploaded: true,
    //       });
    //     }
    //   }
    // });
  },
};
</script>
<style scoped>
p.custom-title {
  color: #fff;
}
p.message-username {
  font-family: "gilroy-bold";
}
.profile-user .img-user {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 15px;
}
.container-send-message.icon-send-message {
  padding: 0px !important;
}
.quick-chat-container .container-message-manager {
  height: 55px;
}
.message-text-box {
  display: flex;
}

.container-send-message {
  margin-top: 5px !important;
}
.message-text-box {
  display: flex;
}
.quick-chat-container {
  box-shadow: 0px 2px 12px #c9c9c9c9;
}
.rounded-custom-chats {
  border-radius: 10px;
  box-shadow: 2px 3px 5px #9a9a9a70 !important;
}
.quick-chat-container {
  height: 380px;
  width: 300px;
}
.action-chate svg {
  width: 20px;
  height: 20px;
}
.header-container {
  padding-right: 5px !important;
}
.action-chate1 {
  margin: 0 5px;
}
.action-chate1 svg {
  width: 30px;
  height: 30px;
}
</style>

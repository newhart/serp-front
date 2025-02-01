<template>
  <div class="list-discussion h-100 pt-2">
    <h3 class="text-secondary font-bold px-4">Notifications</h3>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-list two-line>
          <v-list-item-group
            v-if="notifications && notifications.length > 0"
            v-model="selected"
            active-class="pink--text"
          >
            <v-divider></v-divider>
            <div v-for="(item, index) in notifications" :key="item.id">
              <v-list-item
                :class="!item.read_at ? 'not-see' : ''"
                @click="verDetailsNotification(item.type, item.data)"
              >
                <template v-slot:default="{ active }">
                  <v-list-item-avatar class="img-user" rounded="0">
                    <v-img :src="item.data.profile"></v-img>
                    <!-- <div :class="item.data.status === 'online' ? 'enlign' : 'enlign deconnecte'"></div> -->
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <p v-html="item.title"></p>
                    <!-- <div
                      v-if="
                        item.type ===
                        'App\\Notifications\\RequestUserFriendsNotification'
                      "
                      class="d-flex mt-1 mb-n1"
                    >
                      <v-btn color="primary" class="font12"> Accepter </v-btn>
                      <v-btn color="secondary" class="font12 ml-1">
                        Réfuser
                      </v-btn>
                    </div> -->
                    <p class="text-primary font10 mt-2">
                      {{ $dayjs(item.created_at).fromNow() }}
                    </p>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action class="my-2">
                    <!-- <v-avatar class="mr-0.5" color="success" size="22">
                      <span class="font10 text-white">36</span>
                    </v-avatar> -->

                    <v-icon v-if="!active" color="primary">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>

                    <v-icon v-else color="primary">
                      mdi-dots-horizontal-circle
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < notifications.length - 1"
                :key="index"
              ></v-divider>
            </div>
          </v-list-item-group>
          <div v-else class="vide-result d-flex align-center justify-center">
            <div>
              <v-icon color="dark" size="60" class="d-flex">
                mdi-bell-off-outline
              </v-icon>
              <p class="text-primary font12 text-center">
                Aucune nouvelle notification
              </p>
            </div>
          </div>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  props: ["notifications"],
  data: () => ({
    selected: [2],
    tab: 0,
  }),
  methods: {
    verDetailsNotification(e, data) {
      if (e === "App\\Notifications\\NotificationReservation") {
        this.$router.push({
          name: "mes-reservation",
        });
      }
      if (e === "App\\Notifications\\GroupPostNewNotification") {
        this.$router.push({
          name: "groups",
          index: data.group_id,
        });
      }
      if (
        e === "App\\Notifications\\RegistredUserNotification" ||
        e === "App\\Notifications\\RequestUserFriendsNotification"
      ) {
        this.$router.push({
          name: "account",
          params: {
            index: data.url,
          },
        });
      }
    },
  },
  watch: {
    "$route.name": {
      handler(name) {
        if (this.selected) {
          this.selected = null;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.list-discussion {
  padding: 20px 0px;
  box-shadow: 0px 0px 6px #9e9e9e7a;
  border-radius: 15px;
  background-color: #fff;
}
.img-user.rounded-0 {
  border-radius: 10px !important;
  overflow: visible;
}
.mr-0\.5 {
  margin-right: 1px;
}
.img-user .enlign {
  bottom: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
}
.action-tab {
  border: 1px #ff33543d solid;
  border-radius: 10px;
}
</style>

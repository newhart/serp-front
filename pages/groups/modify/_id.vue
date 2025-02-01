<template>
  <div class="">
    <v-card class="card-default pa-3">
      <v-img
        height="300"
        width="100%"
        :src="image ? image : '/icons/default/cover.webp'"
        :lazy-src="image ? image : '/icons/default/cover.webp'"
        :class="'responsive-image-dashboard'"
      >
        <div class="d-flex direction-column justify-between h-100">
          <div class="d-flex justify-between align-center pt-4 pr-2">
            <div></div>
            <v-btn class="mx-2" rounded fab dark small color="primary">
              <v-icon color="white"> mdi-camera </v-icon>
              <input
                type="file"
                class="inputImg"
                @change="handelPreviewFile($event)"
              />
            </v-btn>
          </div>
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
                <template v-slot:badge> </template>
                <v-avatar style="border-radius: 20px !important" size="84">
                  <v-img :src="$auth.user.user.profil.picture"> </v-img>
                </v-avatar>
              </v-badge>
              <div class="detailspers ml-3">
                <p class="limite1-lign w-200 text-white my-0 my-1">
                  {{ title ? title : "Nom du groupe" }}
                </p>
                <p class="font10 text-white w-200">
                  <i class="fa-solid fa-user text-secondary pr-1"></i>
                  {{ count_member }} membre(s)
                </p>
              </div>
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
        <p class="text-primary font12 py-2">
          {{ description ? description : "..." }}
        </p>
      </div>
      <v-tabs
        slider-color="transparent"
        :show-arrows="false"
        fixed-tabs
        class="tabs-groups"
      >
        <v-tab class="tab-group"> A propos </v-tab>
        <v-tab class="tab-group"> Ajouter des personnes à votre groupe </v-tab>
        <v-tab-item>
          <v-row class="ma-0 mt-3">
            <v-col cols="6" class="pa-1">
              <v-text-field
                solo
                hide-details
                height="40"
                class="input-global2"
                placeholder="Nom de votre groupe"
                v-model.trim="title"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select
                :items="['Public', 'Privée']"
                solo
                class="input-global2"
                item-text="name"
                hide-details
                v-model="type"
                placeholder="Confidentialité"
              ></v-select>
            </v-col>
            <v-col cols="12" class="pa-1">
              <textarea
                class="input-global1 mt-2 pa-2 font12"
                placeholder="Description de votre groupe"
                v-model.trim="description"
              ></textarea>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item v-if="all_friends" class="row my-2 ma-0">
          <v-list-item
            v-for="(member, index) in all_friends"
            :key="index"
            class="col col-6 pa-1"
          >
            <div
              class="d-flex align-center justify-between w-100 item-personne"
            >
              <div class="d-flex align-center">
                <v-checkbox
                  @change="getChecked(member)"
                  class="ma-0 pa-0"
                  v-model="all_members"
                  :value="member.id"
                  :disabled="all_members.includes(member.id)"
                  hide-details
                ></v-checkbox>
                <v-list-item-avatar class="radios-23">
                  <v-img
                    :alt="`${member.name} avatar`"
                    :src="member.profiluser.picture"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content class="ml-2">
                  <p class="font12 text-primary limite1-lign">
                    {{
                      member.cooperative_name
                        ? member.cooperative_name
                        : member.lastname
                    }}
                  </p>
                  <p class="font10 text-primary mt-2">0 ami(s) en commun(s)</p>
                </v-list-item-content>
              </div>
              <v-btn class="font12" color="secondary"> Amis </v-btn>
            </div>
          </v-list-item>
          <div class="no-pub" v-if="all_friends.length === 0">
            <v-icon color="secondary" size="60">
              mdi-account-multiple-remove
            </v-icon>
            <p class="mt-2">Aucune amis</p>
          </div>
        </v-tab-item>
        <v-tab-item v-else class="row my-2 ma-0">
          <p class="font12">Chargement...</p>
        </v-tab-item>
      </v-tabs>
      <div class="w-100 d-flex justify-end">
        <v-btn
          color="primary"
          class="font12"
          @click="store()"
          :disabled="
            button_name_for_create !== 'Valider la création' ||
            title === null ||
            title === ''
          "
        >
          {{ button_name_for_create }}
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contacts: [
        {
          active: true,
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Jason Oner",
        },
        {
          active: true,
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: "Mike Carlson",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Cindy Baker",
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Ali Connors",
        },
      ],
      title: null,
      description: null,
      image: null,
      is_submit: false,
      all_friends: null,
      all_tagged: [],
      button_name_for_create: "Valider la création",
      type: "Public",
      all_members: [],
      count_member: 0,
    };
  },
  methods: {
    store() {
      this.is_submit = true;
      this.button_name_for_create = "Chargement ...";
      this.$axios
        .post(`api/groups/update/${this.$route.params.id}`, {
          title: this.title,
          description: this.description,
          image: this.image,
          all_members: this.all_tagged,
          type: this.type,
        })
        .then((res) => {
          this.button_name_for_create = "Redirection en cour ...";
          if (res.data.success) {
            this.is_submit = false;
            this.button_name_for_create = "Valider la création";
            this.$router.push({
              name: "groups",
              params: { index: this.$route.params.id },
            });
          } else {
            this.button_name_for_create = "Valider la création";
          }
        })
        .catch((error) => {
          this.is_submit = false;
          this.button_name_for_create = "Valider la création";
          console.error(error);
        });
    },
    handelPreviewFile(event) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          that.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    getChecked(member) {
      if (this.all_tagged.includes(member.id)) {
        this.all_tagged = this.all_tagged.filter((item) => item !== member.id);
      } else {
        this.all_tagged.push(member.id);
      }
    },
  },
  async fetch() {
    const group_update = await this.$axios.get(
      `api/groups/index/${this.$route.params.id}`
    );
    this.title = group_update.data.title;
    this.description = group_update.data.description;
    this.type = group_update.data.confindetiality;
    this.image = group_update.data.image;
    this.count_member = group_update.data.countmember;
    group_update.data.all_members.forEach((item) => {
      this.all_members.push(item.id);
    });
    const response = await this.$axios.get("/api/groups/suggest-friend");
    this.all_friends = response.data;
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
.item-personne {
  box-shadow: 0px 0px 14px #0000001a;
  padding: 5px 10px;
  border-radius: 10px;
}
.v-avatar.radios-23 {
  border-radius: 10px;
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
.no-pub {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
.tab-group.v-tab.v-tab--active {
  background-color: #0321532b;
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

<template>
  <div>
    <v-card v-if="type" class="pa-2 item-contact-enlign my-1">
      <div class="d-flex justify-between">
        <v-img
          :lazy-src="type.image ? type.image : '/icons/default/premium.webp'"
          :src="type.image ? type.image : '/icons/default/premium.webp'"
          class="img-user-connecter"
        >
          <v-avatar size="25" class="user border-white">
            <img :src="type.user.profiluser.picture" alt="profile" />
          </v-avatar>
        </v-img>
        <div class="details d-flex justify-between direction-column w-100">
          <div>
            <p class="text-primary font-bold">{{ type.name }}</p>
            <p class="text-primary font12">
              Créé par :
              <span class="text-secondary"
                >{{ type.user.lastname }} {{ type.user.name }}</span
              >
              à la date de
              <span class="text-secondary">{{
                $moment(type.created_at).format("DD/MM/YYYY")
              }}</span>
            </p>
          </div>
          <div class="d-flex">
            <!-- <v-btn color="secondary" class="font12"> Supprimer </v-btn> -->
            <v-btn color="primary" @click="getItem(type)" class="font12 mt-1">
              Modifier
            </v-btn>
            <!--            create new  game for cooperative-->
            <v-dialog
              v-model="dialogueaddgammevoiture"
              width="500"
              overlay-color="#000"
              overlay-opacity="0.1"
              content-class="pa-6"
            >
              <v-card>
                <v-icon
                  @click="dialogueaddgammevoiture = false"
                  class="close-dialogue"
                  color="secondary"
                >
                  mdi-close-circle
                </v-icon>
                <v-row class="justify-center ma-0">
                  <v-row class="ma-0">
                    <v-col class="pa-1" cols="12">
                      <h3 class="text-secondary text-center text-bold mb-4">
                        Ajouter votre gamme de voiture
                      </h3>
                    </v-col>
                  </v-row>
                  <v-row class="ma-0 pa-0">
                    <v-col class="pa-1 pb-0" cols="2">
                      <p class="text-primary font12">
                        {{ "Photo " }}
                      </p>
                      <div class="position-relative">
                        <picture-input
                          ref="pictureInput"
                          width="34.39"
                          height="34.39"
                          margin="0"
                          accept="image/jpeg,image/png"
                          size="10"
                          button-class="d-none"
                          :custom-strings="{
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Drag a 😺 GIF or GTFO',
                          }"
                          @change="onChange($event)"
                          class="my-2"
                        >
                        </picture-input>
                        <img
                          data-v-0e32842e=""
                          :src="form_game.image.name"
                          alt=""
                          class="img img-file-dossize"
                        />
                      </div>
                    </v-col>
                    <v-col class="pa-1 pb-0" cols="5">
                      <p class="text-primary font12">
                        {{ "Route national " }}
                      </p>
                      <input
                        type="text"
                        class="input-global1 pl-2 my-2"
                        v-model="form_game.destination.name"
                      />
                    </v-col>
                    <v-col class="pa-1 pb-0" cols="5">
                      <p class="text-primary font12">
                        {{ "Classe" }}
                      </p>
                      <input
                        type="text"
                        class="input-global1 pl-2 my-2"
                        v-model="form_game.gamme.name"
                      />
                    </v-col>
                  </v-row>

                  <v-col class="pa-1" cols="12">
                    <v-btn
                      @click="updateGamme()"
                      class="w-100"
                      color="secondary"
                    >
                      ENREGISTRER
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
            <!--            end create new game-->
          </div>
        </div>
      </div>
    </v-card>
    <v-card v-else class="pa-2 item-contact-enlign my-1 placeholder-wave">
      <div class="d-flex justify-between">
        <v-img class="img-user-connecter placeholder">
          <v-avatar size="25" class="user border-white placeholder">
            <img alt="profile" />
          </v-avatar>
        </v-img>
        <div class="details d-flex justify-between direction-column w-100">
          <div>
            <p class="text-primary font-bold placeholder"></p>
            <p class="text-primary font12 mt-2 placeholder"></p>
          </div>
          <div class="d-flex">
            <v-btn color="primary" class="font12 mx-2 placeholder"> </v-btn>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      dialogueaddgammevoiture: false,
      form_game: {
        destination: {
          id: null,
          name: null,
        },
        gamme: {
          id: null,
          name: null,
        },
        image: {
          id: null,
          name: null,
        },
      },
    };
  },
  methods: {
    onChange(image) {
      if (image) {
        this.form_game.image.name = image;
      }
    },
    updateGamme() {
      this.$axios
        .post("api/gamme/update", this.form_game)
        .then((res) => {
          if (res.data.success) {
            this.dialogueaddgammevoiture = false;
            this.$emit("updateGamme");
            this.$forceUpdate();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getItem(value) {
      this.dialogueaddgammevoiture = true;
      this.form_game.gamme.name = value.name;
      this.form_game.gamme.id = value.id;
      this.form_game.destination.name = value.parent.name;
      this.form_game.destination.id = value.parent.id;
      this.form_game.image.name = value.image;
      this.form_game.image.id = value.id;
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
</style>

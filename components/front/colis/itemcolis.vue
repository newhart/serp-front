<template>
  <div class="w-100">
    <v-card class="pa-2 item-contact-enlign my-1" v-if="colis">
      <div class="d-flex justify-between flex-responsive-colis">
        <v-img
          :src="colis.image ? colis.image : '/img/Cadre_centrale.webp'"
          class="img-user-connecter"
        >
          <v-avatar size="25" class="user border-white">
            <img src="/img/Cadre_centrale.png" alt="John" />
          </v-avatar>
        </v-img>
        <div class="details d-flex justify-between direction-column w-100">
          <div>
            <div class="d-flex align-center justify-between">
              <p class="text-primary font-bold">{{ colis.type }}</p>
              <v-menu
                bottom
                left
                origin="center center"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="secondary" icon v-bind="attrs" v-on="on">
                    <v-icon> mdi-dots-vertical </v-icon>
                  </v-btn>
                </template>

                <v-list-item-content class="justify-center py-1 bg-secondary">
                  <ul class="list-item-menu">
                    <li
                      class="cursor-pointor mb-2 font12 text-white"
                      @click="changeColis('livréé')"
                    >
                      Colis livrer
                    </li>
                    <hr class="widthplusdesconnect my-0" />
                    <li
                      class="cursor-pointor mt-2 font12 text-white"
                      @click="changeColis('refused')"
                    >
                      Colis refuser
                    </li>
                  </ul>
                </v-list-item-content>
              </v-menu>
            </div>
            <p class="text-primary font12 mt-2">
              Colis de:
              <span class="text-secondary"
                >{{ colis.clients[0].name }}
                {{ colis.clients[0].firstname }}</span
              >
              <br />Envoyer par:
              <span class="text-secondary"
                >{{ colis.clients[1].name }}
                {{ colis.clients[1].firstname }}</span
              >
              <br />Prix:
              <span class="text-secondary">{{ colis.price }} Ar - </span>Ref:
              <span class="text-secondary">{{ colis.reference }}</span>
            </p>
          </div>
          <div class="d-flex justify-between align-center">
            <p class="font12 text-primary">
              Le:
              <span class="text-secondary">{{
                $moment(colis.send_at).format("YYYY-MM-DD")
              }}</span>
            </p>
            <v-btn
              :color="colis.status != 'En cours' ? 'success' : 'secondary'"
              class="font12"
            >
              {{ colis.status }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-card>
    <v-card class="pa-2 item-contact-enlign my-1 placeholder-wave" v-else>
      <div class="d-flex justify-between flex-responsive-colis">
        <v-img class="img-user-connecter placeholder">
          <v-avatar size="25" class="user border-white placeholder"> </v-avatar>
        </v-img>
        <div class="details d-flex justify-between direction-column w-100">
          <div>
            <div class="d-flex align-center justify-between">
              <p class="text-primary font-bold placeholder"></p>
            </div>
            <p class="text-primary font12 mt-2">
              Colis de:
              <span class="text-secondary">...</span>
              <br />Envoyer par:
              <span class="text-secondary">...</span>
              <br />Prix: <span class="text-secondary">... Ar - </span>Ref:
              <span class="text-secondary">...</span>
            </p>
          </div>
          <div class="d-flex justify-between align-center">
            <p class="font12 text-primary">
              Le:
              <span class="text-secondary">...</span>
            </p>
            <v-btn color="secondary" class="font12 placeholder"> </v-btn>
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
  props: ["colis"],

  methods: {
    changeColis(status) {
      this.$axios
        .post("api/colis/changeStatus", {
          status: status,
          id: this.colis.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.$emit("changeColis", status);
            let beat = new Audio('../sound/mixkit-success.wav');
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre colis a été créer avec succèss",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Oups!",
            text: "Une erreur est survenue",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          }).then((result) => {});
          console.log(error);
        });
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
@media (max-width: 440px) {
  .flex-responsive-colis {
    flex-direction: column;
  }
  .flex-responsive-colis .v-image.img-user-connecter {
    margin: 0;
    width: 100% !important;
    max-width: 100% !important;
    height: 115px !important;
    border-radius: 10px;
  }
  .flex-responsive-colis .details {
    max-width: 100% !important;
  }
}
</style>

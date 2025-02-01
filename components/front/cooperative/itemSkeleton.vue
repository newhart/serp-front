<template>
  <v-col cols="12" class="py-2 px-0">
    <v-card class="pa-1 d-flex placeholder-wave  card-flexable-res-1">
      <v-img class="img-vehicule-cooperative placeholder">
        <div class="position-relative h-100">
          <img class="img-logo-cooperative placeholder" />
          <!-- <div class="enlign"></div> -->
        </div>
      </v-img>
      <div class="details d-flex direction-column justify-between w-100 mx-4">
        <div>
          <div class="block-itm d-flex justify-between py-2">
            <div>
              <h3 class="text-secondary placeholder"></h3>
              <p class="text-primary placeholder"></p>
            </div>
            <div class="position-relative">
              <img class="img-logo-cooperative-1 placeholder" />
              <div class="enlign"></div>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm d-flex py-2">
            <div class="position-relative">
              <p class="text-primary font12 placeholder"></p>
            </div>
          </div>
          <hr class="border-primary" />
          <div class="block-itm py-2">
            <div class="list-itineraire my-1"></div>
          </div>
        </div>
        <div class="d-flex align-center justify-between pb-4 flex-boutton-bottom1">
          <div class="d-flex align-center"></div>
          <v-btn color="secondary" class="font12 placeholder"> </v-btn>
        </div>
      </div>
    </v-card>
  </v-col>
</template>
<script></script>
<style lang="scss" scoped>
@import "~/assets/itemcooperative.scss";
</style>

<template>
  <div class="">
    <client-only>
      <VueGallerySlideshow
        :images="images"
        :index="indexImg"
        @close="indexImg = null"
      />
    </client-only>
    <v-card v-if="user" class="card-default pa-3">
      <v-img
        :lazy-src="
          user.profiluser && user.profiluser.cover
            ? user.profiluser.cover
            : '/icons/default/cover.webp'
        "
        height="300"
        width="100%"
        class="responsive-image-dashboard"
        :src="
          user.profiluser && user.profiluser.cover
            ? user.profiluser.cover
            : '/icons/default/cover.webp'
        "
      >
        <div class="transparence-bg"></div>
        <div class="d-flex direction-column justify-between h-100">
          <div class="d-flex justify-between align-center pt-4 pr-2">
            <div></div>
            <v-menu left v-if="user.id != $auth.user.user.id" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="mx-2 py-0"
                  rounded
                  fab
                  dark
                  small
                  color="primary"
                  v-if="is_friend"
                >
                  <v-icon size="20" dark> mdi-dots-vertical </v-icon>
                </v-btn>
              </template>
              <ul class="list-item-menu-global">
                <li
                  @click="retirefriend()"
                  class="cursor-pointor font12 text-primary"
                >
                  <v-icon color="primary"> mdi-account-outline </v-icon>
                  Retirer à la liste d'amis
                </li>
              </ul>
            </v-menu>
            <v-btn
              :loading="loadingModifyCover"
              class="mx-2"
              rounded
              fab
              dark
              small
              color="primary"
              v-else
            >
              <v-icon size="20" dark> mdi-camera </v-icon>
              <input
                type="file"
                class="inputImg"
                @change="handelPreviewFile($event, 'cover')"
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
                <template v-if="user.id == $auth.user.user.id" v-slot:badge>
                  <v-icon
                    v-if="!loadingModifyPicture"
                    size="10"
                    color="black"
                    class="cursor-pointor"
                  >
                    mdi-camera
                  </v-icon>
                  <v-progress-circular
                    indeterminate
                    color="secondary"
                    v-else
                    size="15"
                  ></v-progress-circular>
                  <input
                    type="file"
                    class="inputImg"
                    @change="handelPreviewFile($event, 'picture')"
                  />
                </template>
                <template v-else v-slot:badge>
                  <div
                    :class="
                      user.status === 'online'
                        ? 'enlignProfile'
                        : 'enlignProfile bg-grid'
                    "
                  ></div>
                </template>
                <v-avatar style="border-radius: 20px !important" size="84">
                  <v-img
                    :src="
                      user.profiluser && user.profiluser.picture
                        ? user.profiluser.picture
                        : '/icons/default/default.webp'
                    "
                  >
                  </v-img>
                  <!-- loadingModifyPicture -->
                </v-avatar>
              </v-badge>
              <div class="detailspers ml-3">
                <p class="limite1-lign text-white font18 my-0 my-1">
                  {{
                    user.cooperative_name
                      ? user.cooperative_name
                      : user.lastname + " " + user.name
                  }}
                </p>
                <p
                  v-if="user.id != $auth.user.user.id"
                  class="font14 text-white"
                >
                  <i class="fa-solid fa-user text-secondary pr-1"></i>
                  <span class="text-secondary font-bold">
                    {{ user.friendcommun }}
                  </span>
                  ami(s) en commun |
                  <span class="text-secondary font-bold">{{
                    user.likecount
                  }}</span>
                  j'aime(s)
                </p>
                <p v-else class="font14 text-white">
                  <span class="text-secondary font-bold">{{
                    user.friendscount
                  }}</span>
                  contact(s) |
                  <span class="text-secondary font-bold">{{
                    user.likecount
                  }}</span>
                  j'aime(s)
                </p>
              </div>
            </div>
            <div
              v-if="user.id != $auth.user.user.id"
              class="d-flex align-center my-3"
            >
              <v-btn
                :color="
                  !is_friend
                    ? 'primary'
                    : i_pend && is_friend.status === 'pedding'
                    ? 'dark'
                    : you_pend && is_friend.status === 'pedding'
                    ? 'primary'
                    : 'secondary'
                "
                @click="
                  !is_friend
                    ? sendinvitation()
                    : i_pend && is_friend.status === 'pedding'
                    ? cancelinvitation()
                    : you_pend && is_friend.status === 'pedding'
                    ? confirminvitation()
                    : null
                "
                rounded
                :loading="loadingButton"
                class="font12 mr-3"
              >
                {{
                  !is_friend
                    ? "Ajouter"
                    : i_pend && is_friend.status === "pedding"
                    ? "Annuler"
                    : you_pend && is_friend.status === "pedding"
                    ? "Confirmer"
                    : "Amis"
                }}
              </v-btn>
              <v-btn
                @click="contacter()"
                color="primary"
                rounded
                class="font12 mr-3"
              >
                Contacter
              </v-btn>
            </div>
          </div>
        </div>
      </v-img>
      <div v-if="user.bio" class="d-flex content-bio">
        <div
          class="text-white bg-primary font12 d-flex align-center justify-between bio"
        >
          Biographie
        </div>
        <p class="text-primary font12 py-2">
          {{ user.bio }}
        </p>
      </div>
      <hr class="border-primary" />
      <div class="d-flex justify-between align-center">
        <div
          v-if="user.id != $auth.user.user.id"
          class="d-flex align-center my-3"
        >
          <p class="text-primary pr-2 font12 font-bold">
            {{
              user.cooperative_name
                ? user.cooperative_name
                : user.lastname + " " + user.name
            }}
            a
            <span class="text-secondary">
              {{ user.friendscount ? user.friendscount : user.friends.length }}
            </span>
            ami(s)
          </p>
          <v-avatar
            v-for="(item, i) in user.friends"
            :key="i"
            size="33"
            class="mr-n2 border-white cursor-pointor none-res-500"
            @click="viewProfile(item.url)"
          >
            <img
              v-if="i < 5"
              :src="
                item.profiluser.picture
                  ? item.profiluser.picture
                  : '~/static/icons/default/default.webp'
              "
              alt="John"
            />
          </v-avatar>
        </div>
        <div v-else class="d-flex align-center my-3">
          <p class="text-primary pr-2 font12 font-bold">
            Vous avez été suivi(e) par
            <span class="text-secondary">{{ user.likecount }}</span> personne(s)
          </p>
        </div>
        <div class="d-flex align-center my-3">
          <v-btn
            color="secondary"
            rounded
            :outlined="!HasLiked"
            class="font12 mr-3"
            @click="liked()"
            :loading="loadingLiked"
          >
            <v-icon
              :color="HasLiked ? 'white' : 'secondary'"
              size="15"
              class="pr-2"
            >
              {{ HasLiked ? "mdi-cards-heart" : "mdi-cards-heart-outline" }}
            </v-icon>
            {{ HasLiked ? "Je n'aime plus" : "J'aime" }}
          </v-btn>
        </div>
      </div>
      <hr class="border-primary" />
      <div v-if="publicity" :class="publicity.length > 0 ? 'py-2' : ''">
        <div class="ma-0 row">
          <v-col
            v-for="(item, index) in publicity"
            :key="index"
            cols="12"
            xl="4"
            lg="6"
            md="6"
            sm="6"
            xs="6"
            class="pa-1 ma-0"
          >
            <FrontDefaultItemPublicity :publicity="item" />
          </v-col>
        </div>
      </div>
      <div class="filter-top-zero mb-3">
        <v-row class="ma-0 block-filtre">
          <v-col
            @click="tab = 0"
            class="pa-2 d-flex cursor-pointor"
            :class="tab === 0 ? 'bg-secondary active' : ''"
            :cols="user.user_type_id == 1 || user.user_type_id == 4 ? '3' : '4'"
          >
            <img
              class="mr-2"
              src="~/static/icons/default/info-pers.svg"
              alt=""
            />
            <p class="text-primary limite1-lign">Information personnelle</p>
          </v-col>
          <v-col
            :class="tab === 1 ? 'bg-secondary active' : ''"
            @click="tab = 1"
            class="pa-2 d-flex cursor-pointor"
            :cols="user.user_type_id == 1 || user.user_type_id == 4 ? '3' : '4'"
          >
            <img class="mr-2" src="~/static/icons/default/photos.svg" alt="" />
            <p class="text-primary limite1-lign">Photo/video</p>
          </v-col>
          <v-col
            :class="tab === 2 ? 'bg-secondary active' : ''"
            @click="tab = 2"
            class="pa-2 d-flex cursor-pointor"
            cols="3"
            v-if="user.user_type_id == 1 || user.user_type_id === 4"
          >
            <img
              class="mr-2"
              src="~/static/icons/default/vehicule.svg"
              alt=""
            />
            <p class="text-primary limite1-lign">Mes vehicules</p>
          </v-col>
          <v-col
            :class="tab === 3 ? 'bg-secondary active' : ''"
            @click="tab = 3"
            class="pa-2 d-flex cursor-pointor"
            :cols="user.user_type_id == 1 || user.user_type_id == 4 ? '3' : '4'"
          >
            <img class="mr-2" src="~/static/icons/default/amis.svg" alt="" />
            <p class="text-primary limite1-lign">Contact(s)</p>
          </v-col>
        </v-row>
      </div>
      <v-tabs-items class="scroll-customiwed" v-model="tab">
        <v-tab-item>
          <div class="my-2 block-global block_information">
            <div class="d-flex align-center justify-between mb-3">
              <p class="text-secondary underline-bottom">INFORMATION</p>
              <v-btn
                @click="modifyInfo = true"
                class="font12 no-shadow"
                color="secondary"
                v-if="!modifyInfo && user.id == $auth.user.user.id"
              >
                Modifier
              </v-btn>
            </div>
            <div
              class="ma-0 row"
              :class="!modifyInfo ? 'nomodifyInfo' : 'modifyInfo'"
            >
              <v-col v-if="modifyInfo" cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 font-bold">Biographie</p>
              </v-col>
              <v-col v-if="modifyInfo" cols="6" class="pa-1 ma-0">
                <input class="input-global1" v-model="userupdate.bio" />
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 resp">
                <p class="text-primary font12 font-bold">Civilité</p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.genre ? user.genre : "pas bien precis" }}
                </p>
                <v-select
                  v-else
                  :items="['Homme', 'Femme']"
                  solo
                  readonly
                  class="input-global2"
                  v-model="userupdate.genre"
                  hide-details
                ></v-select>
              </v-col>
              <v-col
                v-if="user.cooperative_name"
                cols="6"
                class="pa-1 ma-0 font-bold resp"
              >
                <p class="text-primary font12">Nom de la coopérative</p>
              </v-col>
              <v-col v-if="user.cooperative_name" cols="6" class="pa-1 ma-0">
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.cooperative_name }}
                </p>
                <input
                  v-else
                  v-model="userupdate.cooperative_name"
                  type="text"
                  class="input-global1"
                />
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12">
                  Nom {{ user.cooperative_name ? "du gérant" : "" }}
                </p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 resp">
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.name }}
                </p>
                <input
                  v-else
                  v-model="userupdate.name"
                  type="text"
                  class="input-global1"
                />
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12">Prénom</p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.lastname }}
                </p>
                <input
                  v-else
                  v-model="userupdate.lastname"
                  type="text"
                  class="input-global1"
                />
              </v-col>
              <v-col
                v-if="
                  $auth.user.user.id === user.id ||
                  visibility.phone_number === 'Public'
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center resp"
              >
                <p class="text-primary font-bold font12">Contact</p>
              </v-col>
              <v-col
                v-if="
                  $auth.user.user.id === user.id ||
                  visibility.phone_number === 'Public'
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center justify-between"
              >
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.phone_number }}
                </p>
                <input
                  v-else
                  v-model="userupdate.phone_number"
                  type="text"
                  class="input-global1"
                />
                <v-select
                  v-if="$auth.user.user.id === user.id"
                  v-model="visibility.phone_number"
                  :items="['Public', 'Moi uniquement']"
                  @input="changeConfidenliality({ phone_number: $event })"
                  menu-props="auto"
                  label="Confidentialité"
                  hide-details
                  solo
                  class="input-global1 max-w-150 confidentiality ml-2"
                ></v-select>
              </v-col>
              <v-col
                v-if="
                  $auth.user.user.id === user.id ||
                  visibility.email === 'Public'
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center resp"
              >
                <p class="text-primary font12 font-bold">E-mail</p>
              </v-col>
              <v-col
                v-if="
                  $auth.user.user.id === user.id ||
                  visibility.email === 'Public'
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center justify-between"
              >
                <p
                  v-if="!modifyInfo"
                  class="text-primary font12 min-w-fit-content limite1-lign"
                >
                  : {{ user.email }}
                </p>
                <input
                  v-else
                  v-model="userupdate.email"
                  type="text"
                  class="input-global1"
                />
                <v-select
                  v-if="$auth.user.user.id === user.id"
                  v-model="visibility.email"
                  :items="['Public', 'Moi uniquement']"
                  @input="changeConfidenliality({ email: $event })"
                  menu-props="auto"
                  label="Confidentialité"
                  hide-details
                  solo
                  class="input-global1 max-w-150 confidentiality ml-2"
                ></v-select>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 resp">
                <p class="text-primary font12 font-bold">Adresse</p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p v-if="!modifyInfo" class="text-primary font12 limite1-lign">
                  : {{ user.adress }}
                </p>
                <input
                  v-else
                  v-model="userupdate.adress"
                  type="text"
                  class="input-global1"
                />
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.cin_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.cin === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center resp"
              >
                <p class="text-primary font12 font-bold">Numéro CIN</p>
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.cin_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.cin === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center justify-between"
              >
                <p
                  v-if="!modifyInfo"
                  class="text-primary font12 min-w-fit-content limite1-lign"
                >
                  : {{ user.dossier.cin_number }}
                </p>
                <input
                  v-else
                  v-model="userupdate.cin_number"
                  type="number"
                  class="input-global1"
                />
                <v-select
                  v-if="$auth.user.user.id === user.id"
                  v-model="visibility.cin"
                  :items="['Public', 'Moi uniquement']"
                  @input="changeConfidenliality({ cin: $event })"
                  menu-props="auto"
                  label="Confidentialité"
                  hide-details
                  solo
                  class="input-global1 max-w-150 confidentiality ml-2"
                ></v-select>
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.nif_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.nif === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center resp"
              >
                <p class="text-primary font12 font-bold">Numéro NIF</p>
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.nif_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.nif === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center justify-between"
              >
                <p
                  v-if="!modifyInfo"
                  class="text-primary font12 min-w-fit-content limite1-lign"
                >
                  : {{ user.dossier ? user.dossier.nif_number : "" }}
                </p>
                <input
                  v-else
                  v-model="userupdate.nif_number"
                  type="number"
                  class="input-global1"
                />
                <v-select
                  v-if="$auth.user.user.id === user.id"
                  v-model="visibility.nif"
                  :items="['Public', 'Moi uniquement']"
                  @input="changeConfidenliality({ nif: $event })"
                  menu-props="auto"
                  label="Confidentialité"
                  hide-details
                  solo
                  class="input-global1 max-w-150 confidentiality ml-2"
                ></v-select>
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.stat_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.stat === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center resp"
              >
                <p class="text-primary font12 font-bold">Numéro STAT</p>
              </v-col>
              <v-col
                v-if="
                  user.dossier &&
                  user.dossier.stat_number &&
                  ($auth.user.user.id === user.id ||
                    visibility.stat === 'Public')
                "
                cols="6"
                class="pa-1 ma-0 d-flex align-center justify-between"
              >
                <p
                  v-if="!modifyInfo"
                  class="text-primary font12 min-w-fit-content limite1-lign"
                >
                  : {{ user.dossier.stat_number }}
                </p>
                <input
                  v-else
                  v-model="userupdate.stat_number"
                  type="number"
                  class="input-global1"
                />
                <v-select
                  v-if="$auth.user.user.id === user.id"
                  v-model="visibility.stat"
                  :items="['Public', 'Moi uniquement']"
                  @input="changeConfidenliality({ stat: $event })"
                  menu-props="auto"
                  label="Confidentialité"
                  hide-details
                  solo
                  class="input-global1 max-w-150 confidentiality ml-2"
                ></v-select>
              </v-col>
            </div>
            <div class="d-flex align-center justify-end mr-1 mt-3">
              <v-btn
                @click="updateinfo()"
                class="font12 no-shadow"
                color="secondary"
                v-if="modifyInfo"
                :loading="loadingModifInfoUser"
              >
                Enregistrer
              </v-btn>
            </div>
          </div>
          <hr v-if="user.dossier" class="border-primary" />
          <div v-if="user.dossier" class="my-2 block-global">
            <div class="py-2">
              <div class="d-flex align-center justify-between">
                <p class="text-secondary underline-bottom">DOSSIERS</p>
                <v-dialog
                  v-model="modifydossier"
                  width="500"
                  overlay-color="#000"
                  overlay-opacity="0.1"
                  content-class="pa-6"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="secondary"
                      class="font12 no-shadow"
                      v-if="user.id == $auth.user.user.id"
                    >
                      Modifier
                    </v-btn>
                  </template>
                  <v-card class="dossier-acount">
                    <v-icon
                      @click="modifydossier = false"
                      class="close-dialogue"
                      color="secondary"
                    >
                      mdi-close-circle
                    </v-icon>
                    <v-row class="justify-center ma-0">
                      <v-row class="ma-0">
                        <v-col class="pa-1" cols="12">
                          <h3 class="text-secondary text-center text-bold mb-4">
                            Modifier vos dossiers
                          </h3>
                        </v-col>
                      </v-row>
                      <v-row v-if="user.cooperative_name" class="ma-0 pa-0">
                        <v-col class="pa-1 pb-0" cols="6">
                          <p class="text-primary font12">Numéro NIF</p>
                          <input
                            v-model="dossierupdate.nif_number"
                            type="number"
                            class="input-global1"
                          />
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="6">
                          <p class="text-primary font12">Numéro STAT</p>
                          <input
                            v-model="dossierupdate.stat_number"
                            type="number"
                            class="input-global1"
                          />
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">NIF recto</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'nif_recto')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.nif_recto"
                              v-if="user.dossier.nif_recto"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">NIF verso</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'nif_verso')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.nif_verso"
                              v-if="user.dossier.nif_verso"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">STAT recto</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'stat_recto')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.stat_recto"
                              v-if="user.dossier.stat_recto"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">STAT verso</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'stat_verso')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.stat_verso"
                              v-if="user.dossier.stat_verso"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                      </v-row>
                      <v-row v-else class="ma-0 pa-0">
                        <v-col class="pa-1 pb-0" cols="12">
                          <p class="text-primary font12">Numéro CIN</p>
                          <input
                            v-model="dossierupdate.cin_number"
                            type="number"
                            class="input-global1"
                          />
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">CIN recto</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'cin_recto')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.cin_recto"
                              v-if="user.dossier.cin_recto"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                        <v-col class="pa-1 pb-0" cols="3">
                          <p class="text-primary font12">CIN verso</p>
                          <div class="position-relative">
                            <picture-input
                              ref="pictureInput"
                              width="200"
                              height="215"
                              margin="0"
                              accept="image/jpeg,image/png"
                              size="10"
                              button-class="d-none"
                              :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO',
                              }"
                              @change="onChange($event, 'cin_verso')"
                              class="my-2"
                            >
                            </picture-input>
                            <img
                              :src="user.dossier.cin_verso"
                              v-if="user.dossier.cin_verso"
                              alt=""
                              class="img img-file-dossize"
                            />
                            <!-- <v-icon class="text-white absolute-icon">
                              mdi-camera
                            </v-icon> -->
                          </div>
                        </v-col>
                      </v-row>

                      <v-col class="pa-1" cols="12">
                        <v-btn
                          @click="updatedossier()"
                          class="w-100"
                          color="secondary"
                        >
                          Enregistrer
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-dialog>
              </div>
              <div class="ma-0 row mt-3">
                <v-col
                  v-if="
                    user.dossier.cin_recto &&
                    ($auth.user.user.id === user.id ||
                      visibility.cin === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.cin_recto}`"
                    :lazy-src="`${user.dossier.cin_recto}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col
                  v-if="
                    user.dossier.cin_verso &&
                    ($auth.user.user.id === user.id ||
                      visibility.cin === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.cin_verso}`"
                    :lazy-src="`${user.dossier.cin_verso}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col
                  v-if="
                    user.dossier.nif_recto &&
                    ($auth.user.user.id === user.id ||
                      visibility.nif === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.nif_recto}`"
                    :lazy-src="`${user.dossier.nif_recto}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col
                  v-if="
                    user.dossier.nif_verso &&
                    ($auth.user.user.id === user.id ||
                      visibility.nif === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.nif_verso}`"
                    :lazy-src="`${user.dossier.nif_verso}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col
                  v-if="
                    user.dossier.stat_recto &&
                    ($auth.user.user.id === user.id ||
                      visibility.stat === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.stat_recto}`"
                    :lazy-src="`${user.dossier.stat_recto}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
                <v-col
                  v-if="
                    user.dossier.stat_verso &&
                    ($auth.user.user.id === user.id ||
                      visibility.stat === 'Public')
                  "
                  class="d-flex child-flex pa-1"
                  cols="3"
                  xl="1"
                  lg="1"
                  md="2"
                  sm="2"
                  xs="2"
                >
                  <v-img
                    :src="`${user.dossier.stat_verso}`"
                    :lazy-src="`${user.dossier.stat_verso}`"
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </div>
            </div>
          </div>
          <v-dialog
            v-else
            v-model="modifydossier"
            width="500"
            overlay-color="#000"
            overlay-opacity="0.1"
            content-class="pa-6"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="user.id == $auth.user.user.id"
                color="primary"
                class="font12 mb-2"
              >
                Ajouter votre dossier
              </v-btn>
            </template>
            <v-card class="dossier-acount">
              <v-icon class="close-dialogue" color="secondary">
                mdi-close-circle
              </v-icon>
              <v-row class="justify-center ma-0">
                <v-row class="ma-0">
                  <v-col class="pa-1" cols="12">
                    <h3 class="text-secondary text-center text-bold mb-4">
                      Ajouter vos dossiers
                    </h3>
                  </v-col>
                </v-row>
                <v-row v-if="user.cooperative_name" class="ma-0 pa-0">
                  <v-col class="pa-1 pb-0" cols="6">
                    <p class="text-primary font12">Numéro NIF</p>
                    <input
                      v-model="dossierupdate.nif_number"
                      type="number"
                      class="input-global1"
                    />
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="6">
                    <p class="text-primary font12">Numéro STAT</p>
                    <input
                      v-model="dossierupdate.stat_number"
                      type="number"
                      class="input-global1"
                    />
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">NIF recto</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'nif_recto')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.nif_recto"
                        v-if="user.dossier && user.dossier.nif_recto"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">NIF verso</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'nif_verso')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.nif_verso"
                        v-if="user.dossier && user.dossier.nif_verso"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">STAT recto</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'stat_recto')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.stat_recto"
                        v-if="user.dossier && user.dossier.stat_recto"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">STAT verso</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'stat_verso')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.stat_verso"
                        v-if="user.dossier && user.dossier.stat_verso"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                </v-row>
                <v-row v-else class="ma-0 pa-0">
                  <v-col class="pa-1 pb-0" cols="12">
                    <p class="text-primary font12">Numéro CIN</p>
                    <input
                      v-model="dossierupdate.cin_number"
                      type="number"
                      class="input-global1"
                    />
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">CIN recto</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'cin_recto')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.cin_recto"
                        v-if="user.dossier && user.dossier.cin_recto"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                  <v-col class="pa-1 pb-0" cols="3">
                    <p class="text-primary font12">CIN verso</p>
                    <div class="position-relative">
                      <picture-input
                        ref="pictureInput"
                        width="200"
                        height="215"
                        margin="0"
                        accept="image/jpeg,image/png"
                        size="10"
                        button-class="d-none"
                        :custom-strings="{
                          upload: '<h1>Bummer!</h1>',
                          drag: 'Drag a 😺 GIF or GTFO',
                        }"
                        @change="onChange($event, 'cin_verso')"
                        class="my-2"
                      >
                      </picture-input>
                      <img
                        :src="user.dossier.cin_verso"
                        v-if="user.dossier && user.dossier.cin_verso"
                        alt=""
                        class="img img-file-dossize"
                      />
                      <!-- <v-icon class="text-white absolute-icon">
                        mdi-camera
                      </v-icon> -->
                    </div>
                  </v-col>
                </v-row>

                <v-col class="pa-1" cols="12">
                  <v-btn
                    @click="updatedossier()"
                    class="w-100"
                    color="secondary"
                  >
                    Enregistrer
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-tab-item>
        <v-tab-item>
          <v-card class="card-default pa-3 px-0">
            <div class="d-flex align-center justify-between mb-2">
              <p class="text-secondary underline-bottom">Photo public</p>
            </div>
            <div v-if="medias" class="ma-0 row">
              <v-col
                v-for="(media, key) in medias"
                :key="key"
                class="d-flex child-flex pa-1"
                cols="3"
                xl="1"
                lg="1"
                md="2"
                sm="2"
                xs="2"
              >
                <v-img
                  :src="media.file"
                  :lazy-src="media.file"
                  aspect-ratio="1"
                  class="grey img-media lighten-2"
                  v-if="media.file"
                >
                  <div
                    v-if="$auth.user.user.id === user.id"
                    class="deleted_img align-center justify-center w-100 h-100"
                  >
                    <v-btn color="white" @click="deleteImg(media.id)" icon>
                      <v-icon color="secondary" size="20">
                        mdi-trash-can-outline
                      </v-icon>
                    </v-btn>
                    <v-btn @click="indexImg = key" color="white" icon>
                      <v-icon color="secondary" size="20">
                        mdi-eye-outline
                      </v-icon>
                    </v-btn>
                  </div>
                  <div
                    @click="indexImg = key"
                    v-else
                    class="justify-center w-100 h-100 cursor-pointor"
                  ></div>
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </div>
            <div v-else class="ma-0 row">
              <v-col
                v-for="(media, key) in 4"
                :key="key"
                class="d-flex child-flex pa-1"
                cols="3"
                xl="1"
                lg="1"
                md="2"
                sm="2"
                xs="2"
              >
                <v-img aspect-ratio="1" class="grey lighten-2 placeholder-wave">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </div>
            <!-- <hr class="border-primary w-plus mt-3" />
            <div class="d-flex align-center justify-between mb-2">
              <p class="text-secondary underline-bottom">Photo privé</p>
            </div>
            <div class="ma-0 row">
              <v-col
                v-for="n in 12"
                :key="n"
                class="d-flex child-flex pa-1"
                cols="3"
                xl="1"
                lg="1"
                md="2"
                sm="2"
                xs="2"
              >
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
            </div> -->
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card class="card-default pa-3 px-0">
            <v-row class="ma-0 list-cooperative">
              <v-col
                v-for="(item, index) in vehiculs"
                :key="index"
                cols="12"
                xl="6"
                lg="6"
                md="12"
                class="pa-1"
              >
                <FrontGestionVehiculeItemVehiculeProprietaire
                  :vehicul="item"
                  @associate="getAllVehicule"
                />
              </v-col>
              <v-col v-if="vehiculs && vehiculs.length === 0" class="pa-1">
                <div>
                  <FrontDefaultNoresult />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-row class="ma-0">
            <v-col
              cols="12"
              xl="3"
              lg="4"
              md="6"
              sm="6"
              xs="6"
              class="pa-1"
              v-for="(item, index) in user.friends"
              :key="index"
            >
              <FrontDefaultUser :user="item" typeuser="amis" />
            </v-col>
            <v-col v-if="user.friends.length == 0" cols="12">
              <FrontDefaultNoresult />
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <v-card v-else class="card-default pa-3">
      <v-img
        height="300"
        width="100%"
        class="placeholder-wave responsive-image-dashboard"
      >
        <div class="d-flex direction-column justify-between h-100">
          <div class="d-flex justify-between align-center pt-4 pr-2">
            <div></div>
            <v-btn class="mx-2" rounded fab dark small color="primary"> </v-btn>
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
                <!-- <template v-else v-slot:badge>
              <div class="enlignProfile"></div>
            </template> -->
                <v-avatar
                  class="placeholder"
                  style="border-radius: 20px !important"
                  size="84"
                >
                </v-avatar>
              </v-badge>
              <div class="detailspers ml-3">
                <p
                  class="limite1-lign w-200 text-white my-0 my-1 placeholder"
                ></p>
                <p class="font14 text-white w-200 placeholder">
                  <i class="fa-solid fa-user text-secondary pr-1"></i>
                </p>
              </div>
            </div>
            <div class="d-flex align-center my-3">
              <v-btn color="primary" rounded class="font12 mr-3 placeholder">
              </v-btn>
              <v-btn color="primary" rounded class="font12 mr-3 placeholder">
              </v-btn>
            </div>
          </div>
        </div>
      </v-img>
      <div class="d-flex content-bio">
        <div
          class="text-white bg-primary font12 d-flex align-center justify-between bio"
        ></div>
        <p class="text-primary font12 pt-2"></p>
      </div>
      <hr class="border-primary" />
      <v-row class="ma-0 block-filtre">
        <v-col class="pa-2 d-flex cursor-pointor" cols="3">
          <img class="mr-2 placeholder" alt="" />
          <p class="text-primary placeholder"></p>
        </v-col>
        <v-col class="pa-2 d-flex cursor-pointor" cols="3">
          <img class="mr-2 placeholder" alt="" />
          <p class="text-primary placeholder"></p>
        </v-col>
        <v-col class="pa-2 d-flex cursor-pointor" cols="3">
          <img class="mr-2 placeholder" alt="" />
          <p class="text-primary placeholder"></p>
        </v-col>
        <v-col class="pa-2 d-flex cursor-pointor" cols="3">
          <img class="mr-2 placeholder" alt="" />
          <p class="text-primary placeholder"></p>
        </v-col>
      </v-row>
      <v-tabs-items class="scroll-customiwed" v-model="tab">
        <v-tab-item>
          <div class="py-2">
            <div class="d-flex align-center justify-between">
              <p class="text-secondary underline-bottom placeholder"></p>
            </div>
            <div class="ma-0 row">
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 font-bold placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0 font-bold resp">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
              <v-col cols="6" class="pa-1 ma-0">
                <p class="text-primary font12 placeholder"></p>
              </v-col>
            </div>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <FrontDefaultSnackbar
      @fermer="snackbar = false"
      :text="textsnackbar"
      :snackbar="snackbar"
    />
  </div>
</template>
<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import VueGallerySlideshow from "vue-gallery-slideshow";

export default {
  head: {
    titleTemplate: "R23 - Compte d'un membre",
  },
  components: {
    VueGallerySlideshow,
  },
  data() {
    return {
      indexImg: null,
      images: [],
      tab: 0,
      user: null,
      HasLiked: null,
      is_friend: null,
      i_pend: null,
      loadingButton: false,
      snackbar: false,
      textsnackbar: "",
      you_pend: null,
      showMenuAmis: false,
      modifyInfo: false,
      userupdate: null,
      dossierupdate: {
        cin_recto: null,
        cin_verso: null,
        stat_recto: null,
        stat_verso: null,
        nif_recto: null,
        nif_verso: null,
        cin_number: null,
        nif_number: null,
        stat_number: null,
      },
      modifydossier: false,
      vehiculs: [],
      medias: null,
      loadingLiked: false,
      loadingModifyCover: false,
      loadingModifyPicture: false,
      loadingModifInfoUser: false,
      visibility: {
        email: "Moi uniquement",
        CIN: "Moi uniquement",
        Nif: "Moi uniquement",
        Stat: "Moi uniquement",
        phone_number: "Moi uniquement",
      },
      publicity: null,
    };
  },
  watch: {
    medias: {
      handler(value) {
        if (value) {
          this.medias.forEach((element) => {
            this.images.push(element.file);
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    deleteImg(id) {
      Swal.fire({
        title: "Êtes-vous vraiment supprimer ce photo?",
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
            .post("api/media/delete", {
              id: id,
            })
            .then((res) => {
              console.log(res.data);
              this.medias = this.medias.filter((item) => item.id !== id);
            })
            .catch((error) => {
              console.log(error);
            });
        },
      }).then((result) => {
        if (result.value) {
          Swal.fire("Supprimé!", "Votre photo a été supprimé.", "success");
        }
      });
    },
    viewProfile(id) {
      this.$router.push({
        name: "account",
        params: {
          index: id,
        },
      });
    },
    sendinvitation() {
      this.loadingButton = true;
      this.$axios
        .post(`/api/send-request`, {
          target_id: this.user.id,
        })
        .then((res) => {
          this.loadingButton = false;
          if (res.data.envoye) {
            this.i_pend = true;
            this.is_friend = {
              status: "pedding",
            };
          }
          if (res.data.annulation) {
            this.i_pend = undefined;
            this.is_friend = false;
          }
        })
        .catch((error) => {
          console.log(error);
          this.loadingButton = false;
        });
    },
    cancelinvitation() {
      this.sendinvitation();
    },
    retirefriend() {
      this.$axios
        .post(`/api/retire-friend`, {
          target_id: this.user.id,
        })
        .then((res) => {
          if (res.data.success) {
            this.is_friend = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChange(image, type) {
      if (image) {
        this.dossierupdate[type] = image;
      }
    },
    confirminvitation() {
      this.loadingButton = true;
      this.$axios
        .post("/api/accept-request", { target_id: this.user.id })
        .then((res) => {
          this.loadingButton = false;
          if (res.data.success) {
            this.is_friend = true;
            this.you_pend = undefined;
          }
        })
        .catch((error) => {
          this.loadingButton = false;
          console.log(error);
        });
    },
    showmenu() {
      this.showMenuAmis = true;
    },
    liked() {
      this.loadingLiked = true;
      this.$axios
        .post(`/api/reaction/store`, {
          id: this.user.id,
        })
        .then((res) => {
          this.HasLiked = res.data.hasLiked;
          this.user.likecount = res.data.countLike;
          this.loadingLiked = false;
          let temp = this.user;
          this.user = temp;
        })
        .catch((error) => {
          console.log(error);
          this.loadingLiked = false;
        });
    },
    handelPreviewFile(event, type) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.updateProfilUser(e.target.result, type);
          that.user.profil[type] = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    handelPreviewFileDossier(event, type) {
      const input = event.target;
      const that = this;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.updateDossierUser(e.target.result, type);
          that.user.dossier[type] = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    updateProfilUser(url, type) {
      let data = {};
      data[type] = url;
      this.loadingModif = true;
      if (type === "cover") {
        this.loadingModifyCover = true;
      } else {
        this.loadingModifyPicture = true;
      }
      this.$axios
        .post(`/api/update-profil/${this.user.id}`, data)
        .then((res) => {
          if (res.data.Success) {
            this.medias.push({
              id: null,
              mediable_id: null,
              mediable_type: "App\\Models\\Dossier",
              file: url,
              created_at: "2023-01-24T07:05:15.000000Z",
              updated_at: "2023-01-24T07:05:15.000000Z",
              user_id: this.$auth.user.user.id,
            });
            if (type == "cover") {
              this.user.profiluser.cover = url;
              this.$store.commit("default/changecover", url);
              let temp = this.user;
              this.user = temp;
              this.loadingModifyCover = false;
              let beat = new Audio("../sound/mixkit-success.wav");
              beat.volume = 0.1;
              beat.play();
              Swal.fire({
                title: "Bravo!",
                text: "Votre photo de couverture a été modifier avec succès",
                type: "success",
                toast: true,
                timer: 3000,
                position: "bottom",
              }).then((result) => {});
            } else {
              this.user.profiluser.picture = url;
              this.$store.commit("default/changepicture", url);
              let temp = this.user;
              this.user = temp;
              this.loadingModifyPicture = false;
              let beat = new Audio("../sound/mixkit-success.wav");
              beat.volume = 0.1;
              beat.play();
              Swal.fire({
                title: "Bravo!",
                text: "Votre photo de profile a été modifier avec succès",
                type: "success",
                toast: true,
                timer: 3000,
                position: "bottom",
              }).then((result) => {});
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    updateDossierUser() {
      this.$axios
        .post(`/api/update-dossier/${this.user.id}`, this.dossierupdate)
        .then((res) => {
          if (res.data.Success) {
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    updateinfo() {
      this.loadingModifInfoUser = true;
      this.$axios
        .post(`/api/update-info/${this.user.id}`, this.userupdate)
        .then((res) => {
          if (res.data.user) {
            this.loadingModifInfoUser = false;
            this.user = res.data.user;
            this.modifyInfo = false;
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Votre information a été modifier avec succès",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    updatedossier() {
      this.$axios
        .post(`/api/update-dossier/${this.user.id}`, this.dossierupdate)
        .then((res) => {
          if (res.data.Success) {
            this.user.dossier = this.dossierupdate;
            let temp = this.user;
            this.user = temp;
            this.modifydossier = false;
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    contacter() {
      this.$store.commit("chat/changediscussionActiveFloatant", {
        user_id: this.$auth.user.user.id,
        target_user: {
          id: this.user.id,
          name: this.user.cooperative_name
            ? this.user.cooperative_name
            : this.user.lastname,
          img: this.user.profiluser
            ? this.user.profiluser.picture
            : "~/static/icons/default/default.webp",
        },
      });
    },
    getAllVehicule(value) {
      if (value) {
        this.$axios
          .get("api/vehicul/all-propertie", {
            params: {
              owner_id: this.$route.params.index,
            },
          })
          .then((res) => {
            this.vehiculs = res.data.vehicules_properties.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    changeConfidenliality(value) {
      this.$axios
        .post("api/update-confidentiality", {
          email:
            value.email && value.email === "Public"
              ? true
              : value.email === "Moi uniquement"
              ? false
              : null,
          cin:
            value.cin && value.cin === "Public"
              ? true
              : value.cin === "Moi uniquement"
              ? false
              : null,
          nif:
            value.nif && value.nif === "Public"
              ? true
              : value.nif === "Moi uniquement"
              ? false
              : null,
          stat:
            value.stat && value.stat === "Public"
              ? true
              : value.stat === "Moi uniquement"
              ? false
              : null,
          phone_number:
            value.phone_number && value.phone_number === "Public"
              ? true
              : value.phone_number === "Moi uniquement"
              ? false
              : null,
          user_id: this.$auth.user.user.id,
        })
        .then((res) => {
          if (res.data.success) {
            let beat = new Audio("../sound/mixkit-success.wav");
            beat.volume = 0.1;
            beat.play();
            Swal.fire({
              title: "Bravo!",
              text: "Le modification a été fait avec success",
              type: "success",
              toast: true,
              timer: 3000,
              position: "bottom",
            }).then((result) => {});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    custDisplay(userData, typeDisplay) {
      if (typeDisplay === "email") {
        if (userData.profile.display && userData.profile.display.email === 0) {
          return "Moi uniquement";
        } else if (
          userData.profile.display &&
          userData.profile.display.email === 1
        ) {
          return "Public";
        } else {
          return "Moi uniquement";
        }
      }
      if (typeDisplay === "cin") {
        if (userData.profile.display && userData.profile.display.cin === 0) {
          return "Moi uniquement";
        } else if (
          userData.profile.display &&
          userData.profile.display.cin === 1
        ) {
          return "Public";
        } else {
          return "Moi uniquement";
        }
      }
      if (typeDisplay === "nif") {
        if (userData.profile.display && userData.profile.display.nif === 0) {
          return "Moi uniquement";
        } else if (
          userData.profile.display &&
          userData.profile.display.nif === 1
        ) {
          return "Public";
        } else {
          return "Moi uniquement";
        }
      }
      if (typeDisplay === "stat") {
        if (userData.profile.display && userData.profile.display.stat === 0) {
          return "Moi uniquement";
        } else if (
          userData.profile.display &&
          userData.profile.display.stat === 1
        ) {
          return "Public";
        } else {
          return "Moi uniquement";
        }
      }
      if (typeDisplay === "phone_number") {
        if (
          userData.profile.display &&
          userData.profile.display.phone_number === 0
        ) {
          return "Moi uniquement";
        } else if (
          userData.profile.display &&
          userData.profile.display.phone_number === 1
        ) {
          return "Public";
        } else {
          return "Moi uniquement";
        }
      }
    },
  },
  async fetch() {
    var userData = null;
    await this.$axios
      .get(`api/other-profil/${this.$route.params.index}`)
      .then((res) => {
        userData = res;
        this.user = res.data.profile;
      })
      .catch((error) => {
        console.log("error", error);
        this.$nuxt.context.error({
          status: 404,
          message: "Post not found",
        });
      });
    const vehiculs = await this.$axios.get("api/vehicul/all-propertie", {
      params: {
        owner_id: this.$route.params.index,
      },
    });
    this.vehiculs = vehiculs.data.vehicules_properties.data;

    this.visibility = {
      email: this.custDisplay(userData.data, "email"),
      cin: this.custDisplay(userData.data, "cin"),
      nif: this.custDisplay(userData.data, "nif"),
      stat: this.custDisplay(userData.data, "stat"),
      phone_number: this.custDisplay(userData.data, "phone_number"),
    };
    this.userupdate = {
      genre: this.user.genre,
      cooperative_name: this.user.cooperative_name,
      name: this.user.name,
      lastname: this.user.lastname,
      phone_number: this.user.phone_number,
      email: this.user.email,
      adress: this.user.adress,
      cin_number: this.user.dossier ? this.user.dossier.cin_number : "",
      nif_number: this.user.dossier ? this.user.dossier.nif_number : "",
      stat_number: this.user.dossier ? this.user.dossier.stat_number : "",
      bio: this.user.bio,
    };
    this.dossierupdate = {
      cin_recto: this.user.dossier ? this.user.dossier.cin_recto : "",
      cin_verso: this.user.dossier ? this.user.dossier.cin_verso : "",
      stat_recto: this.user.dossier ? this.user.dossier.stat_recto : "",
      stat_verso: this.user.dossier ? this.user.dossier.stat_verso : "",
      nif_recto: this.user.dossier ? this.user.dossier.nif_recto : "",
      nif_verso: this.user.dossier ? this.user.dossier.nif_verso : "",
      cin_number:
        this.user.dossier && this.user.dossier.cin_number
          ? this.user.dossier.cin_number
          : "",
      nif_number:
        this.user.dossier && this.user.dossier.nif_number
          ? this.user.dossier.nif_number
          : "",
      stat_number:
        this.user.dossier && this.user.dossier.stat_number
          ? this.user.dossier.stat_number
          : "",
    };
    this.HasLiked = userData.data.hasLiked;
    this.is_friend = userData.data.is_friend;
    this.i_pend = userData.data.i_pend;
    this.you_pend = userData.data.you_pend;

    const publicitythree = await this.$axios.get(
      `api/publicity/threeLatest-publicity/${this.user.id}`
    );
    this.publicity = publicitythree.data.allPublicity;
    // get all media user auth
    const media = await this.$axios.get("api/user/medias", {
      params: {
        user_id: this.$route.params.index,
      },
    });
    this.medias = media.data;
    this.medias = this.medias.filter((media) => media.file != null);
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

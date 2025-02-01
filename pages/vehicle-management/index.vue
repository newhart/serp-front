<template>
  <div class="">
    <div class="filter-top-zero mb-2-in-599">
      <v-row class="ma-0 block-filtre my-4">
        <v-col
          @click="tab = 0"
          class="pa-2 d-flex cursor-pointor"
          :class="tab === 0 ? 'bg-secondary active' : ''"
          cols="12"
          xl="3"
          lg="3"
          md="3"
          sm="6"
          xs="6"
        >
          <v-icon color="secondary" class="mr-2"> mdi-car-estate </v-icon>
          <p class="text-primary limite1-lign">Gérer votre gamme de voiture</p>
        </v-col>
        <v-col
          :class="tab === 1 ? 'bg-secondary active' : ''"
          @click="tab = 1"
          class="pa-2 d-flex cursor-pointor"
          cols="12"
          xl="3"
          lg="3"
          md="3"
          sm="6"
          xs="6"
        >
          <v-icon color="secondary" class="mr-2"> mdi-car-settings </v-icon>
          <p class="text-primary limite1-lign">Gérer votre destination</p>
        </v-col>
        <v-col
          :class="tab === 2 ? 'bg-secondary active' : ''"
          @click="tab = 2"
          class="pa-2 d-flex cursor-pointor"
          cols="12"
          xl="3"
          lg="3"
          md="3"
          sm="6"
          xs="6"
        >
          <v-icon color="secondary" class="mr-2"> mdi-car-multiple </v-icon>
          <p class="text-primary limite1-lign">Liste des véhicules</p>
        </v-col>
        <v-col
          :class="tab === 3 ? 'bg-secondary active' : ''"
          @click="tab = 3"
          class="pa-2 d-flex cursor-pointor"
          cols="12"
          xl="3"
          lg="3"
          md="3"
          sm="6"
          xs="6"
        >
          <v-icon color="secondary" class="mr-2"> mdi-car-select </v-icon>
          <p class="text-primary limite1-lign">Tours de véhicules</p>
        </v-col>
      </v-row>
    </div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center mb-3">
              <!-- <p class="text-primary pr-2 font-bold">
                {{
                  gammeCount
                    ? gammeCount.length + " gamme(s) publié"
                    : "chargement..."
                }}
              </p> -->
            </div>
            <div class="d-flex align-center mb-3">
              <v-btn
                @click="dialogueaddgammevoiture = true"
                color="primary"
                rounded
                class="font12 mr-3"
              >
                Ajouter
              </v-btn>
              <!--            create new  game for cooperative-->
              <v-dialog
                v-model="dialogueaddgammevoiture"
                width="500"
                overlay-color="#000"
                overlay-opacity="0.5"
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
                    <v-row
                      v-for="(item, index) in form_game"
                      :key="index"
                      class="ma-0 pa-0"
                    >
                      <v-col class="pa-1 pb-0" cols="2">
                        <p class="text-primary font12 text-center">
                          {{ "Logo " + (index + 1) }}
                        </p>
                        <picture-input
                          ref="pictureInput"
                          width="34.39"
                          height="34.39"
                          margin="0"
                          accept="image/jpeg,image/png"
                          size="10"
                          button-class="d-none"
                          v-if="dialogueaddgammevoiture"
                          :custom-strings="{
                            upload: '<h1>Bummer!</h1>',
                            drag: 'Drag a 😺 GIF or GTFO',
                          }"
                          @change="onChange($event, index)"
                          class="my-1"
                          :remove="true"
                        >
                        </picture-input>
                      </v-col>
                      <v-col class="pa-1 pb-0" cols="5">
                        <p class="text-primary font12">
                          {{ "Route national " + (index + 1) }}
                        </p>
                        <InputSelect
                          :data_options="categorie_destinations"
                          @onModify="(value) => (item.destination = value)"
                          :model="item.destination"
                        />
                      </v-col>
                      <v-col class="pa-1 pb-0" cols="5">
                        <p class="text-primary font12">
                          {{ "Classe" + (index + 1) }}
                        </p>
                        <InputSelect
                          :data_options="games_cooperatives"
                          @onModify="(value) => (item.game = value)"
                          :model="item.game"
                        />
                        <!-- :model="item.game.name ? item.game.name : item.game" -->
                      </v-col>
                      <v-col
                        class="px-2 pt-1 my-0 d-flex justify-end align-center"
                        cols="12"
                      >
                        <p
                          @click="deletearrive(index)"
                          class="d-text-primary font12 px-1 cursor-pointor"
                          v-if="index == arriveIndex && arriveIndex > 0"
                        >
                          {{ "Supprimer ce gamme" }}
                        </p>
                        <p
                          class="px-2"
                          v-if="index == arriveIndex && arriveIndex > 0"
                        >
                          |
                        </p>
                        <p
                          @click="
                            arriveIndex === index
                              ? addNewarrive(index)
                              : deletearrive(index)
                          "
                          class="d-text-primary font12 px-1 cursor-pointor"
                        >
                          {{
                            arriveIndex === index
                              ? "Ajouter une autre gamme"
                              : "Supprimer ce gamme"
                          }}
                        </p>
                      </v-col>
                    </v-row>

                    <v-col class="pa-1" cols="12">
                      <v-btn
                        @click="addNewGame()"
                        class="w-100"
                        color="secondary"
                        :loading="loadaddnewgamme"
                      >
                        Enregistrer
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-dialog>
              <!--            end create new game-->
            </div>
          </div>
          <div v-if="gammes">
            <div v-if="gammes.length > 0" class="list-gamme">
              <div
                v-for="(gamme, index) in gammes"
                :key="index"
                class="item-gamme"
              >
                <hr class="border-primary w-plus" />
                <div class="py-2">
                  <div class="d-flex align-center justify-between">
                    <p class="text-primary underline-bottom">
                      <span class="font-bold"> Destination: </span>
                      <span class="text-secondary">{{ gamme.name }}</span>
                    </p>
                  </div>
                  <div class="ma-0 row">
                    <v-col
                      cols="12"
                      xl="4"
                      lg="4"
                      md="6"
                      sm="6"
                      xs="6"
                      class="pa-1 ma-0"
                      v-for="(type, i) in gamme.gamme"
                      :key="i * 4"
                    >
                      <FrontGestionVehiculeItemGamme
                        :type="type"
                        @updateGamme="getGamme"
                      />
                    </v-col>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <FrontDefaultNoresult />
            </div>
          </div>
          <div v-else>
            <div class="list-gamme">
              <div v-for="(gamme, index) in 3" :key="index" class="item-gamme">
                <hr class="border-primary w-plus" />
                <div class="py-2">
                  <div class="ma-0 row">
                    <v-col
                      cols="12"
                      xl="4"
                      lg="4"
                      md="6"
                      sm="6"
                      xs="6"
                      class="pa-1 ma-0"
                      v-for="(type, i) in 3"
                      :key="i * 4"
                    >
                      <FrontGestionVehiculeItemGamme />
                    </v-col>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center mb-3">
              <p class="text-primary pr-2 font-bold">
                {{ destinations ? "Mes destinations" : "chargement..." }}
              </p>
            </div>
            <div class="d-flex align-center mb-3">
              <v-btn
                @click="dialogueadddestination = true"
                color="primary"
                class="font12 mr-3"
              >
                Ajouter
              </v-btn>
              <!--            create new  destination for cooperative-->
              <v-dialog
                v-model="dialogueadddestination"
                width="500"
                overlay-color="#000"
                overlay-opacity="0.5"
                content-class="pa-6"
              >
                <v-card>
                  <v-icon
                    @click="dialogueadddestination = false"
                    class="close-dialogue"
                    color="secondary"
                  >
                    mdi-close-circle
                  </v-icon>
                  <v-row class="ma-0">
                    <v-row class="ma-0">
                      <v-col class="pa-1" cols="12">
                        <h3 class="text-secondary text-center text-bold mb-4">
                          Ajouter votre nouvelle destination
                        </h3>
                      </v-col>
                    </v-row>

                    <FrontGestionVehiculeAddDestination
                      :dialogueadddestination="dialogueadddestination"
                      @saveDetination="getDestinationStored"
                    />
                  </v-row>
                </v-card>
              </v-dialog>
              <!--            end create new destination-->
            </div>
          </div>
          <div class="list-destination">
            <div class="item-gamme">
              <hr class="border-primary w-plus" />
              <div v-if="destinations" class="py-2">
                <v-row v-if="destinations.length > 0" class="ma-0 mt-4">
                  <v-col
                    cols="12"
                    xl="6"
                    lg="12"
                    md="12"
                    sm="12"
                    v-for="(destination, i) in destinations"
                    :key="i"
                    class="pa-1 ma-0"
                  >
                    <v-expansion-panels
                      v-model="showDestination"
                      :disabled="true"
                      multiple
                      focusable
                      accordion
                      class="mt-n2 expand-disabled-destination"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <div class="d-flex">
                            <div
                              class="d-flex direction-column justify-arround ml-3"
                            >
                              <label class="text-primary font-bold">
                                <span class="text-secondary">
                                  {{ destination.gamme.name }}
                                </span>
                                - {{ destination.type.name }}
                              </label>
                            </div>
                          </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                          <v-simple-table dense>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left font-bold">Départ</th>
                                  <th class="text-left font-bold">Arrivé</th>
                                  <th class="text-left font-bold">Tarif(Ar)</th>
                                  <th class="text-left font-bold">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(
                                    itineraire, index
                                  ) in destination.intineraires"
                                  :key="index * 8"
                                >
                                  <td>{{ itineraire.departure }}</td>
                                  <td>{{ itineraire.arrival }}</td>
                                  <td>
                                    {{ itineraire.price.toLocaleString() }}
                                  </td>
                                  <td class="text-center">
                                    <v-dialog
                                      width="400"
                                      overlay-color="#000"
                                      overlay-opacity="0.5"
                                      content-class="pa-6"
                                    >
                                      <template
                                        v-slot:activator="{ on, attrs }"
                                      >
                                        <v-btn
                                          color="primary"
                                          icon
                                          class="font12"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="udpateItineraire(itineraire)"
                                        >
                                          <v-icon>
                                            mdi-pencil-box-multiple
                                          </v-icon>
                                        </v-btn>
                                      </template>
                                      <template v-slot:default="dialog">
                                        <v-row class="justify-center ma-0">
                                          <v-row class="ma-0">
                                            <v-col class="pa-1" cols="12">
                                              <h3
                                                class="text-secondary text-center text-bold mb-4"
                                              >
                                                Modification itineraire
                                              </h3>
                                            </v-col>
                                            <v-row class="pa-0 ma-0">
                                              <v-col class="px-1 py-0" cols="4">
                                                <div class="form-input">
                                                  <p
                                                    class="font12 text-primary"
                                                  >
                                                    Départ
                                                  </p>
                                                  <input
                                                    type="text"
                                                    class="input-global3 my-2"
                                                    v-model="
                                                      form_destinations.departure_city
                                                    "
                                                  />
                                                </div>
                                              </v-col>
                                              <v-col class="px-1 py-0" cols="4">
                                                <div class="form-input">
                                                  <p
                                                    class="font12 text-primary"
                                                  >
                                                    Arrivé
                                                  </p>
                                                  <input
                                                    type="text"
                                                    class="input-global3 my-2"
                                                    v-model="
                                                      form_destinations.arrival_city
                                                    "
                                                  />
                                                </div>
                                              </v-col>
                                              <v-col class="px-1 py-0" cols="4">
                                                <div class="form-input">
                                                  <p
                                                    class="font12 text-primary"
                                                  >
                                                    Prix
                                                  </p>
                                                  <input
                                                    type="number"
                                                    v-model="
                                                      form_destinations.price
                                                    "
                                                    class="input-global3 my-2"
                                                  />
                                                </div>
                                              </v-col>
                                            </v-row>
                                          </v-row>

                                          <v-col class="pa-1" cols="12">
                                            <v-btn
                                              class="w-100"
                                              color="secondary"
                                              @click.prevent="
                                                saveItineraire(),
                                                  (dialog.value = false)
                                              "
                                            >
                                              Modifier
                                            </v-btn>
                                          </v-col>
                                        </v-row>
                                      </template>
                                    </v-dialog>
                                    <v-btn
                                      color="secondary"
                                      icon
                                      class="font12"
                                    >
                                      <v-icon
                                        @click="deleteItineraire(itineraire)"
                                      >
                                        mdi-close-circle
                                      </v-icon>
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
                <div v-else>
                  <FrontDefaultNoresult />
                </div>
              </div>
              <div v-else class="py-2">
                <v-row class="ma-0 mt-4">
                  <v-col
                    cols="12"
                    xl="6"
                    lg="12"
                    md="12"
                    sm="12"
                    v-for="(destination, i) in 4"
                    :key="i"
                    class="pa-1 ma-0"
                  >
                    <v-expansion-panels
                      v-model="showDestination"
                      :disabled="true"
                      multiple
                      focusable
                      accordion
                      class="mt-n2 expand-disabled-destination placeholder-wave"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <div class="d-flex">
                            <div
                              class="d-flex direction-column justify-arround ml-3"
                            >
                              <label class="text-primary font-bold placeholder">
                              </label>
                            </div>
                          </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                          <v-simple-table dense>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left font-bold">Départ</th>
                                  <th class="text-left font-bold">Arrivé</th>
                                  <th class="text-left font-bold">Tarif(Ar)</th>
                                  <th class="text-left font-bold">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(itineraire, index) in 3"
                                  :key="index * 8"
                                >
                                  <td class="">...</td>
                                  <td class="">...</td>
                                  <td class="">...</td>
                                  <td class="text-center">
                                    <v-btn
                                      color="primary"
                                      icon
                                      class="font12 placeholder"
                                    >
                                    </v-btn>
                                    <v-btn
                                      color="secondary"
                                      icon
                                      class="font12 placeholder"
                                    >
                                    </v-btn>
                                  </td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <div class="d-flex justify-between align-center">
            <div class="d-flex align-center mb-3">
              <p class="text-primary pr-2 font-bold">
                {{ vehiculs ? "Mes voitures" : "Chargement..." }}
              </p>
            </div>
            <div class="d-flex align-center mb-3">
              <v-btn
                @click="dialogueaddvoiture = true"
                color="primary"
                class="font12 mr-3"
              >
                Ajouter
              </v-btn>
              <!--            create new  vehicule for cooperative-->
              <v-dialog
                v-model="dialogueaddvoiture"
                width="500"
                overlay-color="#000"
                overlay-opacity="0.5"
                content-class="pa-6"
              >
                <v-card>
                  <v-icon
                    @click="dialogueaddvoiture = false"
                    class="close-dialogue"
                    color="secondary"
                  >
                    mdi-close-circle
                  </v-icon>
                  <v-row class="ma-0">
                    <v-row class="ma-0">
                      <v-col class="pa-1" cols="12">
                        <h3 class="text-secondary text-center text-bold mb-4">
                          Ajouter votre nouvelle voiture
                        </h3>
                      </v-col>
                    </v-row>

                    <FrontGestionVehiculeAddVehicule
                      @register="getVehiculeRegistred"
                      :is_created="is_created"
                      :form_vehicul_props="form_vehicul"
                    />
                  </v-row>
                </v-card>
              </v-dialog>
              <!--            end create new vehicule-->
            </div>
          </div>
          <div class="filter-top-zero">
            <FilterInput
              :allDestination="departures"
              :allArrival="arrivals"
              type="vehiculs"
              :loadingfilter="loadingfilter"
              :cooperativeOption="games_cooperatives"
              @handelChangeDestination="getDestinationVehicul"
              @handelChangeCooperative="getGammeVehicule"
            />
          </div>
          <v-row v-if="vehiculs" class="ma-0 list-cooperative">
            <v-row
              v-if="vehiculs.length > 0"
              class="list-vehicul max-w-100 ma-0"
            >
              <v-col
                cols="12"
                xl="6"
                lg="6"
                md="12"
                class="pa-1"
                v-for="(vehicul, index) in vehiculs"
                :key="index"
              >
                <FrontGestionVehiculeItemVehicule
                  :vehicul="vehicul"
                  @associate="getVehiculeRegistred"
                  @handelDelete="getVehiculeRegistred"
                  @handelUpdate="updateVehicul"
                />
              </v-col>
            </v-row>
            <div class="col col-12" v-else>
              <FrontDefaultNoresult />
            </div>
          </v-row>
          <v-row v-else class="ma-0 list-cooperative">
            <v-row class="list-vehicul max-w-100 ma-0">
              <v-col
                cols="12"
                xl="6"
                lg="6"
                md="12"
                class="pa-1"
                v-for="(vehicul, index) in 4"
                :key="index"
              >
                <FrontGestionVehiculeItemVehicule />
              </v-col>
            </v-row>
          </v-row>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="card-default pa-3">
          <v-row class="ma-0">
            <v-col cols="12" class="pa-1 d-flex justify-between align-center">
              <p v-if="tours" class="text-primary font-bold">
                <!-- Vous avez
                <span class="text-secondary">{{ tours.length }}</span>
                catégorie(s) de place(s) disponible(s) -->
                Gestion des tours
              </p>
              <p v-else class="text-primary font-bold">Chargement...</p>
              <v-btn
                @click="addcat = true"
                color="primary"
                class="font12 no-shadow"
              >
                Ajouter
              </v-btn>
              <v-dialog
                v-model="addcat"
                width="400"
                overlay-color="#000"
                overlay-opacity="0.5"
                content-class="pa-6"
                hidden
              >
                <div class="position-relative">
                  <v-icon
                    @click="addcat = false"
                    class="close-dialogue"
                    color="secondary"
                  >
                    mdi-close-circle
                  </v-icon>
                  <v-row class="ma-0">
                    <v-col class="pa-1" cols="12">
                      <h3 class="text-secondary text-center text-bold mb-4">
                        Gestion de place
                      </h3>
                    </v-col>
                    <v-col class="pa-1 d-flex align-center" cols="4">
                      <p class="text-primary font12">Destination</p>
                    </v-col>
                    <v-col class="pa-1" cols="8">
                      <v-select
                        :items="gammes"
                        item-text="name"
                        class="input-global2"
                        v-model="place_form.id_destination"
                        @input="handelChangeDestination($event)"
                        return-object
                        solo
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col class="pa-1 d-flex align-center" cols="4">
                      <p class="text-primary font12">Gamme de voiture</p>
                    </v-col>
                    <v-col class="pa-1" cols="8">
                      <v-select
                        :items="games_cooperatives"
                        :disabled="is_change"
                        item-text="name"
                        return-object
                        class="input-global2"
                        @input="handelChangeGamme($event)"
                        v-model="place_form.id_gamme"
                        solo
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col class="pa-1 d-flex align-center" cols="4">
                      <p class="text-primary font12">Heure</p>
                    </v-col>
                    <v-col class="pa-1" cols="8">
                      <!-- <vue-timepicker
                        class="input-global2"
                        v-model="place_form.hour"
                        v-if="addcat"
                      >
                      </vue-timepicker> -->
                      <v-select
                        class="input-global2"
                        :items="listHours"
                        v-model="place_form.hour"
                        item-text="heure_minute"
                        solo
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col class="pa-1 d-flex align-center" cols="4">
                      <p class="text-primary font12">Nombre de place</p>
                    </v-col>
                    <v-col class="pa-1" cols="8">
                      <v-select
                        :items="place_number_exists"
                        item-text="place_number"
                        return-object
                        v-model="place_form.place_number"
                        class="input-global2"
                        solo
                        hide-details
                      ></v-select>
                    </v-col>

                    <v-col class="pa-1 mt-3" cols="12">
                      <v-btn
                        @click="createTour()"
                        class="w-100 no-shadow"
                        color="secondary"
                        :loading="loadgestionvehicule"
                      >
                        Enregistrer
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-dialog>
            </v-col>
          </v-row>
          <!-- filter  -->
          <div class="filter-top-zero">
            <FilterInput
              type="tours"
              :allDestination="departures"
              :allArrival="arrivals"
              :cooperativeOption="games_cooperatives"
              @handelChangeDestination="getTourDestination"
              @handelChangeCooperative="getTourByGamme"
              @save="getTourDate"
              :loadingfilter="loadingfilter"
            />
          </div>
          <div v-if="$fetchState.pending || tours === null">
            <v-row class="ma-0 my-3">
              <v-col
                v-for="(tour, index) in 3"
                :key="index"
                cols="12"
                xl="4"
                lg="6"
                md="6"
                sm="12"
                class="pa-1"
              >
                <p class="text-primary font-bold mb-1">
                  Heure :
                  <span class="text-secondary">...</span>
                  |
                  <span class="text-secondary">...</span>
                  places |
                  <span class="text-secondary">...</span>
                  |
                  <span class="text-secondary">...</span>
                </p>
                <div
                  data-v-25fde02c=""
                  data-v-506c0c80=""
                  class="item-cadrechoise"
                >
                  <div
                    data-v-25fde02c=""
                    class="row details-place justity-between pa-0 ma-0"
                  >
                    <div data-v-25fde02c="" class="px-1 py-0 col col-6">
                      <div data-v-25fde02c="" class="d-flex align-center my-2">
                        <div
                          data-v-25fde02c=""
                          class="color color-chaffeur placeholder-wave"
                        >
                          <i
                            data-v-25fde02c=""
                            aria-hidden="true"
                            class="v-icon notranslate mdi mdi-account theme--light"
                          ></i>
                        </div>
                        <p data-v-25fde02c="" class="ml-2 font12 text-primary">
                          ...
                        </p>
                      </div>
                      <div data-v-25fde02c="" class="d-flex align-center my-2">
                        <div
                          data-v-25fde02c=""
                          class="color color-place-libre placeholder-wave"
                        ></div>
                        <p data-v-25fde02c="" class="ml-2 font12 text-primary">
                          ...
                        </p>
                      </div>
                      <div data-v-25fde02c="" class="d-flex align-center my-2">
                        <div
                          data-v-25fde02c=""
                          class="color color-reserver placeholder-wave"
                        ></div>
                        <p data-v-25fde02c="" class="ml-2 font12 text-primary">
                          ...
                        </p>
                      </div>
                      <div data-v-25fde02c="" class="d-flex align-center my-2">
                        <div
                          data-v-25fde02c=""
                          class="color color-place-libre placeholder-wave"
                        ></div>
                        <p data-v-25fde02c="" class="ml-2 font12 text-primary">
                          ...
                        </p>
                      </div>
                    </div>
                    <div data-v-25fde02c="" class="px-1 py-0 col col-6">
                      <div data-v-25fde02c="" class="row ma-0">
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <!---->
                          <div data-v-25fde02c="" class="color color-chaffeur">
                            <i
                              data-v-25fde02c=""
                              aria-hidden="true"
                              class="v-icon notranslate mdi mdi-account theme--light"
                            ></i>
                          </div>
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <!---->
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          >
                            3
                          </div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <!---->
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <!---->
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <!---->
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-place-libre placeholder-wave"
                          ></div>
                          <!---->
                        </div>
                        <div data-v-25fde02c="" class="pa-1 col col-3">
                          <div
                            data-v-25fde02c=""
                            class="color color-reserver"
                          ></div>
                          <!---->
                        </div>
                      </div>
                    </div>
                    <div
                      data-v-25fde02c=""
                      class="px-1 py-0 d-flex align-center justify-between col col-12"
                    >
                      <!---->
                      <button
                        data-v-25fde02c=""
                        type="button"
                        class="font12 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                      >
                        <span class="v-btn__content"> Ajouter de voiture </span>
                      </button>
                      <div
                        data-v-25fde02c=""
                        class="v-dialog__container"
                        hidden="hidden"
                      >
                        <!---->
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row v-if="tours.length" class="ma-0 my-3">
              <v-col
                v-for="(tour, index) in tours"
                :key="index"
                cols="12"
                xl="4"
                lg="6"
                md="6"
                sm="12"
                class="pa-1"
              >
                <p class="text-primary font-bold mb-1">
                  Heure :
                  <span class="text-secondary">{{
                    generateHours(
                      $moment(tour.hour, "HH:mm").format("HH:mm - A")
                    )
                  }}</span>
                  |
                  <span class="text-secondary">{{ tour.place_number }}</span>
                  places |
                  <span class="text-secondary">{{ tour.gamme.name }}</span>
                  |
                  <span class="text-secondary">{{
                    tour.destination.name
                  }}</span>
                </p>
                <FrontGestionVehiculeItemCadre
                  :tour="tour"
                  @assoiciate="allTour"
                />
              </v-col>
            </v-row>
            <div v-else>
              <FrontDefaultNoresult />
            </div>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import Vue from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
Vue.component("vue-timepicker", VueTimepicker);
export default {
  head: {
    titleTemplate: "R23 - Gérer votre véhicule",
  },
  data() {
    return {
      listHours: [],
      tab: 0,
      dialogueaddgammevoiture: false,
      dialogueaddvoiture: false,
      dialogueadddestination: false,
      games_cooperatives: [],
      gammes: null,
      loadgestionvehicule: false,
      addcat: false,
      loadingfilter: false,
      is_created: true,
      //  forms games
      form_game: [
        {
          destination: null,
          game: null,
          image: null,
        },
      ],
      form_vehicul: null,
      arriveadded: [0],
      arriveIndex: 0,
      categorie_destinations: [],
      showDestination: [0, 1, 2, 3, 4, 5],
      destinations: null,
      image: null,
      vehiculs: null,
      loadaddnewgamme: false,
      place_number_exists: [],
      place_type: ["3 banquettes", "4 banquettes"],
      place_form: {
        id_destination: null,
        id_gamme: null,
        hour: null,
        place_number: null,
        date: null,
      },
      tours: [],
      is_change: true,
      // destination form for update
      form_destinations: {
        arrival_city: null,
        departure_city: null,
        id: null,
        price: null,
        destination_id: null,
      },
      sub_categories: [],
      udpateItineraireModel: false,
      arrivals: [],
      departures: [],
      // model for filter
      arrival_choiced: null,
      depart_choiced: null,
      gamme_choiced: null,
      date_choiced: null,
      // vehicule filter
      vehicul_arrival: null,
      vehicul_departure: null,
      gammeCount: [],
      errorAddGamme: false,
      errordeleteitineraire: false,
    };
  },
  async fetch() {
    const data = await this.$axios.get("api/gamme/all");
    this.gammes = data.data.gamme;
    const destination = await this.$axios.get("api/destination/cooperative");
    this.destinations = destination.data.destinations;
    // get all vehicul
    const vehicul = await this.$axios.get("api/vehicul/all-cooperative");
    if (vehicul.data && vehicul.data.data) {
      this.vehiculs = vehicul.data.data;
    }

    // get all tours for cooperative
    const all_tours = await this.$axios.get("api/tour/index");
    this.tours = all_tours.data.tours;

    // get all itineraire  for the destination
    const itineraires = await this.$axios.get("api/owner-intineraire");
    this.arrivals = itineraires.data;
    this.departures = itineraires.data;
    // get all destination
    const categorie = await this.$axios.get("api/categorie/all");
    this.categorie_destinations = categorie.data.categories;
    // get all gamme
    const type = await this.$axios.get("api/gamme/all-gamme");
    this.games_cooperatives = type.data.gamme;
    // get all hours
    const hour = await this.$axios.get("api/heure/all");
    this.listHours = hour.data;
  },
  watch: {
    addcat: {
      handler(value) {
        if (value) {
          this.place_form = {
            id_destination: null,
            id_gamme: null,
            hour: null,
            place_number: null,
            date: null,
          };
        }
      },
      immediate: true,
    },
    dialogueaddvoiture: {
      handler(value) {
        if (value === false) {
          this.is_created = true;
          this.form_game = [
            {
              destination: null,
              game: null,
              image: null,
            },
          ];
        }
      },
      immediate: true,
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("date/changedepart", null);
    next();
  },
  methods: {
    getValueTarget(event, target) {
      if (event) {
        this.form_game[target].destination = event;
      }
    },

    // destination  tours
    getTourDestination(event, type) {
      if (event) {
        if (type === "arrival") {
          this.depart_choiced = event.name;
          this.arrivals = this.departures.filter(
            (item) => item.name !== event.name
          );
        } else {
          this.arrival_choiced = event.name;
          this.departures = this.arrivals.filter((item) => {
            item.name !== event.name;
          });
        }
      } else {
        this.$fetch();
      }

      if (this.depart_choiced && this.arrival_choiced) {
        this.loadingfilter = true;
        this.$axios
          .get("api/tour/index", {
            params: {
              arrival: this.depart_choiced,
              departure: this.arrival_choiced,
            },
          })
          .then((res) => {
            this.tours = res.data.tours;
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      }
    },
    getTourByGamme(event) {
      if (event) {
        this.loadingfilter = true;
        this.$axios
          .get("api/tour/index", {
            params: {
              gamme_name: event.name,
            },
          })
          .then((res) => {
            this.tours = res.data.tours;
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      } else {
        this.$fetch();
      }
    },
    getTourDate(event) {
      if (event) {
        this.loadingfilter = true;
        this.$axios
          .get("api/tour/index", {
            params: {
              date: event,
            },
          })
          .then((res) => {
            this.tours = res.data.tours;
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      } else {
        this.getAllTour();
      }
    },
    getGammeVehicule(event) {
      if (event) {
        this.$axios
          .get("api/vehicul/all-cooperative", {
            params: {
              gamme_name: event.name,
            },
          })
          .then((res) => {
            this.vehiculs = res.data.data;
          });
      } else {
        this.loadingfilter = true;
        this.$axios
          .get("api/vehicul/all-cooperative")
          .then((res) => {
            this.vehiculs = res.data.data;
            this.loadingfilter = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingfilter = false;
          });
      }
    },
    getDestinationVehicul(event, type) {
      if (event) {
        if (type === "arrival") {
          this.vehicul_departure = event.name;
        } else {
          this.vehicul_arrival = event.name;
        }
        if (this.vehicul_arrival && this.vehicul_departure) {
          this.loadingfilter = true;
          this.$axios
            .get("api/vehicul/all-cooperative", {
              params: {
                arrival: this.vehicul_arrival,
                depart: this.vehicul_departure,
              },
            })
            .then((res) => {
              this.vehiculs = res.data.data;
              this.loadingfilter = false;
            })
            .catch((error) => {
              console.log(error);
              this.loadingfilter = false;
            });
        }
      } else {
        this.$axios
          .get("api/vehicul/all-cooperative")
          .then((res) => {
            this.vehiculs = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handelChangeDestination(event) {
      this.is_change = false;
      this.games_cooperatives = event.gamme;
    },
    generateHours(hour) {
      if (hour.includes("AM")) {
        return hour.replace("AM", "Matin");
      }
      return hour.replace("PM", "Midi");
    },
    handelChangeGamme(event) {
      if (event.id && this.place_form.id_destination.id) {
        this.$axios
          .get("api/vehicul/gamme-type", {
            params: {
              gamme_id: this.place_form.id_destination.id,
              type_id: event.id,
            },
          })
          .then((res) => {
            this.place_number_exists = res.data;
            this.place_form.place_number = null;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    async getAllTour() {
      this.$axios
        .get("api/tour/index")
        .then((res) => {
          this.tours = res.data.tours;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    createTour() {
      if (this.place_form.id_destination === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ destination est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return false;
      }
      if (this.place_form.id_gamme === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ gamme de voiture est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return false;
      }
      if (this.place_form.hour === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ heure est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return false;
      }
      if (this.place_form.place_number === null) {
        Swal.fire({
          title: "Oups!",
          text: "Le champ nombre de place est obligatoire",
          type: "error",
          toast: true,
          timer: 3000,
          position: "bottom",
        }).then((result) => {});
        return false;
      }
      this.loadgestionvehicule = true;
      this.place_form.date = this.$moment().format("YYYY-MM-DD");
      this.$axios
        .post("api/tour/create", this.place_form)
        .then((res) => {
          this.loadgestionvehicule = false;
          if (res.data.success) {
            this.addcat = false;
            this.place_form = {
              id_destination: null,
              id_gamme: null,
              hour: null,
              place_number: null,
              date: null,
            };
            this.tours = null;
            console.log("geting tour ... ");
            this.getAllTour();
            return false;
          }
          if (res.data.error === "tour already exists") {
            this.$swal("Erreur!", "tour deja créée", "error");
          }
        })
        .catch((error) => {
          this.loadgestionvehicule = false;
          console.log(error);
        });
    },
    addNewarrive(e) {
      this.arriveIndex++;
      this.form_game.push({
        destination: null,
        game: null,
      });
    },
    allTour(success) {
      if (success) {
        this.getAllTour();
      }
    },
    getGamme() {
      this.$axios
        .get("api/gamme/all")
        .then((res) => {
          this.gammes = res.data.gamme;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletearrive(e) {
      this.arriveIndex--;
      this.form_game.pop(e + 1);
    },
    onChange(image, index) {
      if (image) {
        this.image = image;
        this.form_game[index].image = image;
      }
    },

    getDestinationStored(value) {
      if (value) {
        this.dialogueadddestination = false;
        this.destinations = null;
        this.$axios
          .get("api/destination/cooperative")
          .then((res) => {
            this.destinations = res.data.destinations;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    getVehiculeRegistred(value) {
      if (value) {
        this.dialogueaddvoiture = false;
        this.vehiculs = null;
        this.$axios
          .get("api/vehicul/all-cooperative")
          .then((res) => {
            this.is_created = true;
            this.vehiculs = res.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    updateVehicul(modal, is_created, vehicul) {
      (this.dialogueaddvoiture = modal), (this.is_created = is_created);
      this.form_vehicul = vehicul;
    },

    addNewGame() {
      this.loadaddnewgamme = true;
      this.form_game.forEach((item) => {
        if (item.destination.name || item.destination) {
          item.destination = item.destination.name
            ? item.destination.name
            : item.destination;
          this.errorAddGamme = false;
        } else {
          Swal.fire({
            title: "Oups!",
            text: "Le champ Route national est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        }

        if (item.game.name || item.game) {
          item.game = item.game.name ? item.game.name : item.game;
          this.errorAddGamme = false;
        } else {
          Swal.fire({
            title: "Oups!",
            text: "Le champ classe est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        }
        if (!item.image) {
          Swal.fire({
            title: "Oups!",
            text: "Le champ logo est obligatoire",
            type: "error",
            toast: true,
            timer: 3000,
            position: "bottom",
          });
          this.loadaddnewgamme = false;
          this.errorAddGamme = true;
          return;
        } else {
          this.errorAddGamme = false;
        }
      });
      if (this.errorAddGamme) {
        return;
      }
      this.$axios
        .post("/api/gamme/store", { types: this.form_game })
        .then((res) => {
          if (res.data.success) {
            this.loadaddnewgamme = false;
            this.dialogueaddgammevoiture = false;
            this.form_game = [
              {
                destination: null,
                game: null,
                image: null,
              },
            ];
            this.gammes = null;
            this.$fetch();
          }
          if (res.data.error) {
            this.loadaddnewgamme = false;
          }
        })
        .catch((error) => {
          this.loadaddnewgamme = false;
          console.log(error);
        });
    },
    udpateItineraire(itineraire) {
      this.form_destinations.arrival_city = itineraire.arrival;
      this.form_destinations.departure_city = itineraire.departure;
      this.form_destinations.price = itineraire.price;
      this.form_destinations.id = itineraire.id;
      this.form_destinations.destination_id = itineraire.destination_id;
      this.udpateItineraireModel = true;
    },
    saveItineraire() {
      this.$axios
        .post("api/destination/itineraire/update", this.form_destinations)
        .then((res) => {
          if (res.data.success) {
            this.getDestinationStored(true);
            this.udpateItineraireModel = false;
            this.$swal("Succès !", "Modification avec succès", "succès");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteItineraire(itineraire) {
      Swal.fire({
        title: "Êtes-vous vraiment supprimer?",
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
            .post("api/destination/delete/itineraire", itineraire)
            .then((res) => {
              if (res.data.success) {
                this.getDestinationStored(true);
                this.errordeleteitineraire = false;
              } else {
                this.errordeleteitineraire = true;
              }
            })
            .catch((error) => {
              console.log("error itinerair", error);
            });
        },
      }).then((result) => {
        if (result.value) {
          if (this.errordeleteitineraire) {
            let beat = new Audio('../sound/mixkit-wrong.wav');
            beat.play();
            beat.volume = 0.1;
            Swal.fire(
              "Oups!",
              "Votre itinéraire a été déjà lié a un tour.",
              "error"
            ).then((result) => {
              this.errordeleteitineraire = false;
            });
          } else {
            Swal.fire(
              "Supprimé!",
              "Votre itinéraire a été supprimé.",
              "success"
            ).then((result) => {
              this.errordeleteitineraire = false;
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/dernierinscrit.scss";
@import "~/assets/username.scss";
@import "~/assets/list-destination.scss";
.picture-input {
  height: 38px;
  width: 38px !important;
  padding: 0 !important;
  margin-right: auto !important;
}
.ma-0.block-filtre {
  border: 1px #0321533b solid;
  margin-top: 7px !important;
}
.border-secondary {
  border-bottom: 1px #ff3354 solid;
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
  margin: -12px 0 0 -12px;
  border-radius: 15px 0 0;
  padding: 0px 20px;
  margin-right: 10px;
}
@media (max-width: 600px) {
  .row.ma-0.block-filtre.my-4 {
    margin-bottom: 0 !important;
  }
  .mb-2-in-599 {
    margin-bottom: 10px;
  }
}
</style>

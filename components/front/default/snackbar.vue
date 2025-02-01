<template>
  <v-snackbar v-model="snackbardata" :vertical="vertical">
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="secondary"
        text
        v-bind="attrs"
        class="font12"
        @click="fermer()"
      >
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: ["text", "snackbar"],
  data() {
    return {
      vertical: true,
      snackbardata: false,
    };
  },
  methods: {
    fermer() {
      this.snackbardata = false;
      this.$emit("fermer", true);
    },
  },
  watch: {
    snackbar: {
      handler(value) {
        this.snackbardata = value;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

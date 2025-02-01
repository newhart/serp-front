<template>
  <div class="w-100 position-relative my-1">
    <v-btn icon class="icon-menu"> <v-icon> mdi-menu-down</v-icon> </v-btn>
    <input
      v-model="value"
      type="text"
      class="input-select-custom"
      ref="input"
      v-on:keyup.enter="onEnter"
      @input="getValue($event)"
      @focus="focusInput = true"
      @blur="handelBlur"
    />
    <ul v-if="focusInput" class="list-resultat">
      <li
        @click="changeModel(item)"
        v-for="(item, index) in ArrayFilteredList"
        :key="index"
        :class="search == item ? 'active' : ''"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["data_options", "model"],
  data() {
    return {
      search: "",
      focusInput: null,
      array: [],
      status: null,
      options: [
        { id: 1, name: "Antananarivo" },
        { id: 2, name: "Tamatave" },
        { id: 3, name: "Toliara" },
        { id: 4, name: "Mahajanga" },
      ],
      value: null,
      timer: null,
    };
  },
  computed: {
    ArrayFilteredList() {
      const inputSearch =
        typeof this.search === "string" ? this.search : this.search.name;
      return this.data_options.filter((search) => {
        return inputSearch
          .toLowerCase()
          .split(" ")
          .every((v) => search.name.toLowerCase().includes(v));
      });
    },
  },
  methods: {
    onEnter() {
      if (this.ArrayFilteredList[0]) {
        this.search = this.ArrayFilteredList[0];
        this.focusInput = false;
      }
    },
    getValue(event) {
      this.search = event.target.value;
    },
    async changeModel(e) {
      this.search = e;
      this.focusInput = false;
    },
    handelBlur() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.focusInput = false;
      }, 500);
    },
  },
  watch: {
    search: {
      handler(value) {
        if (value) {
          this.array = this.options;
          this.value = typeof value === "string" ? value : value.name;
        }
        this.$emit("onModify", value);
      },
      immediate: true,
      deep: true,
    },
    model: {
      handler(value) {
        if (value) {
          this.search = value;
        } else {
          this.search = "";
          this.value = "";
        }
      },
      immediate: true,
    },
  },
};
</script>
<style scoped>
.input-select-custom {
  background-color: #fff;
  font-size: 12px;
  width: 100%;
  height: 38px;
  border-radius: 5px;
  padding-right: 25px;
  border: 1px #e7e7e7 solid;
}
button.icon-menu {
  position: absolute;
  top: 1px;
  right: 0;
}
ul.list-resultat {
  list-style: none;
  padding: 0;
  font-size: 12px;
  border-radius: 0 0 5px 5px;
  background-color: #fff;
  position: absolute;
  width: 100%;
  top: 34px;
  border: 1px #f3f3f3 solid;
  border-top: none;
  line-height: 23px;
  max-height: 100px;
  overflow-y: auto;
  z-index: 20;
}
ul.list-resultat li {
  padding: 5px 15px;
}
ul.list-resultat li:hover,
ul.list-resultat li.active {
  background-color: #ff335487;
  padding: 5px 15px;
  color: #fff;
}
.hover-block:hover ul.list-resultat,
.hover-block:active ul.list-resultat {
  display: block;
}
</style>

<template>
  <div id="app">
    <spinner :loading="loading"></spinner>
    <tool-bar></tool-bar>
    <transition name="routing-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ToolBar from "./components/ToolBar.vue";
import Spinner from "./components/Spinner.vue";
import bus from "./utils/bus";
import { MutationTypes } from "./store/mutations";
import { ActionsTypes } from "./store/actions";

export default Vue.extend({
  components: {
    ToolBar,
    Spinner,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onProgress() {
      this.loading = true;
    },
    offProgress() {
      this.loading = false;
    },
  },
  async created() {
    // this.$store.state.news;
    // this.$store.commit(MutationTypes.SET_NEWS);
    // const response = await this.$store.dispatch(ActionsTypes.FETCH_NEWS)
    bus.$on("on:progress", this.onProgress);
    bus.$on("off:progress", this.offProgress);
  },
});
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

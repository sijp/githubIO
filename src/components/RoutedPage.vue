<template>
  <div>
    <Page v-bind:pageName="pageName" />
  </div>
</template>

<script>
import Page from "./Page";
import LivePosts from "../config/LivePosts.js";
export default {
  name: "RoutedPage",

  components: {
    Page
  },
  data() {
    return { pageName: this.$route.params.pageName || LivePosts[0].file };
  },
  methods: {
    shouldUpdatePage(pageName) {
      // eslint-disable-next-line
      console.log(
        LivePosts.map(page => page.file),
        pageName,
        LivePosts.map(page => page.file).includes(pageName)
      );
      return LivePosts.map(page => page.file).includes(pageName);
    }
  },

  beforeRouteUpdate(to, from, next) {
    // eslint-disable-next-line
    console.log("beforeRouteUpdate", to.params.pageName, from);
    if (!this.shouldUpdatePage(to.params.pageName)) return next("/");
    this.pageName = to.params.pageName || LivePosts[0].file;
    // eslint-disable-next-line
    console.log("beforeRouteUpdate", to.params.pageName, from);
    return next();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

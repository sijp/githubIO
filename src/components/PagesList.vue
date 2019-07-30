<template>
  <div class="PagesList">
    <md-list>
      <md-list-item v-for="post in posts" v-bind:key="post.title" :to="`/page/${post.file}`">
        <md-icon v-if="selectedPageName===post.file">radio_button_checked</md-icon>
        <md-icon v-else>radio_button_unchecked</md-icon>

        <span class="md-list-item-text">{{post.title}}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import livePosts from "../config/LivePosts.js";

export default {
  name: "PagesList",

  data() {
    return {
      posts: livePosts
    };
  },
  computed: {
    selectedPageName() {
      return this.$store.getters.currentPage;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="markedDown">
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from "marked";
export default {
  name: "MarkedDown",
  props: {
    txt: String
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.txt, { sanitize: true });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markedDown {
  text-align: left;
}
</style>

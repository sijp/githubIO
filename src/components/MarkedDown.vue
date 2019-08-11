<template>
  <div class="markedDown">
    <div v-for="md in compiledMarkdown()" v-bind:key="md.id">
      <EmbeddedApp v-if="md.cmp" :tag="md.cmp"></EmbeddedApp>
      <div v-else v-html="md" />
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import EmbeddedApp from "./EmbeddedApp";
marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

export default {
  name: "MarkedDown",
  props: {
    txt: String
  },
  components: {
    EmbeddedApp
  },
  methods: {
    compiledMarkdown: function() {
      const regex = /<%(.*)%>/g;
      const texts = this.txt.split(regex);

      // eslint-disable-next-line
      const md = texts.map((text, i) =>
        i % 2 === 0 ? marked(text) : { cmp: text }
      );

      // eslint-disable-next-line
      console.log("HEYYYYYYYYYYYYYYYYYY", md);

      return md;
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

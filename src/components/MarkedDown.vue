<template>
  <div class="markedDown">
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
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
  computed: {
    compiledMarkdown: function() {
      /*const occurances = Array.from(this.txt.matchAll(/<%([\w]+)\s(.*)%>/));
      const replacements = occurances.map(occurance => {
        const tag = occurance[1];
        const props = Object.entries(JSON.parse(occurance[2])).map((pair)=>[pair[0],`"${pair[1]}"`].join("=")).join(" ");

        return { occurance, replacement: `<embedded-${tag} ${props}>` };
      });
      const replacedText = replacements.reduce(
        (replacedText, { occurance, replacement }) =>
          replacedText.replace(occurance[0], replacement),
        this.txt
      );
      return marked(replacedText);*/
      return marked(this.txt);
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

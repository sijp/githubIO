<template>
  <div class="EmbeddedApp">
    <md-toolbar md-elevation="0">
      <h3 class="md-title" style="flex: 1">{{title}}</h3>
      <md-button class="md-icon-button" v-on:click="showCode=!showCode">
        <md-icon>code</md-icon>
      </md-button>
    </md-toolbar>
    <md-content>
      <div class="content" v-html="getContent()"></div>
    </md-content>
    <md-content v-if="showCode">
      <div class="content" v-html="getContent(true)"></div>
    </md-content>
  </div>
</template>

<script>
//import MarkedDown from "../components/MarkedDown";

export default {
  name: "EmbeddedApp",
  props: {
    title: String,
    tag: String,
    props: String
  },
  data: () => ({
    showCode: false,
    code: []
  }),
  methods: {
    getContent(code) {
      return `<${this.tag} ${code ? "code='yes'" : ""}/>`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.EmbeddedApp {
  border: 1px solid var(--md-theme-default-toolbarvariant, #f5f5f5);
}
.content {
  padding: 10px;
  max-height: 350px;
  overflow-x: scroll;
}
</style>

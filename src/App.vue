<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last" v-bind:style="{'height': `${contentHeight-100}px`}">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">SIJP.GITHUB.IO</span>
          </div>

          <!-- <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>-->
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar md-elevation="0">
          <h2>PagesList</h2>
        </md-toolbar>

        <PagesList />
      </md-app-drawer>

      <md-app-content id="test">
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import PagesList from "./components/PagesList.vue";

export default {
  name: "app",
  components: {
    PagesList
  },
  data: () => ({
    menuVisible: false,
    contentHeight: window.innerHeight
  }),
  methods: {
    updateWindowHeight() {
      // eslint-disable-next-line
      console.log(this.contentHeight);
      this.contentHeight = window.innerHeight;
    }
  },

  created() {
    window.addEventListener("resize", this.updateWindowHeight);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateWindowHeight);
  }
};
</script>

<style>
body {
  background-color: rgb(250, 250, 250);
}
.md-app {
  height: 600px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

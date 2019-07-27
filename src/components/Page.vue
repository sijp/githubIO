<template>
  <div class="Page">
    <div v-if="loading">LOADING</div>
    <div v-else class="markedDownContainer">
      <MarkedDown :txt="pageTxt" />
    </div>
  </div>
</template>

<script>
import MarkedDown from "./MarkedDown";
export default {
  name: "Page",
  props: {
    pageName: String
  },

  data() {
    return { loading: true, pageTxt: "Loading..." };
  },

  components: {
    MarkedDown
  },

  async beforeCreate() {
    const response = await fetch("/pages/index.md");
    this.pageTxt = await response.text();
    this.loading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markedDownContainer {
  width: 720px;
  margin: 0 auto;
}
</style>

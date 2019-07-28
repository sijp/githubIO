<template>
  <div class="Page">
    <div class="markedDownContainer">
      <MarkedDown :txt="text" />
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
    return { text: "Loading" };
  },

  watch: {
    pageName() {
      this.updatePage();
    }
  },

  methods: {
    async updatePage() {
      const response = await fetch(`/pages/${this.pageName}`);
      this.text = await response.text();
    }
  },

  components: {
    MarkedDown
  },

  async beforeMount() {
    // eslint-disable-next-line
    console.log("beforeMount");
    this.updatePage();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.markedDownContainer {
  width: 720px;
  margin: 0 auto;
  padding: 30px;
}
</style>

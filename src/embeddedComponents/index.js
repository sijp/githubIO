import Vue from "vue";
import HelloWorld from "./HelloWorld";

const webComponents = {
  "embedded-helloworld": {
    cmp: HelloWorld
  }
};

Vue.config.ignoredElements = Object.keys(webComponents);

export default () => {
  Object.entries(webComponents).forEach(element => {
    const [tag, conf] = element;
    // eslint-disable-next-line
    console.log("registering", tag, conf.cmp);
    Vue.customElement(tag, conf.cmp, conf.opts || {});
  });
};

import Vue from "vue";
import HelloWorld from "./HelloWorld";
import MethodClient from "./MethodClient";

const webComponents = {
  "embedded-helloworld": {
    cmp: HelloWorld
  },
  "embedded-methodclient": {
    cmp: MethodClient
  }
};

Vue.config.ignoredElements = Object.keys(webComponents);

export default () => {
  Object.entries(webComponents).forEach(element => {
    const [tag, conf] = element;
    // eslint-disable-next-line
    console.log("registering", tag, conf.cmp);
    Vue.customElement(
      tag,
      conf.cmp,
      conf.opts || {
        props: ["code"],
        beforeCreateVueInstance(RootComponentDefinition) {
          // eslint-disable-next-line
          console.info(
            "beforeCreateVueInstance",
            RootComponentDefinition,
            this.props
          );
          return RootComponentDefinition;
        }
      }
    );
  });
};

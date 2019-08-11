<template>
  <div class="MethodClient">
    <div v-if="code=='yes'">
      <MarkedDown :txt="getMarkDown()"></MarkedDown>
    </div>
    <div v-else>
      <md-button class="md-raised md-primary" v-on:click="callLocalMethod">Run local method</md-button>
      <md-button class="md-raised md-primary" v-on:click="callRemoteMethod">Run remote method</md-button>
      <md-field>
        <label>Client Output</label>
        <md-input class="console" v-model="output" md-autogrow disabled :value="output"></md-input>
      </md-field>
    </div>
  </div>
</template>

<script>
import MarkedDown from "../components/MarkedDown";

const localObj = {
  foo() {
    return "Local Method called";
  }
};

const remoteObj = {
  bar() {
    return "Remote Method Called";
  }
};

function proxify() {
  return new Proxy(localObj, {
    get: function(object, methodName) {
      if (Reflect.has(object, methodName)) {
        return object[methodName];
      }
      return async function() {
        return new Promise(resolve =>
          setTimeout(() => resolve(remoteObj.bar()), 500)
        );
      };
    }
  });
}

const adapter = proxify();

export default {
  name: "MethodClient",
  props: {
    code: String
  },
  components: {
    MarkedDown
  },
  data: () => ({
    output: "",
    sourcecode: {
      foo: localObj.foo.toString(),
      bar: remoteObj.bar.toString(),
      proxify: proxify.toString()
    }
  }),
  methods: {
    async callLocalMethod() {
      this.consoleOutput(await adapter.foo());
    },
    async callRemoteMethod() {
      this.consoleOutput("### Sending Remote Command. please wait... ###");
      this.consoleOutput(await adapter.bar());
    },
    consoleOutput(output) {
      this.output = `${output}\n`;
    },
    getMarkDown() {
      // eslint-disable-next-line
      console.log("sourcecode", this.sourcecode);
      return Object.entries(this.sourcecode)
        .map(pair => {
          const [title, body] = pair;
          return `### ${title}\n\`\`\`\n${body}\n\`\`\` `;
        })
        .join("\n---\n");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.console {
  font-family: "monospace";
}
</style>

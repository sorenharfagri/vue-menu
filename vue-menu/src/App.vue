<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Menu application</h1>
    <hr />
    <Menu
      v-bind:containerComponents="containerComponents"
      v-bind:components="components"
      v-on:change-current-component="changeCurrentComponent"
      v-on:call-rpc-event="callRpc"
    />
    <button v-on:click="goBack">Back</button>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
export default {
  name: "App",
  data() {
    return {
      currentContainer: {},
      history:[]
    };
  },
  computed: {
    containerComponents: function () {
      if (this.currentContainer && this.currentContainer.containerComponents) {
        return this.currentContainer.containerComponents;
      } else {
        return [];
      }
    },
    components: function () {
      if (this.currentContainer && this.currentContainer.components) {
        return this.currentContainer.components.filter(component => {
          return component.isEnabled
        })
      } else {
        return [];
      }
    },
  },
  methods: {
    changeCurrentComponent(component) {
      this.history.push(this.currentContainer)
      this.currentContainer = component;
    },
    callRpc(event) {
      console.log(`Called rpc event ${event}`);
    },
    goBack() {
      if(this.history.length > 0)
      this.currentContainer = this.history.pop()
    }
  },
  created: function () {
    console.log(`Page mounted`);
     this.$socket.emit("getMenu");
  },
  sockets: {
    getMenu: function (data) {
      console.log(`Got menu from server`);
      console.log(`Data is`);
      console.dir(data);
      this.currentContainer = data;
    },
    updateMenu: function (data) {
      console.log('Got update from server')
      this.history = []
      this.currentContainer = data;
    }
  },
  components: {
    Menu,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

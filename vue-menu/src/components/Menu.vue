<template>
  <div id="menu">
    <ul>
      <li>
        <MenuItem
          v-for="containerComponent of containerComponents"
          v-bind:key="containerComponent.componentName"
          v-bind:component="containerComponent"
          v-bind:onClick="() => {$emit('change-current-component', containerComponent)}"
        />
        <MenuItem
          v-for="component of components"
          v-bind:key="component.componentName"
          v-bind:component="component"
          v-bind:onClick="() => {$emit('call-rpc-event', component.rpcEvent)}"
        />
      </li>
    </ul>
  </div>
</template>
  
<script>
import MenuItem from "@/components/MenuItem";
export default {
  props: ["containerComponents", "components"],
  components: {
    MenuItem,
  },
};
</script>


<style scoped>
ul {
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

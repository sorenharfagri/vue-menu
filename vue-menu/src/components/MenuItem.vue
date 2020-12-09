<template>
  <li>
    <button
    v-on:click="onClick"
    >{{ component.componentName }}</button>
  </li>
</template>


<script>
export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  handleClick() {

  }
};
</script>

<style scoped>
li {
    display: flex;
    justify-content: center;
    padding: .5rem 2rem;
    margin-bottom: 1rem;
}
</style>
<template>
  <section>
    <h2>{{name}}</h2>
    <strong>{{source}}</strong>
    <div v-for="item in items" :key="item.id">{{ item.message }}</div>
  </section>
</template>

<script>
module.exports = {
  props: ["items", "name"],

  data: () => ({
    source: "Single File Component"
  })
};
</script>

<style scoped>
strong {
  color: blue;
  font-size: 2em;
}
</style>
<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: "error",
});
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<style lang="scss" scoped>
h2 {
  background: #aaaa;
  margin: 200px 0;
}
</style>

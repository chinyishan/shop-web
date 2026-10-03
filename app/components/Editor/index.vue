<template>
  <div ref="editorViewRef"/>
</template>

<script setup>
import css from "./css/editor.css?inline";
//
const props = defineProps({
  html: {
    type: String,
    default: () => {
      return "<div></div>";
    },
  },
});

const editorViewRef = ref(null);

onMounted(() => {
  const shadowHost = computed(
    () =>
      editorViewRef.value.shadowRoot ||
      editorViewRef.value.attachShadow({ mode: "open" })
  );
  shadowHost.value.innerHTML = props.html + `<style>${css}</style>`;
});
</script>
<style lang="scss" scoped>
.editor-view {
  min-height: 300px;
  margin: 0 0 20px 20px;
}
@include md() {
  .editor-view {
    margin: 0;
  }
}

// .editor-view a {
//   background-color: red;
//   // all: unset;
// }
</style>

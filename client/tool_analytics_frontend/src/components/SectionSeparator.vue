<template>
  <div class="q-pb-lg">
    <div class="text-weight-bold text-h6 no-wrap">
      {{ title }}
    </div>
    <q-separator class="shadow-1" size="2px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SectionSeparator',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>

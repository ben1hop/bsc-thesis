<template>
  <div class="q-pb-lg">
    <div class="text-primary text-weight-bold text-h6 no-wrap">{{ Title }}</div>
    <q-separator class="shadow-1" size="2px" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'SectionSeparator',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Default',
    },
  },
  setup(props) {
    const Title = ref(props.title);
    return {
      Title,
    };
  },
});
</script>

<style lang="scss" scoped></style>

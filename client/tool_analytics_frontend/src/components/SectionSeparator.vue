<template>
  <div class="q-pb-lg">
    <div class="text-weight-bold text-h6 no-wrap">{{ computedTitle }}</div>
    <q-separator class="shadow-1" size="2px" />
  </div>
</template>

<script lang="ts">
import { useAppStore } from 'src/stores/appStore';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'SectionSeparator',
  components: {},
  props: {
    titleIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const appStore = useAppStore();
    const computedTitle = computed(() => {
      return appStore.getTotalPageSeparatorTitle(props.titleIndex); // Use the desired index here
    });
    return {
      computedTitle,
    };
  },
});
</script>

<style lang="scss" scoped></style>

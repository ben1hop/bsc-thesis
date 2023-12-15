<template>
  <q-page class="column justify-start">
    <SectionSeparator :title-index="0" />
    <div class="row">
      <div class="col-2"></div>
      <div class="col row justify-evenly q-mx-lg">
        <q-chip
          v-for="tool in currentTools"
          v-bind:key="tool"
          v-model:selected="tools[tool]"
          icon-selected="sym_r_check"
          clickable
          @click="onClick(tool)"
          :color="selectedColor(tool)"
          size="25px"
        >
          {{ tool }}
        </q-chip>
      </div>

      <div class="col-2"></div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { NamedColor, getCssVar } from 'quasar';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'ComparePage',
  components: { SectionSeparator },
  setup() {
    const appStore = useAppStore();
    const tools = reactive(
      appStore.getTools.reduce((obj: any, key) => {
        obj[key] = false;
        return obj;
      }, {})
    );
    return {
      currentTools: computed(() => appStore.getTools),
      onClick: (tool: string) => {
        tools[tool] ? false : true;
      },
      selectedColor: (tool: string): NamedColor => {
        if (tools[tool]) {
          return 'forth';
        } else {
          return 'primary';
        }
      },
      tools,
    };
  },
});
</script>

<style scoped lang="scss">
.q-chip {
  width: 19%;
}
</style>

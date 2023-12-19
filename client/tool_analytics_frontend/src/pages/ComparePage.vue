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
    <SectionSeparator :title-index="1" />
    <q-card class="q-pa-lg">
      <!-- <div class="row">
        <div class="col-2 text-weight-bold text-h6 no-wrap">
          Selected time span:
        </div>
        <q-range
          class="col-3"
          v-model="years"
          label-always
          :min="currentYears[0]"
          :max="currentYears[currentYears.length - 1]"
        />
      </div> -->
      <div class="row">
        <q-table
          class="col"
          grid
          flat
          bordered
          card-class="bg-primary text-white"
          title="Treats"
          :rows="currentTableRows"
          :columns="columns"
          row-key="name"
          hide-header
          :rows-per-page-options="[currentTools.length]"
        >
        </q-table>
      </div>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { NamedColor } from 'quasar';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { COMPARE_TABLE_ROW, useCompareStore } from 'src/stores/compareStore';
import { computed, defineComponent, reactive, ref } from 'vue';

const columns = [
  {
    name: 'desc',
    required: true,
    align: 'center',
    field: (row: any) => row.name,
    format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'total',
    align: 'center',
    label: 'Total',
    field: 'total',
    sortable: true,
  },
  { name: 'first', label: 'First usage', field: 'first', sortable: true },
  { name: 'growth', label: 'Growth', field: 'growth' },
];

export default defineComponent({
  name: 'ComparePage',
  components: { SectionSeparator },
  setup() {
    const appStore = useAppStore();
    const compareStore = useCompareStore();
    const tools = reactive(
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      appStore.getTools.reduce((obj: any, key) => {
        obj[key] = false;
        return obj;
      }, {})
    );
    let currentTableRows = ref<COMPARE_TABLE_ROW[]>([]);
    const years = reactive({ min: 0, max: 0 });
    return {
      currentTools: computed(() => appStore.getTools),
      currentYears: computed(() => appStore.getYears),
      onClick: (tool: string) => {
        tools[tool] ? false : true;
        currentTableRows.value = compareStore.getCurrentTables(
          Object.keys(tools).filter((key) => tools[key] === true)
        );
      },
      selectedColor: (tool: string): NamedColor => {
        if (tools[tool]) {
          return 'forth';
        } else {
          return 'primary';
        }
      },
      tools,
      years,
      columns,
      currentTableRows,
    };
  },
});
</script>

<style scoped lang="scss">
.q-chip {
  width: 19%;
}
</style>

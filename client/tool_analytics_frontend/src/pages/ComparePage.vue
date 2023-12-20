<template>
  <q-page class="column justify-start">
    <q-card class="q-pa-lg q-mb-lg">
      <SectionSeparator :title="getCurrentSeparatorTitle(0)" />
      <div class="row">
        <div class="col-1"></div>
        <div class="col row justify-evenly q-my-sm selector bg-snow shadow-6">
          <q-chip
            v-for="tool in currentTools"
            v-bind:key="tool"
            v-model:selected="tools[tool]"
            icon-selected="sym_r_check"
            icon="sym_r_add"
            clickable
            @click="onClick(tool)"
            :color="selectedColor(tool)"
            size="19px"
          >
            {{ tool }}
          </q-chip>
        </div>

        <div class="col-1"></div>
      </div>
    </q-card>
    <q-card v-if="hasSelectedTools" class="q-pa-lg q-mt-lg">
      <div class="row q-py-lg">
        <q-table
          class="col"
          grid
          flat
          bordered
          card-container-class="justify-left"
          card-class="text-accent bg-snow text-h6 shadow-3"
          :rows="currentTableRows"
          :columns="columns"
          row-key="name"
          hide-header
          :rows-per-page-options="[currentTools.length]"
        >
          <template v-slot:item="props">
            <div
              class="q-pa-xs q-ma-xs col-xs-12 col-sm-5 col-md-3 text-accent"
            >
              <q-card class="q-pa-md bg-snow shadow-4">
                <div class="text-h6 text-center text-primary bg-forth">
                  <strong>{{ props.row.name }}</strong>
                </div>
                <q-separator />
                <div class="q-my-md">
                  <div class="text-subtitle1 cls">Total</div>
                  <div class="q-pl-sm text-subtitle1 text-bold text-italic">
                    {{ props.row.total }}
                  </div>
                </div>

                <div class="q-my-md">
                  <div class="text-subtitle1 cls">First</div>
                  <div class="q-pl-sm text-subtitle1 text-bold text-italic">
                    {{ props.row.first }}
                  </div>
                </div>
                <div class="q-mt-md">
                  <div class="text-subtitle1 cls">Growth</div>
                  <div class="q-pl-sm text-subtitle1 text-bold text-italic">
                    <q-icon
                      v-if="!props.row.growth"
                      name="sym_r_trending_down"
                      class="col"
                      size="md"
                      color="negative"
                    />
                    <q-icon
                      v-else
                      name="sym_r_trending_up"
                      class="col"
                      size="md"
                      color="positive"
                    />
                  </div>
                </div>
              </q-card>
            </div>
          </template>
        </q-table>
        <div class="col-6">
          <SectionSeparator :title="getCurrentSeparatorTitle(1)" />
          <BarChart :data="totalCompareChartData" title="" />
        </div>
      </div>
      <!-- <SectionSeparator class="q-pt-lg" :title="getCurrentSeparatorTitle(2)" />
      <div class="row justify-evenly">
        <PieChart
          v-for="tool in selectedTools"
          v-bind:key="tool"
          :title="a"
          :loaded="false"
          ref="toolRefs"
          :data="getWeightedCommandData(tool)"
        />
      </div> -->
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { NamedColor } from 'quasar';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { COMPARE_TABLE_ROW, useCompareStore } from 'src/stores/compareStore';
import { computed, defineComponent, reactive, ref } from 'vue';
import BarChart from 'src/components/charts/BarChart.vue';
//import PieChart from 'src/components/charts/PieChart.vue';
import { TotalChartIds } from 'src/stores/chartIds';
import { ChartData } from 'chart.js';
import { getCssVar } from 'quasar';
import { Dark } from 'quasar';
import { Tools } from 'src/stores/types';

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
  components: { SectionSeparator, BarChart },
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

    let totalCompareChartData = ref(null);

    function updateTotalChart() {
      const chartData = JSON.parse(
        JSON.stringify(
          appStore.getChartData(TotalChartIds.TOTAL_YEARLY) as ChartData
        )
      );
      const everyTool = chartData.labels;
      const currentTool = Object.keys(tools).filter(
        (key) => tools[key] === true
      );
      if (everyTool) {
        const indecies = currentTool.map((x: any) => everyTool.indexOf(x));
        const commonIndexes = indecies.filter((index: number) => index !== -1);

        let slicedArray = everyTool.filter((_: any, index: number) =>
          commonIndexes.includes(index)
        );
        chartData.labels = slicedArray;

        for (let i = 0; i < chartData.datasets.length; i++) {
          slicedArray = chartData.datasets[i].data.filter(
            (_: any, index: number) => commonIndexes.includes(index)
          );
          chartData.datasets[i].data = slicedArray;
        }
      }
      totalCompareChartData.value = chartData;
    }

    return {
      currentTools: computed(() => appStore.getTools),
      currentYears: computed(() => appStore.getYears),
      totalCompareChartData: computed(() => totalCompareChartData),
      hasSelectedTools: computed(
        () => Object.keys(tools).filter((key) => tools[key] === true).length > 0
      ),
      selectedTools: computed(() =>
        Object.keys(tools).filter((key) => tools[key] === true)
      ),
      onClick: (tool: string) => {
        tools[tool] ? false : true;
        currentTableRows.value = compareStore.getCurrentTables(
          Object.keys(tools).filter((key) => tools[key] === true)
        );
        updateTotalChart();
      },
      selectedColor: (tool: string): NamedColor => {
        if (!!!tools[tool]) {
          return 'fifth';
        } else {
          return 'primary';
        }
      },
      getCurrentSeparatorTitle: (index: number) => {
        return appStore.getCompareSeparatorTitle(index);
      },
      // getWeightedCommandData(tool: string) {
      //   return compareStore.getActionChart(tool as unknown as Tools);
      // },
      updateTotalChart,
      tools,
      columns,
      getCssVar,
      Dark,
      currentTableRows,
    };
  },
});
</script>

<style scoped lang="scss">
.q-chip {
  width: 19%;
}

.selector {
  border: 0.15rem solid;
  border-radius: 1.35em;
  padding: 1.3vw;
  color: $secondary;
}

.cls {
  filter: blur(0.25px);
}
</style>

<template>
  <q-page class="column justify-start">
    <div class="row q-mb-lg">
      <div class="q-pa-lg col">
        <q-select
          outlined
          v-model="selectedTool"
          :options="selectableTools"
          dropdown-icon="sym_r_arrow_drop_down"
          label-color="primary"
          options-selected-class="text-primary text-weight-bold"
          label="Selected tools"
          :error="selectedTool"
          :no-error-icon="true"
          @update:model-value="handleToolSelectionChange"
          data-cy="tool-selector"
        />
      </div>
      <div class="q-pt-lg col-9">
        <SectionSeparator :title="getCurrentSeparatorTitle(0)" />
      </div>
    </div>

    <div class="row justify-evenly q-mb-lg chart-container">
      <q-card class="col-lg-5 col-sm-7 justify-center">
        <BarChart
          :data="yearlyChartData"
          stacked="true"
          :title="getCurrentLangTitlePerTool(0)"
        />
      </q-card>
    </div>
    <div class="row justify-center q-mb-lg">
      <q-card class="col-4 col-sm-5 q-ma-md q-pb-sm chart-container">
        <RadarChart
          :data="timeSpanChartData"
          :title="getCurrentLangTitlePerTool(1)"
        />
      </q-card>
      <q-card class="col-4 col-sm-5 q-ma-md q-pb-sm chart-container">
        <PieChart
          :data="actionChartData"
          :title="getCurrentLangTitlePerTool(2)"
        />
      </q-card>
    </div>
    <DropDownSeparator :title="getCurrentSeparatorTitle(1)">
      <template #contentSlot>
        <div class="row justify-center q-my-lg">
          <q-card class="col-9 justify-center">
            <MapChart :countryData="countryChartData" />
          </q-card></div
      ></template>
    </DropDownSeparator>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import DropDownSeparator from 'src/components/DropDownSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { usePerToolStore } from 'src/stores/perToolStore';
import BarChart from 'src/components/charts/BarChart.vue';
import PieChart from 'src/components/charts/PieChart.vue';
import { Tools } from 'src/stores/types';
import { request } from 'src/modules/api';
import MapChart from 'src/components/charts/map/MapChart.vue';
import { ChartData } from 'chart.js';
import RadarChart from 'src/components/charts/RadarChart.vue';

export default defineComponent({
  name: 'PerToolPage',
  components: {
    SectionSeparator,
    BarChart,
    PieChart,
    MapChart,
    RadarChart,
    DropDownSeparator,
  },
  setup() {
    const appStore = useAppStore();
    const perToolStore = usePerToolStore();

    let yearlyChartData = ref(
      perToolStore.getYearlyChart(
        perToolStore.getSelectedTools as unknown as Tools
      )
    );

    let actionChartData = ref(
      perToolStore.getActionChart(
        perToolStore.getSelectedTools as unknown as Tools
      )
    );

    let timeSpanChartData = ref(
      perToolStore.getTimeSpanChart(
        perToolStore.getSelectedTools as unknown as Tools
      )
    );
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let countryChartData = ref<Record<string, any> | null>(
      perToolStore.getCountryChart(
        perToolStore.getSelectedTools as unknown as Tools
      )
    );

    async function handleToolSelectionChange() {
      const currentTool = perToolStore.getSelectedTools as unknown as Tools;
      let data = perToolStore.getEveryChart(currentTool);

      if (!data) {
        try {
          const requestedYearly = await request('perToolYearly', {
            tool: currentTool as unknown as string,
          });
          const requestedActions = await request('perToolActions', {
            tool: currentTool as unknown as string,
          });
          const requestedTimeSpan = await request('perToolTimeSpan', {
            tool: currentTool as unknown as string,
          });
          const requestedCountries = await request('perToolCountries', {
            tool: currentTool as unknown as string,
          });

          if (requestedYearly && requestedActions && requestedCountries) {
            data = perToolStore.registerCharts(currentTool, [
              requestedYearly.data,
              requestedActions.data,
              requestedTimeSpan.data,
              requestedCountries.data,
            ]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      if (data) {
        yearlyChartData.value = JSON.parse(
          JSON.stringify(data[0] as ChartData)
        );
        actionChartData.value = data[1] as ChartData;
        timeSpanChartData.value = data[2] as ChartData;
        countryChartData.value = data[3].datasets;
      }
    }

    return {
      handleToolSelectionChange,
      yearlyChartData: computed(() => yearlyChartData),
      actionChartData: computed(() => actionChartData),
      timeSpanChartData: computed(() => timeSpanChartData),
      countryChartData: computed(() => {
        return countryChartData.value;
      }),
      selectableTools: computed(() => appStore.getTools),
      selectedTool: computed({
        get() {
          return perToolStore.getSelectedTools;
        },
        set(tool: string) {
          perToolStore.setSelectedTools(tool);
        },
      }),
      getCurrentLangTitlePerTool: (index: number) => {
        return appStore.getCurrentLangTitlePerTool(index);
      },
      getCurrentSeparatorTitle: (index: number) => {
        return appStore.getPerToolPageSeparatorTitle(index);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 365px;
  min-height: 300px;
  max-height: 495px;
}
</style>

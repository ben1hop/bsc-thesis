<template>
  <q-page class="column justify-start">
    <div class="row justify-center">
      <q-select
        outlined
        v-model="selectedTool"
        :options="selectableTools"
        dropdown-icon="sym_r_arrow_drop_down"
        label-color="primary"
        options-selected-class="text-primary text-weight-bold"
        label="Selected tools"
        style="width: 350px"
        @update:model-value="handleToolSelectionChange"
      />
    </div>

    <SectionSeparator title="Current years data" />
    <div class="row">
      <q-card>
        <BarChart ref="refBar" :data="yearlyChartData" stacked="true" />
      </q-card>
      <q-card>
        <PieChart />
      </q-card>
    </div>
    <div class="row">
      <q-card> <LineChart /></q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { usePerToolStore } from 'src/stores/perToolStore';
import BarChart from 'src/components/charts/BarChart.vue';
import LineChart from 'src/components/charts/LineChart.vue';
import PieChart from 'src/components/charts/PieChart.vue';
import { Tools } from 'src/stores/types';
import { request } from 'src/modules/api';

export default defineComponent({
  name: 'PerToolPage',
  components: { SectionSeparator, BarChart, PieChart, LineChart },
  setup() {
    const appStore = useAppStore();
    const perToolStore = usePerToolStore();

    let yearlyChartData = ref(
      perToolStore.getYearlyChart(
        perToolStore.getSelectedTools as unknown as Tools
      )
    );

    async function handleToolSelectionChange() {
      const currentTool = perToolStore.getSelectedTools as unknown as Tools;
      let data = perToolStore.getYearlyChart(currentTool);

      if (!data) {
        try {
          let param = {
            tool: currentTool as unknown as string,
          };
          const requestedData = await request('perToolYearly', {
            tool: currentTool as unknown as string,
          });

          if (requestedData) {
            data = perToolStore.registerYearlyChart(
              currentTool,
              requestedData.data
            );
            if (data) {
              perToolStore.registerYearlyChart(currentTool, data);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      yearlyChartData.value = data;
    }
    return {
      handleToolSelectionChange,
      yearlyChartData: computed(() => yearlyChartData),
      selectableTools: computed(() => appStore.getTools),
      selectedTool: computed({
        get() {
          return perToolStore.getSelectedTools;
        },
        set(tool: string) {
          perToolStore.setSelectedTools(tool);
        },
      }),
    };
  },
});
</script>

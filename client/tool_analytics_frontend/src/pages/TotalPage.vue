<template>
  <q-page class="column justify-evenly">
    <div class="row justify-around">
      <InfoCard class="col-1" title="Most popular tool:" />
      <InfoCard class="col-1" title="Bigest yearly traffic:" />
      <InfoCard class="col-1" title="Most frequent location:" />
      <InfoCard class="col-1" title="Most popular OS:" />
    </div>
    <SectionSeparator title="Tool usage based on time" />
    <q-card class="q-pb-lg self-center chart-container" style="width: 85%">
      <BarChart
        :data="getChartData(TotalChartIds.TOTAL_YEARLY)"
        :title="TotalChartIds.TOTAL_YEARLY"
      />
    </q-card>
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-8">
        <LineChart
          :data="getChartData(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
          :title="TotalChartIds.TOTAL_THROUGHOUT_YEAR"
        />
      </q-card>
      <q-card class="col-3">
        <DoughnutChart
          :data="getChartData(TotalChartIds.TOTAL_ACTION)"
          :title="TotalChartIds.TOTAL_ACTION"
      /></q-card>
    </div>
    <SectionSeparator title="Tool usage based on OS" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-7">
        <BarChart
          :data="getChartData(TotalChartIds.TOTAL_OS)"
          :title="TotalChartIds.TOTAL_OS"
        />
      </q-card>
      <q-card class="col-3">
        <PieChart
          :data="getChartData(TotalChartIds.WEIGHTED_OS)"
          :title="TotalChartIds.WEIGHTED_OS"
        />
      </q-card>
    </div>
    <SectionSeparator title="Tool usage based on location" />
    <q-card class="q-pt-lg chart-container">
      <MapChart
        :countryData="getChartData(TotalChartIds.TOTAL_REGION)?.datasets"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from 'src/components/charts/LineChart.vue';
import MapChart from 'src/components/charts/map/MapChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';
import PieChart from 'src/components/charts/PieChart.vue';
import InfoCard from 'src/components/InfoCard.vue';
import DoughnutChart from 'src/components/charts/DoughnutChart.vue';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { TotalChartIds } from 'src/stores/chartIds';

export default defineComponent({
  name: 'TotalPage',
  components: {
    LineChart,
    MapChart,
    BarChart,
    SectionSeparator,
    PieChart,
    InfoCard,
    DoughnutChart,
  },
  setup() {
    const appStore = useAppStore();
    return {
      TotalChartIds,
      getChartData(id: string) {
        return appStore.getChartData(id);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 325px;
}
</style>

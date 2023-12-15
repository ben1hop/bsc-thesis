<template>
  <q-page class="column justify-evenly">
    <SectionSeparator title="Current years data" />
    <div class="row justify-around text-center">
      <InfoCard class="col-1" title="Most used tool:" :value="currentTool" />
      <InfoCard
        class="col-1"
        title="Current yearly traffic:"
        :value="currentTraffic"
        text_label="1"
      />
      <InfoCard
        class="col-1"
        title="Highest region:"
        :value="currentLocation"
      />
      <InfoCard class="col-1" title="Current OS:" :value="currentOS" />
    </div>
    <SectionSeparator title="Tool usage based on time" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-8 q-pb-lg">
        <BarChart
          :data="getChartData(TotalChartIds.TOTAL_YEARLY)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_YEARLY)"
        />
      </q-card>
      <q-card class="col-3">
        <DoughnutChart
          :data="getChartData(TotalChartIds.TOTAL_ACTION)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_ACTION)"
      /></q-card>
    </div>

    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-5">
        <LineChart
          :data="getChartData(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
        />
      </q-card>
      <q-card class="col-5">
        <LineChart
          :data="getChartData(TotalChartIds.TOTAL_TIME_SPAN)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_TIME_SPAN)"
        />
      </q-card>
    </div>
    <SectionSeparator title="Tool usage based on OS" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-7">
        <BarChart
          :data="getChartData(TotalChartIds.TOTAL_OS)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_OS)"
        />
      </q-card>
      <q-card class="col-3">
        <PieChart
          :data="getChartData(TotalChartIds.WEIGHTED_OS)"
          :title="getCurrentTitle(TotalChartIds.WEIGHTED_OS)"
        />
      </q-card>
    </div>
    <SectionSeparator title="Tool usage based on location" />
    <div class="row justify-center">
      <q-card class="col-9 q-pt-lg">
        <MapChart
          :countryData="getChartData(TotalChartIds.TOTAL_REGION)?.datasets"
        />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import LineChart from 'src/components/charts/LineChart.vue';
import MapChart from 'src/components/charts/map/MapChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';
import PieChart from 'src/components/charts/PieChart.vue';
import InfoCard from 'src/components/InfoCard.vue';
import DoughnutChart from 'src/components/charts/DoughnutChart.vue';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { TotalChartIds } from 'src/stores/chartIds';
import { useInfoStore } from 'src/stores/infoStore';

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
    const infoStore = useInfoStore();
    return {
      TotalChartIds,
      currentTool: computed(() => infoStore.getCurrentTool),
      currentOS: computed(() => infoStore.getCurrentOs),
      currentLocation: computed(() => infoStore.getCurrentLocation),
      currentTraffic: computed(() => infoStore.getCurrentTraffic),
      getCurrentTitle: (index: number) => {
        return appStore.getCurrentLangTitle(index);
      },
      getChartData(id: number) {
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

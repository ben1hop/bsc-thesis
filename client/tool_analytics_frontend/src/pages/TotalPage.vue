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
      <BarChart />
    </q-card>
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-8"> <LineChart /></q-card>
      <q-card class="col-3"> <PieChart /></q-card>
    </div>
    <SectionSeparator title="Tool usage based on OS" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-7"> <BarChart /></q-card>
      <q-card class="col-3"> <DoughnutChart /> </q-card>
    </div>
    <SectionSeparator title="Tool usage based on location" />
    <q-card class="q-pt-lg chart-container">
      <MapChart :countryData="{ US: 4, CA: 7, GB: 8, IE: 14, ES: 21 }" />
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
    return {};
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 325px;
}
</style>

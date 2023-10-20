<template>
  <q-page class="column items-center justify-evenly">
    <q-card style="width: 90%"> <BarChart /></q-card>
    <div class="row justify-around" style="width: 100%">
      <q-card> <LineChart /></q-card>
      <q-card> <LineChart /></q-card>
    </div>
    <q-card>
      <MapChart
        :countryData="{ US: 4, CA: 7, GB: 8, IE: 14, ES: 21 }"
        highColor="#ff0000"
        lowColor="#aaaaaa"
        countryStrokeColor="#909090"
        defaultCountryFillColor="#dadada"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LineChart from 'src/components/charts/LineChart.vue';
import MapChart from 'src/components/charts/map/MapChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';

export default defineComponent({
  name: 'TotalPage',
  components: { LineChart, MapChart, BarChart },
  setup() {
    return {};
  },
});
</script>

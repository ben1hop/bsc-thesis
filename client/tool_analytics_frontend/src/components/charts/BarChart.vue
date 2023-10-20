<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5 text-text-primary-dark">
        Total yearly usage
      </div>
      <div>
        <q-icon name="sym_r_help"></q-icon>
      </div>
    </div>
    <div class="col-10"><Bar :data="data" :options="options" /></div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { getCssVar } from 'quasar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const data = {
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: getCssVar('secondary'),
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default {
  name: 'App',
  components: {
    Bar,
  },
  data() {
    return { data, options };
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>

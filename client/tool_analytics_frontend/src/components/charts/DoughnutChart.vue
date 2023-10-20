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
    <div class="col-10"><Doughnut :data="data" :options="options" /></div>
  </div>
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { getCssVar } from 'quasar';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: [
        getCssVar('primary'),
        getCssVar('secondary'),
        getCssVar('accent'),
        getCssVar('snow'),
      ],
      data: [40, 20, 80, 10],
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
    Doughnut,
  },
  data() {
    return { data, options };
  },
};
</script>

<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5 text-text-primary-dark">
        {{ title }}
      </div>
      <div>
        <q-icon name="sym_r_help"></q-icon>
      </div>
    </div>
    <div class="col-10"><Pie :data="data1" :options="options" /></div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Pie } from 'vue-chartjs';
import { getCssVar } from 'quasar';
import { PropType } from 'vue';
import getDataSetColor from 'src/css/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data1 = {
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
    Pie,
  },
  props: {
    data: {
      type: Object as PropType<ChartData>,
      default: null,
    },
    title: {
      type: String,
      default: 'Chart',
    },
  },
  data(props: any) {
    for (let i = 0; i < props.data.datasets.length; i++) {
      props.data.datasets[i] = {
        ...props.data.datasets[i],
        backgroundColor: getCssVar(getDataSetColor(i)),
      };
    }
    return { data1, options };
  },
};
</script>

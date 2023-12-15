<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5">
        {{ title }}
      </div>
      <div>
        <q-icon name="sym_r_help"></q-icon>
      </div>
    </div>
    <div class="col-10"><Doughnut :data="data" :options="chartOptions" /></div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { Dark, getCssVar, useQuasar } from 'quasar';
import { PropType, ref, watch } from 'vue';
import getDataSetColor from 'src/css/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default {
  name: 'App',
  components: {
    Doughnut,
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
    const chartOptions = ref<ChartOptions>({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: Dark.isActive ? '#fcfcfc' : '#333',
          },
        },
      },
    });
    /**
     * Since rounded charts are using datasets differently , we have to allocate the colors like this.
     * Check each datasets data array , generate an same length number array incremented by one , this will mimic the array indexing.
     * Then convert each of these "indecies" into a color code.
     */
    for (let i = 0; i < props.data.datasets.length; i++) {
      props.data.datasets[i] = {
        ...props.data.datasets[i],
        backgroundColor: Array.from(
          Array(props.data.datasets[i].data.length).keys()
        ).map((x: number) => getCssVar(getDataSetColor(x))),
      };
    }

    const $q = useQuasar();

    watch(
      () => $q.dark.isActive,
      () => {
        chartOptions.value = {
          ...chartOptions,
          plugins: {
            legend: {
              labels: {
                color: Dark.isActive ? '#fcfcfc' : '#333',
              },
            },
          },
        };
      }
    );

    return { chartOptions };
  },
};
</script>

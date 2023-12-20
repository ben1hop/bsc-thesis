<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5">
        {{ title }}
      </div>
      <div>
        <q-icon name="sym_r_help">
          <q-tooltip>
            <slot name="tooltipSlot"></slot>
          </q-tooltip>
        </q-icon>
      </div>
    </div>
    <div class="col-10"><Pie :data="chartData" :options="chartOptions" /></div>
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
import { Pie } from 'vue-chartjs';
import { Dark, getCssVar, useQuasar } from 'quasar';
import { PropType, ref, watch } from 'vue';
import getDataSetColor from 'src/css/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

/* eslint-disable  @typescript-eslint/no-explicit-any */
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
    let chartData = ref(props.data);
    const chartOptions = ref<ChartOptions>({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            color: Dark.isActive ? '#fcfcfc' : '#333',
          },
        },
        y: {
          ticks: {
            color: Dark.isActive ? '#fcfcfc' : '#333',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: Dark.isActive ? '#fcfcfc' : '#333',
          },
        },
      },
    });
    if (chartData.value) {
      /**
       * Since rounded charts are using datasets differently , we have to allocate the colors like this.
       * Check each datasets data array , generate an same length number array incremented by one , this will mimic the array indexing.
       * Then convert each of these "indecies" into a color code.
       */
      for (let i = 0; i < chartData.value.datasets.length; i++) {
        chartData.value.datasets[i] = {
          ...chartData.value.datasets[i],
          backgroundColor: Array.from(
            Array(chartData.value.datasets[i].data.length).keys()
          ).map((x: number) => getCssVar(getDataSetColor(x))),
        };
      }
    } else {
      chartData.value = {
        labels: ['-', '-', '-', '-'],
        datasets: [
          {
            backgroundColor: ['#fff', '#fff', '#fff', '#fff'],
            data: [0, 0, 0, 0],
          },
        ],
      };
    }
    watch(chartData, () => {
      for (let i = 0; i < chartData.value.datasets.length; i++) {
        chartData.value.datasets[i] = {
          ...chartData.value.datasets[i],
          backgroundColor: Array.from(
            Array(chartData.value.datasets[i].data.length).keys()
          ).map((x: number) => getCssVar(getDataSetColor(x))),
        };
      }
    });
    const $q = useQuasar();

    watch(
      () => $q.dark.isActive,
      () => {
        chartOptions.value = {
          ...chartOptions,
          scales: {
            x: {
              ...chartOptions.value.scales?.x,
              ticks: {
                color: Dark.isActive ? '#fcfcfc' : '#333',
              },
            },
            y: {
              ...chartOptions.value.scales?.y,
              ticks: {
                color: Dark.isActive ? '#fcfcfc' : '#333',
              },
            },
          },
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
    return { chartOptions, chartData };
  },
};
</script>

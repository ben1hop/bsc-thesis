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
    <div class="col-10">
      <Radar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Radar } from 'vue-chartjs';
import { PropType, ref, watch } from 'vue';
import { Dark, getCssVar, useQuasar } from 'quasar';
import getDataSetColor from 'src/css/utils';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default {
  name: 'RadarChart',
  components: {
    Radar,
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
  methods: {},
  data(props: any) {
    function hexToRgb(hex: string) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }

    function getBgColorInRgb(x: number) {
      const colorHex = getCssVar(getDataSetColor(x));
      if (colorHex) {
        const rgb = hexToRgb(colorHex);
        if (rgb !== null) {
          return 'rgba(' + rgb.r + ',' + rgb.b + ',' + rgb.b + ',0.6)';
        }
      }
    }

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

    let chartData = ref(props.data);
    if (chartData.value) {
      /**
       * Since rounded charts are using datasets differently , we have to allocate the colors like this.
       * Check each datasets data array , generate an same length number array incremented by one , this will mimic the array indexing.
       * Then convert each of these "indecies" into a color code.
       */
      for (let i = 0; i < chartData.value.datasets.length; i++) {
        chartData.value.datasets[i] = {
          ...chartData.value.datasets[i],
          backgroundColor: getBgColorInRgb(i),
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
          backgroundColor: getBgColorInRgb(i),
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

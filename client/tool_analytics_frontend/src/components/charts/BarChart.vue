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
    <div class="col-10"><Bar :data="chartData" :options="chartOptions" /></div>
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
  ChartOptions,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { PropType, ref, watch } from 'vue';
import { ChartData } from 'chart.js';
import getDataSetColor from 'src/css/utils';
import { Dark, getCssVar, useQuasar } from 'quasar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'App',
  components: {
    Bar,
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
    stacked: {
      type: Boolean,
      default: false,
    },
  },
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data(props: any) {
    let chartData = ref(props.data);
    if (chartData.value) {
      for (let i = 0; i < chartData.value.datasets.length; i++) {
        chartData.value.datasets[i] = {
          ...chartData.value.datasets[i],
          backgroundColor: getCssVar(getDataSetColor(i)),
        };
      }
    } else {
      chartData.value = {
        labels: ['-', '-', '-'],
        datasets: [
          {
            label: 'No Data',
            backgroundColor: '#fff',
            data: [0, 0, 0],
          },
        ],
      };
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

    if (props.stacked) {
      chartOptions.value = {
        ...chartOptions,
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: Dark.isActive ? '#fcfcfc' : '#333',
            },
          },
          y: {
            stacked: true,
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

    watch(chartData, () => {
      for (let i = 0; i < chartData.value.datasets.length; i++) {
        chartData.value.datasets[i] = {
          ...chartData.value.datasets[i],
          backgroundColor: getCssVar(getDataSetColor(i)),
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

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>

<style lang="scss" scoped></style>

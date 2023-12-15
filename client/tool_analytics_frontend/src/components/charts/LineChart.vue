<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5">
        {{ title }}
      </div>
      <div><q-icon name="sym_r_help"></q-icon></div>
    </div>
    <div class="col-10">
      <QLine :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line as QLine } from 'vue-chartjs';
import { PropType, ref, watch } from 'vue';
import getDataSetColor from 'src/css/utils';
import { Dark, getCssVar, useQuasar } from 'quasar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'LineChart',
  components: {
    QLine,
  },
  props: {
    data: {
      type: Object as PropType<ChartData> | null,
      default: null,
    },
    title: {
      type: String,
      default: 'Chart',
    },
  },
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data(props: any) {
    let chartData: ChartData;
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
          type: 'linear',
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
    if (props.data) {
      for (let i = 0; i < props.data.datasets.length; i++) {
        props.data.datasets[i] = {
          ...props.data.datasets[i],
          backgroundColor: getCssVar(getDataSetColor(i)),
          tension: 0.4,
        };
      }
      chartData = props.data;
    } else {
      chartData = {
        labels: ['January', 'February', 'March'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12],
          },
        ],
      };
    }

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
      chartOptions,
      chartData,
    };
  },
};
</script>

<template>
  <div class="container q-mx-md column justify-around" style="height: 100%">
    <div class="col-1 q-mt-sm row justify-between items-center">
      <div class="text-bold text-h5 text-text-primary-dark">
        {{ title }}
      </div>
      <div><q-icon name="sym_r_help"></q-icon></div>
    </div>
    <div class="col-10">
      <QLine :data="data" :options="options" />
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
  ChartDataset,
} from 'chart.js';
import { Line as QLine } from 'vue-chartjs';
import { PropType } from 'vue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  y: {
    type: 'linear',
  },
};

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
  data(props: any) {
    props.data.datasets = props.data?.datasets.map((x: ChartDataset) => ({
      ...x,
      tension: 0.4,
    }));

    return {
      options,
    };
  },
};
</script>

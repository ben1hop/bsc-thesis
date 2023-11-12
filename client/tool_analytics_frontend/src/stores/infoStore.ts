import { ChartData } from 'chart.js';
import { defineStore } from 'pinia';

export const useInfoStore = defineStore('infoStore', {
  state: () => ({
    mostPopularTool: { name: '', trend: 0 },
    biggestYearlyTraffic: { name: '', trend: 0 },
    mostFrequentLocation: { name: '', trend: 0 },
    mostPopularOs: { name: '', trend: 0 },
  }),
  getters: {
    getMostPopularTool(state) {
      return state.mostPopularTool;
    },
    getBiggestYearlyTraffic(state) {
      return state.biggestYearlyTraffic;
    },
    getMostFrequentLocation(state) {
      return state.mostFrequentLocation;
    },
    getMostPopularOs(state) {
      return state.mostPopularOs;
    },
  },
  actions: {
    calculateMostPopularTool(data: ChartData) {
      const tools_total = [];
      let tool_index = 0;
      if (data.labels) {
        for (let i = 0; i < data.labels.length; i++) {
          tools_total[i] = { tool: data.labels[i], total: 0 };
          for (let j = 0; j < data.datasets.length; j++) {
            tools_total[i].total += data.datasets[j].data[i] as number;
          }
        }
        this.mostPopularTool.name = tools_total.reduce(
          (max, current) => (current.total > max.total ? current : max),
          tools_total[0]
        ).tool as string;
        tool_index = data.labels.findIndex(
          (x: any) => x === this.mostPopularTool.name
        );
      }

      const last_dataset_index = data.datasets.length - 1;

      this.getMostPopularOs.trend =
        (data.datasets[last_dataset_index].data[tool_index] as number) -
          (data.datasets[last_dataset_index - 1].data[tool_index] as number) >
        0
          ? 1
          : -1;
    },
  },
});

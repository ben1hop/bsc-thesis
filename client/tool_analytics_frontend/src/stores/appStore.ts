import { defineStore } from 'pinia';
import { AppState, MapData } from './types';
import { ChartData } from 'chart.js';

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    registeredCharts: new Map(),
    mapChart: new Map(),
  }),
  actions: {
    registerChart(label: string, data: ChartData): ChartData | null {
      if (!data) {
        return null;
      }
      this.registeredCharts.set(label, data);
      return this.getChartData(label);
    },
    registerMap(label: string, dataSet: MapData) {
      if (!dataSet) {
        return null;
      }
      this.mapChart.set(label, dataSet);
      return this.getChartData(label);
    },
    deleteChart(label: string) {
      this.registeredCharts.delete(label);
    },
    getChartData(label: string): ChartData | null {
      const registeredCharts = this.registeredCharts.get(label);
      if (registeredCharts) {
        return {
          labels: registeredCharts.labels,
          datasets: registeredCharts.datasets,
        };
      }
      return null;
    },
    getMapData(label: string): MapData | null {
      const dataset = this.mapChart.get(label);
      return dataset ? dataset : null;
    },
  },
});

import { defineStore } from 'pinia';
import { AppState, MapData } from './types';
import { ChartData } from 'chart.js';

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    registeredCharts: new Map(),
    availableTools: [],
  }),
  getters: {
    getTools(state): string[] {
      return state.availableTools;
    },
  },
  actions: {
    registerChart(
      label: string,
      data: ChartData | MapData
    ): ChartData | MapData | null {
      if (!data) {
        return null;
      }
      this.registeredCharts.set(label, data);
      return this.getChartData(label);
    },
    deleteChart(label: string) {
      this.registeredCharts.delete(label);
    },
    getChartData(label: string): ChartData | MapData | null {
      const registeredCharts = this.registeredCharts.get(label);
      if (registeredCharts) {
        if ('labels' in registeredCharts) {
          return {
            labels: registeredCharts.labels,
            datasets: registeredCharts.datasets,
          };
        } else {
          return {
            datasets: registeredCharts.datasets,
          };
        }
      }
      return null;
    },
    setAvailableTools(tools: string[]) {
      this.availableTools = tools;
    },
  },
});

import { defineStore } from 'pinia';
import { PerToolStoreState, Tools } from './types';
import { ChartData } from 'chart.js';

export const usePerToolStore = defineStore('perToolStore', {
  state: (): PerToolStoreState => ({
    yearlyChartData: new Map(),
    selectedTool: '',
  }),
  getters: {
    getSelectedTools(state) {
      return state.selectedTool;
    },
  },
  actions: {
    registerYearlyChart(tool: Tools, data: ChartData): ChartData | null {
      this.yearlyChartData.set(tool, data);
      return this.getYearlyChart(tool);
    },
    getYearlyChart(tool: Tools): ChartData | null {
      const chartData = this.yearlyChartData.get(tool);
      return chartData ? chartData : null;
    },
    setSelectedTools(tool: string) {
      this.selectedTool = tool;
    },
  },
});

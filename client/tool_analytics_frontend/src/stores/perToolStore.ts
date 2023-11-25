import { defineStore } from 'pinia';
import { PerToolStoreState, Tools } from './types';
import { ChartData } from 'chart.js';

export const usePerToolStore = defineStore('perToolStore', {
  state: (): PerToolStoreState => ({
    toolChartDatas: new Map(),
    selectedTool: '',
  }),
  getters: {
    getSelectedTools(state) {
      return state.selectedTool;
    },
  },
  actions: {
    registerCharts(tool: Tools, data: ChartData[]): ChartData[] | null {
      this.toolChartDatas.set(tool, data);
      return this.getEveryChart(tool);
    },
    getEveryChart(tool: Tools): ChartData[] | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? chartData : null;
    },
    getYearlyChart(tool: Tools): ChartData | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? chartData[0] : null;
    },
    getActionChart(tool: Tools): ChartData | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? chartData[1] : null;
    },
    setSelectedTools(tool: string) {
      this.selectedTool = tool;
    },
  },
});

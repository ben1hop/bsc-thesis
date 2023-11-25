import { defineStore } from 'pinia';
import { MapData, PerToolStoreState, Tools } from './types';
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
    registerCharts(
      tool: Tools,
      data: ChartData[]
    ): (ChartData | MapData)[] | null {
      this.toolChartDatas.set(tool, data);
      return this.getEveryChart(tool);
    },
    getEveryChart(tool: Tools): (ChartData | MapData)[] | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? chartData : null;
    },
    getYearlyChart(tool: Tools): ChartData | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? (chartData[0] as ChartData) : null;
    },
    getActionChart(tool: Tools): ChartData | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? (chartData[1] as ChartData) : null;
    } /* eslint-disable  @typescript-eslint/no-explicit-any */,
    getCountryChart(tool: Tools): Record<string, any> | null {
      const chartData = this.toolChartDatas.get(tool);
      return chartData ? chartData[2].datasets : null;
    },
    setSelectedTools(tool: string) {
      this.selectedTool = tool;
    },
  },
});

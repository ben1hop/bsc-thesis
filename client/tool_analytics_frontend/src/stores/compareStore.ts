import { defineStore } from 'pinia';
// import { Tools } from './types';
// import { ChartData } from 'chart.js';

export interface COMPARE_TABLE_ROW {
  name: '';
  total: 0;
  first: '';
  growth: false;
}

export const useCompareStore = defineStore('compareStore', {
  state: () => ({
    tables: [] as COMPARE_TABLE_ROW[],
    // actionCharts: new Map(),
  }),
  getters: {
    getTables(state) {
      return state.tables;
    },
  },
  actions: {
    setTables(data: any) {
      this.tables = data;
    },
    getCurrentTables(names: string[]): COMPARE_TABLE_ROW[] {
      return this.tables.filter((x: any) => names.includes(x.name));
    },
    // getActionChart(tool: Tools): ChartData | null {
    //   return this.actionCharts.get(tool);
    // },
    // setActionChart(tool: Tools, data: ChartData) {
    //   this.actionCharts.set(tool, data);
    //   return this.getActionChart(tool);
    // },
  },
});

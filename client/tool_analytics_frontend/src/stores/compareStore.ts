import { defineStore } from 'pinia';

export interface COMPARE_TABLE_ROW {
  name: '';
  total: 0;
  first: '';
  growth: false;
}

export const useCompareStore = defineStore('compareStore', {
  state: () => ({
    tables: [] as COMPARE_TABLE_ROW[],
  }),
  getters: {
    getTables(state) {
      return state.tables;
    },
  },
  actions: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setTables(data: any) {
      this.tables = data;
    },
    getCurrentTables(names: string[]): COMPARE_TABLE_ROW[] {
      return this.tables.filter((x: any) => names.includes(x.name));
    },
  },
});

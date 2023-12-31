import { defineStore } from 'pinia';
import { AppState, Languages, MapData } from './types';
import { ChartData } from 'chart.js';
import {
  ChartNamesHun,
  ChartNamesEng,
  PerToolChartNamesHun,
  PerToolChartNamesEng,
  TotalPageSeparators,
  PerToolPageSeparators,
  ComparePageSeparators,
  TotalTooltipText,
} from './languageOptions';

export const useAppStore = defineStore('appStore', {
  state: (): AppState => ({
    registeredCharts: new Map(),
    availableTools: [],
    availableYears: [],
    currentLang: Languages.ENG,
  }),
  getters: {
    getTools(state): string[] {
      return state.availableTools;
    },
    getYears(state): number[] {
      return state.availableYears;
    },
    getCurrentLang(state): Languages {
      return state.currentLang;
    },
  },
  actions: {
    registerChart(
      index: number,
      data: ChartData | MapData
    ): ChartData | MapData | null {
      if (!data) {
        return null;
      }
      this.registeredCharts.set(index, data);
      return this.getChartData(index);
    },
    deleteChart(index: number) {
      this.registeredCharts.delete(index);
    },
    getChartData(index: number): ChartData | MapData | null {
      const registeredCharts = this.registeredCharts.get(index);
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
    setAvailableYears(years: string[]) {
      this.availableYears = years.map((x: string) => Number(x));
    },
    setCurrentLang(lang: Languages) {
      this.currentLang = lang;
    },
    getCurrentLangTitle(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return ChartNamesHun[index];
      }
      if (this.currentLang === ('English' as Languages)) {
        return ChartNamesEng[index];
      } else {
        return '';
      }
    },
    getCurrentLangTitlePerTool(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return PerToolChartNamesHun[index];
      }
      if (this.currentLang === ('English' as Languages)) {
        return PerToolChartNamesEng[index];
      } else {
        return '';
      }
    },
    getTotalPageSeparatorTitle(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return TotalPageSeparators[index].hun;
      }
      if (this.currentLang === ('English' as Languages)) {
        return TotalPageSeparators[index].eng;
      } else {
        return '';
      }
    },
    getPerToolPageSeparatorTitle(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return PerToolPageSeparators[index].hun;
      }
      if (this.currentLang === ('English' as Languages)) {
        return PerToolPageSeparators[index].eng;
      } else {
        return '';
      }
    },
    getCompareSeparatorTitle(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return ComparePageSeparators[index].hun;
      }
      if (this.currentLang === ('English' as Languages)) {
        return ComparePageSeparators[index].eng;
      } else {
        return '';
      }
    },
    getTotalPageToolTipText(index: number): string {
      if (this.currentLang === ('Hungarian' as Languages)) {
        return TotalTooltipText[index].hun;
      }
      if (this.currentLang === ('English' as Languages)) {
        return TotalTooltipText[index].eng;
      } else {
        return '';
      }
    },
  },
});

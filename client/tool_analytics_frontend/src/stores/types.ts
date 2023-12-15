import { ChartData } from 'chart.js';

export interface AppState {
  registeredCharts: Map<number, ChartData | MapData>;
  availableTools: string[];
  currentLang: Languages;
}

export interface PerToolStoreState {
  toolChartDatas: Map<Tools, (ChartData | MapData)[]>;
  selectedTool: string;
}

export class MapData {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(dataset: Record<string, any>) {
    this.datasets = dataset;
  }
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  datasets: Record<string, any>;
}

export interface InfoStoreEntry {
  name: string;
  value: number;
  trend: number;
}

export enum Tools {
  'Bitwolf',
  'Cookley',
  'Fixflex',
  'Job',
  'Konklux',
  'Lotstring',
  'Otcom',
  'Tres-Zap',
  'Zaam-Dox',
}

export enum Languages {
  ENG = 'English',
  HUN = 'Magyar',
}

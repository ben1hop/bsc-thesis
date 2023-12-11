import { ChartData } from 'chart.js';

export interface AppState {
  registeredCharts: Map<string, ChartData | MapData>;
  availableTools: string[];
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

import { ChartData } from 'chart.js';

export interface AppState {
  registeredCharts: Map<string, ChartData | MapData>;
  availableTools: string[];
}

export interface PerToolStoreState {
  toolChartDatas: Map<Tools, ChartData[]>;
  selectedTool: string;
}

export class MapData {
  constructor(dataset: Record<string, any>) {
    this.datasets = dataset;
  }
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

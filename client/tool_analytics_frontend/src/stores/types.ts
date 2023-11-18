import { ChartData } from 'chart.js';

export interface AppState {
  registeredCharts: Map<string, ChartData | MapData>;
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

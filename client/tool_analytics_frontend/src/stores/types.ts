import { ChartData } from "chart.js";

export interface AppState {
  registeredCharts: Map<string, ChartData>;
  mapChart: Map<string, MapData>;
}

export class MapData {
  constructor(dataset: Record<string, any>) {
    this.dataset = dataset;
  }
  dataset: Record<string, any>;
}

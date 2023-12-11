export class DataSet {
  constructor(data: number[], label?: string) {
    if (label) {
      this.label = label;
    }
    this.data = data;
  }
  label?: string;
  data: number[];
}

export class ChartData {
  constructor(labels: string[], datasets: DataSet[]) {
    this.datasets = datasets;
    this.labels = labels;
  }
  labels: string[];
  datasets: DataSet[];
}

export class BarData {
  constructor(chartId: string, chartData: ChartData) {
    this.chartId = chartId;
    this.chartData = chartData;
  }
  chartId: string;
  chartData: ChartData;
}

export class MapData {
  constructor(dataset: Record<string, any>) {
    this.datasets = dataset;
  }
  datasets: Record<string, any>;
}

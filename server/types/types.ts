export class DataSet {
  constructor(label: string, bgcolor: string[] | string, data: number[]) {
    this.label = label;
    this.backgroundColor = bgcolor;
    this.data = data;
  }
  label: string;
  backgroundColor: string[] | string;
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
    this.dataset = dataset;
  }
  dataset: Record<string, any>;
}

export enum TotalChartIds {
  TOTAL_YEARLY = 1,
  TOTAL_THROUGHOUT_YEAR = 2,
  TOTAL_TIME_SPAN = 3,
  TOTAL_OS = 4,
  WEIGHTED_OS = 5,
  TOTAL_ACTION = 6,
  TOTAL_REGION = 7,
}

export const ChartNamesHun = [
  'Teljes felhasználás éves bontásban',
  'Teljes felhasználás havi bontásban',
  'Teljes felhasználás napi bontásban',
  'Teljes felhasználás operációs rendszerek szerint',
  'Súlyozott fő operációs rendszer használat',
  'Teljes felhasználás parancsok szerint',
  'Lokációs térkép',
];

export const ChartNamesEng = [
  'Total tools yearly usage',
  'Total tool usage throughout a year',
  'Tool usage by day',
  'Total tool usage by OS',
  'Weighted usage by OS',
  'Total tool usage by action',
  'Total tool usage by countries',
];

export const PerToolChartNamesEng = [
  'Selected tools total usage',
  'Selected tools time span usage',
  'Weighted command usage',
];

export const PerToolChartNamesHun = [
  'Teljes felhasználása',
  'Napi bontása',
  'Súlyozott parancsok száma',
];

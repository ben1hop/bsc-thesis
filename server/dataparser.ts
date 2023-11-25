import { DataSet, MapData } from './types/types';
import { countryToAlpha2 } from 'country-to-iso';

/**
 * Processing the total pages 1st charts data.
 * @param resp
 * @param years
 * @returns
 */
export function loadTotalUsageByYear(table: any, years: number[]): DataSet[] {
  const datasets: DataSet[] = [];
  for (let i = 0; i < years.length; i++) {
    datasets.push(new DataSet([], String(years[i])));
    for (let j = 0; j < table.length; j++) {
      if (table[j].year == years[i]) {
        datasets[i].data.push(table[j].total);
      }
    }
  }
  return datasets;
}

/**
 * Processing the total pages 2nd charts data.
 * @param resp
 * @param months
 * @returns
 */
export function loadTotalThroughYearPerTool(
  table: any,
  years: number[]
): DataSet[] {
  const datasets: DataSet[] = [];
  // I suppose that the data is comming in ordered by tool name - so we can process it linear time
  let n = 0;
  for (let i = 0; i < table.length; i++) {
    datasets.push(
      new DataSet(
        Array.apply(null, Array(years.length)).map(function () {
          return 0;
        }) as number[],
        table[i].tool
      )
    );
    let j = i + 1;
    for (j; j < table.length && table[j].tool === table[i].tool; j++) {
      datasets[n].data[years.findIndex((x: number) => x === table[j].year)] +=
        table[j].total;
    }
    i = j;
    n++;
  }
  return datasets;
}

/**
 *
 * @param table
 * @param osTypes
 * @returns
 */
export function loadTotalUsageByOs(table: any, osTypes: string[]): DataSet[] {
  const dataset: DataSet = new DataSet(
    Array.apply(null, Array(osTypes.length)).map(() => 0) as number[],
    'Number of actions'
  );
  for (let i = 0; i < table.length; i++) {
    const index = osTypes.findIndex((x: string) => x === table[i].OS);
    if (index === -1) {
      continue;
    }
    dataset.data[index] = table[i].total;
  }
  return [dataset];
}

export function loadWeightedTotalUsageByOs(table: any): DataSet[] {
  const dataset: DataSet = new DataSet(
    [0, 0, 0],
    'Weighted total tool usage by OS'
  );
  for (let i = 0; i < table.length; i++) {
    const system = String(table[i].OS);
    if (system.startsWith('Windows')) {
      dataset.data[0] += table[i].total;
    } else if (system.startsWith('Mac')) {
      dataset.data[1] += table[i].total;
    } else if (system === 'Linux') {
      dataset.data[2] += table[i].total;
    }
  }
  return [dataset];
}

export function loadTotalUsageByAction(table: any) {
  const datasets: DataSet[] = [];
  datasets.push(new DataSet(table.map((x: any) => x.total)));
  return datasets;
}

export function loadTotalUsageByCountries(table: any): Record<string, number> {
  const rec_: Record<string, number> = {};
  for (let i = 0; i < table.length; i++) {
    rec_[String(countryToAlpha2(table[i].country))] = table[i].total;
  }
  return rec_;
}

export function loadTotalThroughYear(table: any, years: number[]): DataSet[] {
  const datasets: DataSet[] = [];
  // The data should be ordered by year , month
  for (let i = 0; i < years.length; i++) {
    const yearlyData = table
      .slice(i * 12, i * 12 + 12)
      .map((x: any) => x.total);
    datasets.push(new DataSet(yearlyData, String(years[i])));
  }

  return datasets;
}

export function loadTotalQuarterly(table: any, years: number[]): DataSet[] {
  const datasets: DataSet[] = [];
  // The data should be ordered by year , month
  for (let i = 0; i < years.length; i++) {
    const yearlyData = table
      .slice(i * 12, i * 12 + 12)
      .map((x: any) => x.total);
    datasets.push(new DataSet(yearlyData, String(years[i])));
  }

  return datasets;
}

export function realMonths() {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
}

export function loadPerToolYearlyByQuarter(table: any, years: number[]) {
  const quarters: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  const datasets: DataSet[] = quarters.map((quarter) => ({
    label: quarter,
    backgroundColor: '#f87979',
    data: years.map((year) => {
      const result = table.find(
        (row) => row.year === year && row.quarter === quarter
      );
      console.log(result);
      return result ? result.total : 0;
    }),
  }));

  return datasets;
}

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
    datasets.push(new DataSet(String(years[i]), '#55b3fc', []));
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
        table[i].tool,
        '#55b3fc',
        Array.apply(null, Array(years.length)).map(function () {
          return 0;
        }) as number[]
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
    'Number of actions',
    '#55b3fc',
    Array.apply(null, Array(osTypes.length)).map(() => 0) as number[]
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
    'Weighted total tool usage by OS',
    '#55b3fc',
    [0, 0, 0]
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

export function loadTotalUsageByCountries(table: any): MapData {
  const mapdata: MapData = new MapData({});
  const rec_: Record<string, any> = {};
  for (let i = 0; i < table.length; i++) {
    rec_[String(countryToAlpha2(table[i].country))] = table[i].total;
  }
  mapdata.dataset = rec_;
  return mapdata;
}

export function loadTotalThroughYear(table: any, years: number[]): DataSet[] {
  const datasets: DataSet[] = [];
  // I suppose that the data is comming in ordered by tool name - so we can process it linear time
  for (let i = 0; i < years.length; i++) {
    const yearlyData = table
      .slice(i * 12, i * 12 + 12)
      .map((x: any) => x.total);
    datasets.push(new DataSet(String(years[i]), '#55b3fc', yearlyData));
  }

  return datasets;
}

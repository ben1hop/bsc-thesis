import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';
import { request } from 'src/modules/api';
import { useAppStore } from 'src/stores/appStore';
import { TotalChartIds } from 'src/stores/chartIds';
import { MapData } from 'src/stores/types';

export default boot(async () => {
  try {
    await initTotalPageCharts();
  } catch (error) {
    Notify.create({
      message: 'Data initialization failed. ',
      type: 'negative',
    });
  }
});

async function initTotalPageCharts() {
  const appStore = useAppStore();

  let resp = await request('totalUsageByYear');
  if (resp) {
    appStore.registerChart(TotalChartIds.TOTAL_YEARLY, resp.data);
  }

  resp = await request('totalUsageThroughYear');
  if (resp) {
    appStore.registerChart(TotalChartIds.TOTAL_THROUGHOUT_YEAR, resp.data);
  }

  resp = await request('totalUsageByOS');
  if (resp) {
    appStore.registerChart(TotalChartIds.TOTAL_OS, resp.data);
  }

  resp = await request('totalUsageByCountries');
  if (resp) {
    appStore.registerChart(TotalChartIds.TOTAL_REGION, resp.data as MapData);
  }

  resp = await request('totalUsageByAction');
  if (resp) {
    appStore.registerChart(TotalChartIds.TOTAL_ACTION, resp.data);
  }

  //   appStore.registerChart(
  //     'Total tool usage throughout a year',
  //     new ChartData(
  //       appStore.getMonths,
  //       loadTotalThroughYear(
  //         totalStore.getTable('totalUsageThroughYear'),
  //         appStore.getYears
  //       )
  //     )
  //   );

  //   appStore.registerChart(
  //     'Total tool usage by OS',
  //     new ChartData(
  //       appStore.getOsTypes,
  //       loadTotalUsageByOs(
  //         totalStore.getTable('totalUsageByOS'),
  //         appStore.getOsTypes
  //       )
  //     )
  //   );

  //   appStore.registerChart(
  //     'Weighted total tool usage by OS',
  //     new ChartData(
  //       ['Windows', 'Mac', 'Linux'],
  //       loadWeightedTotalUsageByOs(totalStore.getTable('totalUsageByOS'))
  //     )
  //   );

  //   appStore.registerMap(
  //     'Total usage by countries',
  //     loadTotalUsageByCountries(totalStore.getTable('totalUsageByCountries'))
  //   );

  return;
}

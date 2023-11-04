import { Notify } from 'quasar';
import { boot } from 'quasar/wrappers';
import { request } from 'src/modules/api';
import { useAppStore } from 'src/stores/appStore';

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

  const resp = await request('totalUsageByYear');
  if (resp) {
    appStore.registerChart('Total tools yearly usage', resp.data);
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

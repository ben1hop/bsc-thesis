<template>
  <q-page class="column justify-evenly">
    <q-card class="q-pa-lg" data-cy="landing-page-title">
      <div class="row justify-evenly">
        <div v-if="isLangEng" class="col-7 column">
          <p
            :class="
              'text-h5 text-weight-bolder title-class shadow-1 ' +
              getTitleBgColor()
            "
          >
            Total usage page
            <br />
          </p>
          <p class="q-pl-md text-subtitle1">
            In this page we can find the usage related informations about every
            tool. Most of the data is showing the aggregated events in some form
            and includes both the whole time span and every available tool.
            <br />
          </p>
          <p class="q-pl-md text-subtitle1">
            Additional information can be found in each charts tooltip.
            <br />
            There is option for getting data about a single tool on the per tool
            page , also we can compare selected ones on the compare tool page
          </p>
        </div>
        <div v-else class="col-7 column">
          <p
            :class="
              'text-h5 text-weight-bolder title-class shadow-1 ' +
              getTitleBgColor()
            "
          >
            Total usage oldal
            <br />
          </p>
          <p class="q-pl-md text-subtitle1">
            Ezen az oldalon találjuk az összes elérhető Tool használatával
            kapcsolatos információkat. A kimutatások aggregált esemény adatokból
            készültek.
            <br />
          </p>
          <p class="q-pl-md text-subtitle1">
            További információk találhatóak a diagrammok melletti
            segédablakokban.
            <br />
            Ezen felül lehetőségünk van egy kiválasztott Tool-ról kimutatásokat
            megtekinteni és több Tool-t összehasonlítani.
          </p>
        </div>
        <q-card class="col-4">
          <q-item :class="getTitleBgColor() + ' q-px-lg text-h6'">
            <q-item-section underline v-if="isLangEng">
              <q-item-label>Additional informations</q-item-label>
              <q-item-label caption>
                General information about the processed data</q-item-label
              >
            </q-item-section>
            <q-item-section underline v-else>
              <q-item-label>További információk</q-item-label>
              <q-item-label caption>
                Álltalános információk a feldolgozott adatokról</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section>
              <q-item-label v-if="isLangEng">Available tools</q-item-label>
              <q-iitem-label v-else>Elérhető eszközök</q-iitem-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-dropdown no-caps dropdown-icon="sym_r_expand_more">
                <q-item
                  class="text-italic"
                  v-ripple
                  v-for="item in availableTools"
                  v-bind:key="item"
                >
                  <q-item-section> {{ item }} </q-item-section>
                </q-item></q-btn-dropdown
              >
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="isLangEng">Processed time span</q-item-label>
              <q-item-label v-else>Feldolgozott időszak</q-item-label>
            </q-item-section>
            <q-item-section side class="text-bold"
              >{{ availableToolsTime[0] }} -
              {{
                availableToolsTime[availableToolsTime.length - 1]
              }}</q-item-section
            >
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="isLangEng">Number of events</q-item-label>
              <q-item-label v-else>Események száma</q-item-label>
            </q-item-section>
            <q-item-section side class="text-bold">{{
              totalEvents
            }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="isLangEng">First event</q-item-label>
              <q-item-label v-else>Első esemény</q-item-label>
            </q-item-section>
            <q-item-section side class="text-bold">
              {{ firstEvent }}</q-item-section
            >
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="isLangEng">Last sync</q-item-label>
              <q-item-label v-else>Utolsó szinkronizálás</q-item-label>
            </q-item-section>
            <q-item-section side class="text-bold">
              {{ lastSync }}</q-item-section
            >
          </q-item>
        </q-card>
      </div>
    </q-card>

    <div class="row q-my-lg"></div>

    <DropDownSeparator
      class="q-my-lg"
      :title="getCurrentSeparatorTitle(0)"
      data-cy="dropdown-test"
    >
      <template #contentSlot>
        <div class="row justify-around text-center">
          <InfoCard
            data-cy="test-info-card-1"
            class="col-1"
            title="Most used tool:"
            :value="currentTool"
          />
          <InfoCard
            class="col-1"
            title="Current yearly traffic:"
            :value="currentTraffic"
            text_label="1"
          />
          <InfoCard
            class="col-1"
            title="Highest region:"
            :value="currentLocation"
          />
          <InfoCard class="col-1" title="Current OS:" :value="currentOS" />
        </div>
      </template>
    </DropDownSeparator>
    <div class="row q-my-lg"></div>

    <q-card class="q-pa-lg q-my-lg">
      <SectionSeparator :title="getCurrentSeparatorTitle(1)" />
      <div class="row justify-evenly q-py-lg">
        <q-card class="col-10 chart-container">
          <BarChart
            :data="getChartData(TotalChartIds.TOTAL_YEARLY)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_YEARLY)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_YEARLY) }}<br />
              <br />
              <p>SQL:</p>
              select result as tool , year(actionTime) as year , count(*) as
              total
              <br />
              from EventLog group by result, year(actionTime) order by tool,
              <br />
              year;
            </template>
          </BarChart>
        </q-card>
      </div>

      <div class="row justify-evenly q-py-lg">
        <q-card
          class="column justify-center col-xs-1 col-md-1 col-lg-2 q-gutter-sm"
          style="height: 100px"
        >
          <q-radio
            style="width: 45%"
            v-model="monthMode"
            val="month"
            :label="isLangEng ? 'Months' : 'Hónapok'"
            data-cy="radio-1"
          />
          <q-radio
            style="width: 45%"
            v-model="monthMode"
            val="day"
            :label="isLangEng ? 'Days' : 'Napok'"
            data-cy="radio-2"
          />
        </q-card>

        <q-card v-if="monthMode === 'month'" class="col-8 chart-container">
          <LineChart
            :data="getChartData(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
            data-cy="changeable-time-chart"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_THROUGHOUT_YEAR) }}<br />
              <br />
              <p>SQL:</p>
              select year , month, (select count(*) from EventLog z where
              year(z.actionTime) = x.year and month(z.actionTime) = y.month ) as
              total
              <br />
              from Years x , Months y
              <br />
              group by year , month ,total
              <br />
              order by year, month;
            </template>
          </LineChart>
        </q-card>
        <q-card v-else class="col-8 chart-container">
          <LineChart
            :data="getChartData(TotalChartIds.TOTAL_TIME_SPAN)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_TIME_SPAN)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_TIME_SPAN) }}<br />
              <br />
              <p>SQL:</p>
              SELECT hour(actionTime) as hour, count(id) as total FROM
              `bsc-dev-db`.EventLog group by hour(actionTime) order by hour;
            </template>
          </LineChart>
        </q-card>
      </div>
    </q-card>

    <q-card class="q-pa-lg q-my-lg">
      <SectionSeparator :title="getCurrentSeparatorTitle(2)" />
      <div class="row justify-evenly q-py-lg">
        <q-card class="col-7 chart-container">
          <BarChart
            :data="getChartData(TotalChartIds.TOTAL_SOFTWARE)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_SOFTWARE)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_SOFTWARE) }}<br />
              <br />
              <p>SQL:</p>
              SELECT action, count(id) as total FROM `bsc-dev-db`.EventLog group
              by action;
            </template>
          </BarChart>
        </q-card>
        <q-card class="col-3 chart-container">
          <DoughnutChart
            :data="getChartData(TotalChartIds.TOTAL_ACTION)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_ACTION)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_ACTION) }}<br />
              <br />
              <p>SQL:</p>
              SELECT action, count(id) as total FROM `bsc-dev-db`.EventLog group
              by action;
            </template>
          </DoughnutChart>
        </q-card>
      </div>
      <div class="row justify-evenly q-py-lg">
        <q-card class="col-6 chart-container">
          <BarChart
            :data="getChartData(TotalChartIds.TOTAL_OS)"
            :title="getCurrentTitle(TotalChartIds.TOTAL_OS)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.TOTAL_OS) }}<br />
              <br />
              <p>SQL:</p>
              select y.name as name, y.version , count(x.id) as total <br />
              from EventLog as x , SoftwareWithSoftwareIds as y <br />
              where y.SoftwareId = x.idStudioSoftwareRef<br />
              group by y.name, y.version <br />
              order by name, version;
            </template>
          </BarChart>
        </q-card>
        <q-card class="col-4 chart-container">
          <PieChart
            :data="getChartData(TotalChartIds.WEIGHTED_OS)"
            :title="getCurrentTitle(TotalChartIds.WEIGHTED_OS)"
          >
            <template #tooltipSlot>
              {{ getTooltipText(TotalChartIds.WEIGHTED_OS) }}<br />
              <br />
              <p>SQL:</p>
              select y.computerOS , count(x.id) as total from EventLog as x ,
              StudiosWithSoftwareIds as y <br />
              where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS;
            </template>
          </PieChart>
        </q-card>
      </div>
    </q-card>
    <DropDownSeparator :title="getCurrentSeparatorTitle(3)">
      <template #contentSlot>
        <div class="row justify-center">
          <q-card class="col-9 q-pt-lg">
            <MapChart
              :countryData="getChartData(TotalChartIds.TOTAL_REGION)?.datasets"
            />
          </q-card>
        </div>
      </template>
    </DropDownSeparator>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import LineChart from 'src/components/charts/LineChart.vue';
import MapChart from 'src/components/charts/map/MapChart.vue';
import BarChart from 'src/components/charts/BarChart.vue';
import PieChart from 'src/components/charts/PieChart.vue';
import InfoCard from 'src/components/InfoCard.vue';
import DoughnutChart from 'src/components/charts/DoughnutChart.vue';
import SectionSeparator from 'src/components/SectionSeparator.vue';
import DropDownSeparator from 'src/components/DropDownSeparator.vue';
import { useAppStore } from 'src/stores/appStore';
import { TotalChartIds } from 'src/stores/chartIds';
import { useInfoStore } from 'src/stores/infoStore';
import { Dark, date } from 'quasar';

export default defineComponent({
  name: 'TotalPage',
  components: {
    LineChart,
    MapChart,
    BarChart,
    SectionSeparator,
    PieChart,
    InfoCard,
    DoughnutChart,
    DropDownSeparator,
  },
  setup() {
    const appStore = useAppStore();
    const infoStore = useInfoStore();

    const lastSync = ref({});
    const monthMode = ref('month');

    onMounted(() => {
      lastSync.value = date.formatDate(Date.now(), 'YYYY-MM-DD - HH:mm:ss');
    });
    return {
      TotalChartIds,
      currentTool: computed(() => infoStore.getCurrentTool),
      currentOS: computed(() => infoStore.getCurrentOs),
      currentLocation: computed(() => infoStore.getCurrentLocation),
      currentTraffic: computed(() => infoStore.getCurrentTraffic),
      availableTools: computed(() => appStore.availableTools),
      availableToolsTime: computed(() => appStore.availableYears),
      firstEvent: computed(() => infoStore.getFirstEvent),
      totalEvents: computed(() => infoStore.getTotalEvents),
      isLangEng: computed(() => appStore.getCurrentLang === 'English'),
      lastSync,
      monthMode,
      getCurrentTitle: (index: number) => {
        return appStore.getCurrentLangTitle(index);
      },
      getCurrentSeparatorTitle: (index: number) => {
        return appStore.getTotalPageSeparatorTitle(index);
      },
      getChartData(id: number) {
        return appStore.getChartData(id);
      },
      getTooltipText(id: number) {
        return appStore.getTotalPageToolTipText(id);
      },
      getTitleBgColor() {
        return Dark.isActive ? 'bg-secondary' : 'bg-snow';
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 365px;
  min-height: 300px;
  max-height: 495px;
}

.title-class {
  border: solid;
  border-top: 0px;
  border-right: 0px;
  border-radius: 17.5px;
  padding: 15px;
  border-color: $accent;
}
</style>

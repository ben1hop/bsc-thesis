<template>
  <q-page class="column justify-evenly">
    <q-card class="q-pa-lg">
      <div class="row justify-evenly">
        <div class="col-7 column">
          <p class="text-h5 text-weight-bolder title-class shadow-1 bg-snow">
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

        <q-list
          dense
          bordered
          padding
          class="rounded-borders text-h6 col-2 shadow-1"
        >
          <q-item>
            <q-item-section underline>
              <q-item-label>Tools</q-item-label>
              <q-item-label caption>
                Currently available tools which usage we are
                tracking.</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator spaced />
          <q-item
            class="text-italic"
            v-ripple
            v-for="item in availableTools"
            v-bind:key="item"
          >
            <q-item-section> {{ item }} </q-item-section>
          </q-item>
        </q-list>

        <q-list
          dense
          bordered
          padding
          class="rounded-borders text-h6 col-2 shadow-1"
        >
          <q-item>
            <q-item-section underline>
              <q-item-label>TimeSpan</q-item-label>
              <q-item-label caption>
                The timespan in which we collected data.</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-separator spaced />
          <q-item
            class="text-italic"
            v-ripple
            v-for="item in availableToolsTime"
            v-bind:key="item"
          >
            <q-item-section> {{ item }} </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>

    <div class="row q-my-lg"></div>

    <DropDownSeparator class="q-my-lg" :title="getCurrentSeparatorTitle(0)">
      <template #contentSlot>
        <div class="row justify-around text-center">
          <InfoCard
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
    <SectionSeparator :title="getCurrentSeparatorTitle(1)" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-8 q-pb-lg">
        <BarChart
          :data="getChartData(TotalChartIds.TOTAL_YEARLY)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_YEARLY)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(0) }}<br />
            <br />
            <p>SQL:</p>
            select result as tool , year(actionTime) as year , count(*) as total
            <br />
            from EventLog group by result, year(actionTime) order by tool,
            <br />
            year;
          </template>
        </BarChart>
      </q-card>
      <q-card class="col-3">
        <DoughnutChart
          :data="getChartData(TotalChartIds.TOTAL_ACTION)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_ACTION)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(1) }}<br />
            <br />
            <p>SQL:</p>
            SELECT action, count(id) as total FROM `bsc-dev-db`.EventLog group
            by action;
          </template>
        </DoughnutChart>
      </q-card>
    </div>

    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-5">
        <LineChart
          :data="getChartData(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_THROUGHOUT_YEAR)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(2) }}<br />
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
      <q-card class="col-5">
        <LineChart
          :data="getChartData(TotalChartIds.TOTAL_TIME_SPAN)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_TIME_SPAN)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(3) }}<br />
            <br />
            <p>SQL:</p>
            SELECT hour(actionTime) as hour, count(id) as total FROM
            `bsc-dev-db`.EventLog group by hour(actionTime) order by hour;
          </template>
        </LineChart>
      </q-card>
    </div>
    <SectionSeparator :title="getCurrentSeparatorTitle(2)" />
    <div class="row justify-evenly q-py-lg chart-container">
      <q-card class="col-6">
        <BarChart
          :data="getChartData(TotalChartIds.TOTAL_OS)"
          :title="getCurrentTitle(TotalChartIds.TOTAL_OS)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(4) }}<br />
            <br />
            <p>SQL:</p>
            select y.computerOS , count(x.id) as total from EventLog as x ,
            StudiosWithSoftwareIds as y <br />
            where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS;
          </template>
        </BarChart>
      </q-card>
      <q-card class="col-4">
        <PieChart
          :data="getChartData(TotalChartIds.WEIGHTED_OS)"
          :title="getCurrentTitle(TotalChartIds.WEIGHTED_OS)"
        >
          <template #tooltipSlot>
            {{ getTooltipText(5) }}<br />
            <br />
            <p>SQL:</p>
            select y.computerOS , count(x.id) as total from EventLog as x ,
            StudiosWithSoftwareIds as y <br />
            where y.SoftwareId = x.idStudioSoftwareRef group by y.computerOS;
          </template></PieChart
        >
      </q-card>
    </div>
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
import { computed, defineComponent } from 'vue';
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
    return {
      TotalChartIds,
      currentTool: computed(() => infoStore.getCurrentTool),
      currentOS: computed(() => infoStore.getCurrentOs),
      currentLocation: computed(() => infoStore.getCurrentLocation),
      currentTraffic: computed(() => infoStore.getCurrentTraffic),
      availableTools: computed(() => appStore.availableTools),
      availableToolsTime: computed(() => appStore.availableYears),
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
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  height: 325px;
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

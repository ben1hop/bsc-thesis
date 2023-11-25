<template>
  <div class="vue-world-map">
    <Map_
      @hoverCountry="onHoverCountry"
      @hoverLeaveCountry="onHoverLeaveCountry"
    />

    <div
      v-if="legend.name"
      class="vue-map-legend"
      :style="'left:' + position.left + 'px; top: ' + position.top + 'px'"
    >
      <div class="vue-map-legend-header">
        <span>{{ legend.name }}</span>
      </div>
      <div class="vue-map-legend-content">
        <span>{{ chartData[legend.code] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import chroma from 'chroma-js';
import { defineComponent, ref, onMounted, watch } from 'vue';
import { getCssVar } from 'quasar';
import Map_ from 'src/components/charts/map/MapChartMap.vue';

import {
  getDynamicMapCss,
  getBaseCss,
  getCombinedCssString,
} from './dynamic-map-css';

let legend = {
  data: null,
  code: null,
  name: null,
};

let position = {
  left: 0,
  top: 0,
};

export default defineComponent({
  name: 'MapChart',
  components: { Map_ },
  props: {
    lowColor: {
      type: String,
      default: getCssVar('primary'),
    },
    highColor: {
      type: String,
      default: getCssVar('accent'),
    },
    countryData: {
      type: Object,
      required: true,
    },
    defaultCountryFillColor: {
      type: String,
      default: '#dadada',
    },
    countryStrokeColor: {
      type: String,
      default: '#909090',
    },
  },
  setup(props, { emit }) {
    const chartData = ref(props.countryData);
    if (!chartData.value) {
      chartData.value = {};
    }

    const legend = ref({
      data: null,
      code: null,
      name: null,
    });

    const position = ref({
      left: 0,
      top: 0,
    });

    const node = document.createElement('style');
    const chromaScale = chroma.scale([props.lowColor, props.highColor]);

    watch(
      () => props.countryData,
      (newCountryData) => {
        chartData.value = newCountryData;
        renderMapCSS(); // Call the rendering function whenever the data changes
      }
    );

    const renderMapCSS = () => {
      const baseCss = getBaseCss(props);
      const dynamicMapCss = getDynamicMapCss(chartData.value, chromaScale);
      node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    };

    onMounted(() => {
      document.body.appendChild(node);
      renderMapCSS();
    });

    const onHoverCountry = (country: any) => {
      legend.value = country;
      position.value = country.position;
      emit('hoverCountry', country);
    };

    const onHoverLeaveCountry = (country: any) => {
      legend.value = {
        data: null,
        code: null,
        name: null,
      };
      emit('hoverLeaveCountry', country);
    };

    return {
      chartData,
      legend,
      position,
      onHoverCountry,
      onHoverLeaveCountry,
    };
  },
});
</script>

<style scoped>
.vue-world-map,
#map-svg {
  height: 100%;
}

.vue-world-map {
  position: relative;
}

.vue-map-legend {
  width: 185px;
  background: #03312e;
  border: 1px solid;
  border-color: #acacad;
  position: absolute;
}

.vue-map-legend-header {
  padding: 10px 15px;
}

.vue-map-legend-content {
  padding: 10px 15px;
  background: #dadbda8f;
  border-top: 1px solid #acacad;
}
</style>

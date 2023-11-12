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
        <span>{{ countryData[legend.code] || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import chroma from 'chroma-js';
import Map_ from './MapChartMap.vue';
import { defineComponent } from 'vue';
import { getCssVar } from 'quasar';

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
  watch: {
    countryData() {
      this.renderMapCSS();
    },
  },
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
  data() {
    return {
      legend: legend,
      position: position,
      node: document.createElement('style'),
      chromaScale: chroma.scale([this.$props.lowColor, this.$props.highColor]),
    };
  },
  methods: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    onHoverCountry(country: any) {
      this.legend = country;
      this.position = country.position;
      this.$emit('hoverCountry', country);
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    onHoverLeaveCountry(country: any) {
      this.legend = {
        data: null,
        code: null,
        name: null,
      };
      this.$emit('hoverLeaveCountry', country);
    },
    renderMapCSS() {
      const baseCss = getBaseCss(this.$props);
      const dynamicMapCss = getDynamicMapCss(
        this.$props.countryData,
        this.chromaScale
      );
      this.$data.node.innerHTML = getCombinedCssString(baseCss, dynamicMapCss);
    },
  },
  mounted() {
    document.body.appendChild(this.$data.node);
    this.renderMapCSS();
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

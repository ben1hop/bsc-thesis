<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-weight-bold text-h6 text-no-wrap">
        {{ Title }}
      </div>
    </q-card-section>
    <q-card-section class="row justify-center">
      <div class="text-primary text-weight-bold text-h6">
        {{ text_label === 0 ? value.name : value.value }}
      </div>
      <div>
        <q-icon
          v-if="value.trend === -1"
          name="sym_r_trending_down"
          class="col"
          size="md"
          color="negative"
        />
        <q-icon
          v-if="value.trend === 1"
          name="sym_r_trending_up"
          class="col"
          size="md"
          color="positive"
        />
        <q-icon
          v-if="value.trend === 0"
          name="sym_r_trending_flat"
          class="col"
          size="md"
          color="warning"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
export enum TextLabel {
  'name' = 0,
  'value' = 1,
}

import { PropType, defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'InfoCard',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Default',
    },
    text_label: {
      type: Number as PropType<TextLabel>,
      default: 0,
    },
    value: {
      type: Object,
      default: () => {
        return { name: 'N/A', value: 0, trend: 0 };
      },
    },
  },
  setup(props) {
    const Title = ref(props.title);
    return {
      Title,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-card {
  width: 17%;
  height: 100%;
}
</style>

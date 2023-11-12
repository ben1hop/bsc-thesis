<template>
  <q-card class="q-ma-lg">
    <q-card-section>
      <div class="text-accent text-weight-bold text-h6 text-no-wrap">
        {{ Title }}
      </div>
    </q-card-section>
    <q-card-section class="row justify-center">
      <div class="text-primary text-weight-bold text-h6">{{ value.name }}</div>
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
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'InfoCard',
  components: {},
  props: {
    title: {
      type: String,
      default: 'Default',
    },
    value: {
      type: Object,
      default: () => {
        return { name: 'N/A', trend: 0 };
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

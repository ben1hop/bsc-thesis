<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-text-primary-light">
      <q-toolbar>
        <q-toolbar-title
          class="text-center button hvr-grow"
          @click="toggleTopDrawer"
        >
          Quasar App
          <q-icon v-if="!topDrawer" name="sym_r_south" />
          <q-icon v-else name="sym_r_north" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          v-if="topDrawer"
          class="row text-text-primary justify-center top-drawer"
          style="width: 100%; background-color: $snow !important"
        >
          <q-tabs
            no-caps
            active-color="primary"
            indicator-color="transparent"
            class="text-grey-8"
            align="justify"
            v-model="routerRef"
          >
            <q-tab name="total" label="Total page" to="Total" />
            <q-tab name="pertool" label="Per tool" to="PerTool" />
            <q-tab name="utils" label="Utils" to="Utils" />
          </q-tabs>
        </div>
      </transition>
      <!-- <div class="row justify-end">Quasar v{{ $q.version }}</div> -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const topDrawer = ref(false);
    const routerRef = ref('images');

    return {
      topDrawer,
      routerRef,
      toggleTopDrawer() {
        topDrawer.value = !topDrawer.value;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.q-tab {
  margin-right: 2%; /* Add margin to create space between tabs */
  margin-left: 2%; /* Add margin to create space between tabs */
  margin-top: 2%;
  background-color: $secondary !important;
  color: $text-primary-light;
  width: 10px !important;
  border-radius: 0.5em !important;
}

.top-drawer {
  position: absolute;
  z-index: 1;
}

.q-tabs {
  border-radius: 0.55em !important;
  width: 33%;
}
</style>

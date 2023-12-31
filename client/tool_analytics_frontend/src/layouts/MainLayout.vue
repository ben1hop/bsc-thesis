<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="text-text-primary-light">
      <q-toolbar>
        <q-toolbar-title
          class="text-center button hvr-grow"
          @click="toggleTopDrawer"
          data-cy="top-drawer"
        >
          Wireless Tools Analytics
          <q-icon v-if="!topDrawer" name="sym_r_arrow_drop_down" />
          <q-icon v-else name="sym_r_arrow_drop_up" />
        </q-toolbar-title>
        <q-btn-dropdown
          flat
          dropdown-icon="sym_r_settings"
          class="text-text-primary"
          data-cy="options-dropdown"
        >
          <q-list style="min-width: 275px">
            <q-item>
              <q-item-section>
                <q-item-label>Dark mode</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-toggle v-model="dark" data-cy="dark-mode-selector" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Language</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-select
                  v-model="language"
                  :options="['Hungarian', 'English']"
                  dropdown-icon="sym_r_arrow_drop_down"
                  borderless
                  data-cy="language-selector"
                />
              </q-item-section>
            </q-item> </q-list
        ></q-btn-dropdown>
      </q-toolbar>
      <transition
        appear
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <div
          v-if="topDrawer"
          class="row justify-center top-drawer"
          style="width: 100%; background-color: $snow !important"
        >
          <q-tabs
            no-caps
            active-color="orange"
            indicator-color="transparent"
            v-model="routerRef"
            v-if="isDarkTheme"
          >
            <q-tab
              class="q-tab--dark"
              name="total"
              label="Total page"
              data-cy="nav-total"
              @click="navigate('total')"
            />
            <q-tab
              name="pertool"
              label="Per tool"
              class="q-tab--dark"
              data-cy="nav-per-tool"
              @click="navigate('perTool')"
            />
            <q-tab
              name="compare"
              class="q-tab--dark"
              label="Compare"
              data-cy="nav-compare"
              @click="navigate('compare')"
            />
          </q-tabs>
          <q-tabs
            no-caps
            active-color="yellow"
            indicator-color="transparent"
            v-model="routerRef"
            v-if="!isDarkTheme"
          >
            <q-tab
              name="total"
              class="q-tab--light"
              label="Total page"
              @click="navigate('total')"
            />
            <q-tab
              name="pertool"
              class="q-tab--light"
              label="Per tool"
              @click="navigate('perTool')"
            />
            <q-tab
              name="compare"
              class="q-tab--light"
              label="Compare"
              @click="navigate('compare')"
            />
          </q-tabs>
        </div>
      </transition>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { computed, defineComponent, ref, watch } from 'vue';
import { Languages } from 'src/stores/types';
import { useRouter } from 'vue-router';
import { Dark } from 'quasar';
import { useAppStore } from 'src/stores/appStore';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const $q = useQuasar();
    const dark = ref(Dark.isActive);
    const topDrawer = ref(false);
    const routerRef = ref('images');
    const appStore = useAppStore();

    const router = useRouter();

    const language = computed({
      get() {
        return appStore.getCurrentLang;
      },
      set(lang: Languages) {
        appStore.setCurrentLang(lang);
      },
    });

    const isDarkTheme = computed(() => {
      return Dark.isActive;
    });

    watch(dark, () => {
      $q.dark.toggle();
    });

    function toggleTopDrawer() {
      topDrawer.value = !topDrawer.value;
    }

    return {
      topDrawer,
      routerRef,
      dark,
      language,
      isDarkTheme,
      toggleTopDrawer,
      navigate(path: string) {
        toggleTopDrawer();
        router.push(path);
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

  width: 10px !important;
  border-radius: 0.5em !important;
}

.q-tab--dark {
  background-color: $snow !important;
  color: $text-primary-dark;
}

.q-tab--light {
  background-color: $secondary !important;
  color: $text-primary-light;
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

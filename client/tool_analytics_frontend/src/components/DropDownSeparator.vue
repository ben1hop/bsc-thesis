<template>
  <div class="row dropdown-bar shadow-3" @click="toggle">
    <q-btn flat dense round :icon="current_icon" aria-label="Menu"></q-btn>
    <q-toolbar-title>{{ title }}</q-toolbar-title>
  </div>
  <transition name="drop">
    <div v-if="toggle_" class="dropdown-container" ref="chartParent">
      <slot name="contentSlot"></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
export default defineComponent({
  name: 'DropDownSeparator',
  props: {
    toggler: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'Bar',
    },
  },
  setup(props) {
    const toggle_ = ref(props.toggler);
    const chartParent = ref<HTMLInputElement>();
    const current_icon = ref(
      toggle_.value ? 'sym_r_expand_more' : 'sym_r_expand_less'
    );

    return {
      toggle_,
      chartParent,
      current_icon,
      toggle() {
        toggle_.value = !toggle_.value;
        current_icon.value = toggle_.value
          ? 'sym_r_expand_more'
          : 'sym_r_expand_less';
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.dropdown-bar {
  background: $grey-1;
  border-radius: 10px;
  padding: 0.4%;
  margin-bottom: 15px;
  background-color: $primary;
  color: white;
  margin-left: 20px;
  margin-right: 20px;
}
.dropdown-bar:hover {
  animation: changeColor 350ms;
  background-color: $secondary;
}
.dropdown-container {
  width: 100%;
  padding: 1%;
  animation: dropdown;
  margin-bottom: 1.5%;
}
.drop-enter-active {
  animation: dropDown 750ms ease-in-out forwards;
  transform-origin: top center;
}
.drop-leave-active {
  animation: growUp 750ms ease-in-out backwards;
  animation-fill-mode: backwards;
  transform-origin: top center;
}

@keyframes changeColor {
  0% {
    background-color: $primary;
  }
  100% {
    background-color: $secondary;
  }
}

@keyframes dropDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes growUp {
  0% {
    transform: scaleY(1);
  }
  80% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(0);
  }
}
</style>

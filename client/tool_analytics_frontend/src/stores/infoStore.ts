import { defineStore } from 'pinia';
import { InfoStoreEntry } from './types';

const EMPTY_ENTRY = {
  name: '',
  value: 0,
  trend: 0,
};

export const useInfoStore = defineStore('infoStore', {
  state: () => ({
    currentTool: EMPTY_ENTRY,
    currentTraffic: EMPTY_ENTRY,
    currentRegion: EMPTY_ENTRY,
    currentOs: EMPTY_ENTRY,
  }),
  getters: {
    getCurrentTool(state) {
      return state.currentTool;
    },
    getCurrentTraffic(state) {
      return state.currentTraffic;
    },
    getCurrentLocation(state) {
      return state.currentRegion;
    },
    getCurrentOs(state) {
      return state.currentOs;
    },
  },
  actions: {
    setCurrentTool(data: InfoStoreEntry) {
      this.currentTool = data;
    },
    setCurrentTraffic(data: InfoStoreEntry) {
      this.currentTraffic = data;
    },
    setCurrentRegion(data: InfoStoreEntry) {
      this.currentRegion = data;
    },
    setCurrentOs(data: InfoStoreEntry) {
      this.currentOs = data;
    },
  },
});

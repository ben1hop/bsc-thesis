import { defineStore } from 'pinia';
import { InfoStoreEntry } from './types';
import { date } from 'quasar';

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
    totalEvents: 0,
    firstEvent: '',
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
    getFirstEvent(state) {
      return state.firstEvent;
    },
    getTotalEvents(state) {
      return state.totalEvents;
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUtilsInfo(data: any[]) {
      this.totalEvents = data[0].totalEvents;
      this.firstEvent = date.formatDate(
        data[0].firstEvent,
        'YYYY-MM-DD - HH:mm:ss'
      );
    },
  },
});

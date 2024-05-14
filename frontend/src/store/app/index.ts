import { StateCreator } from 'zustand';
import { AppData, StoreState } from '../types';
import { produce } from 'immer';

export const createAppDataSlice: StateCreator<StoreState, [], [], AppData> = (
  set
) => ({
  app: {
    drawerCollapsed: false,
    drawerWidth: 240,
    collapseDrawer() {
      set(
        produce((store: StoreState) => {
          store.app.drawerWidth = 70;
          store.app.drawerCollapsed = true;
        })
      );
    },
    expandDrawer() {
      set(
        produce((store: StoreState) => {
          store.app.drawerWidth = 240;
          store.app.drawerCollapsed = false;
        })
      );
    },
  },
});

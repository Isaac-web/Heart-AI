import { StateCreator } from "zustand";
import { Analytics, StoreState } from "../types";
import { loadDoctorAnalytics } from "@/api/analytics";
import { handleError } from "@/utils/errorHandler";
import { produce } from "immer";

const createAnalyticsSlice: StateCreator<StoreState, [], [], Analytics> = (
  set,
  get
) => ({
  analytics: {
    doctor: {
      loading: false,
      data: {
        numberOfHealthyReports: 0,
        numberOfPendingAppointments: 0,
        numberOfUnHealthyReports: 0,
      },
      async loadAnalytics() {
        get().removeError(this.loadAnalytics.name);

        produce((store: StoreState) => {
          store.analytics.doctor.loading = true;
        });

        try {
          const data = await loadDoctorAnalytics();

          set(
            produce((store: StoreState) => {
              store.analytics.doctor.data.numberOfHealthyReports =
                data.healthyReports;
              store.analytics.doctor.data.numberOfUnHealthyReports =
                data.unhealthyReports;
              store.analytics.doctor.data.numberOfPendingAppointments =
                data.pendingAppointments;
            })
          );
        } catch (err) {
          const message = handleError(err as Error);
          get().addError({ callingFunction: this.loadAnalytics.name, message });
        } finally {
          produce((store: StoreState) => {
            store.analytics.doctor.loading = false;
          });
        }
      },
    },
  },
});

export { createAnalyticsSlice };

import { create } from 'zustand';

const useDiagnosisStore = create((set) => ({
  diagnosisDetail: null,

  setDiagnosisDetail: (detail) => set({ diagnosisDetail: detail }),

  clearDiagnosisDetail: () => set({ diagnosisDetail: null }),
}));

export default useDiagnosisStore;

import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: null,
    selectedTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    setUser: (user) => set({ user }),
    setSelectedTimeZone: (timezone) => set({ selectedTimeZone: timezone }),

}));

export default useUserStore;

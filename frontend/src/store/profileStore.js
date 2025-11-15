import { create } from 'zustand';
import axios from 'axios';

const useProfileStore = create((set) => ({
    profiles: [],
    loading: false,
    error: null,

    getProfiles: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/profile');
            set({ profiles: res.data, loading: false });
        } catch (err) {
            set({ error: err.response?.data?.msg || 'Error loading profiles', loading: false });
        }
    },

    createProfile: async ({ name }) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/profile', { name }, config);
            set((state) => ({ profiles: [...state.profiles, res.data], loading: false }));
        } catch (err) {
            set({ error: err.response?.data?.msg || 'Error creating profile', loading: false });
        }
    }
}));

export default useProfileStore;

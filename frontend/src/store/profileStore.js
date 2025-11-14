import { create } from 'zustand';
import axios from 'axios';

const useProfileStore = create((set) => ({
    profile: null,
    loading: false,
    error: null,

    getProfile: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/profile');
            set({ profile: res.data, loading: false });
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    createProfile: async (formData) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/profile', formData, config);
            set({ profile: res.data, loading: false });
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    updateProfile: async (formData) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/profile', formData, config);
            set({ profile: res.data, loading: false });
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },
}));

export default useProfileStore;

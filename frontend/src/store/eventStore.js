import { create } from 'zustand';
import axios from 'axios';

const useEventStore = create((set, get) => ({
    events: [],
    event: null,
    loading: false,
    error: null,

    getEvents: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('/api/events');
            set({ events: res.data, loading: false });
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    getEventById: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`/api/events/${id}`);
            set({ event: res.data, loading: false });
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    createEvent: async (formData) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/api/events', formData, config);
            set((state) => ({
                events: [...state.events, res.data],
                loading: false
            }));
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    updateEvent: async (id, formData) => {
        set({ loading: true, error: null });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.put(`/api/events/${id}`, formData, config);
            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id ? res.data : event
                ),
                event: res.data,
                loading: false
            }));
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },

    deleteEvent: async (id) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/events/${id}`);
            set((state) => ({
                events: state.events.filter((event) => event._id !== id),
                loading: false
            }));
        } catch (err) {
            set({ error: err.response.data.msg, loading: false });
        }
    },
}));

export default useEventStore;

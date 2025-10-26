import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const storage = localStorage.getItem('app-storage');
        if (storage) {
            try {
                const parsed = JSON.parse(storage);
                const user = parsed?.state?.user;

                if (user?.id) config.headers['X-User-ID'] = user.id;
                if (user?.role) config.headers['X-User-Role'] = user.role;
            } catch (err) {
                console.error('Failed to parse app-storage:', err);
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

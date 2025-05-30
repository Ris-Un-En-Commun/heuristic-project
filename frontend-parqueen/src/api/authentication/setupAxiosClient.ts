import axios from 'axios';

export type UserRole = 'admin' | 'user' | 'manager';


export function setupAxiosClient(role: UserRole): void {
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.headers.common['Authorization'] = role
}
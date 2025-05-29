import axios from 'axios';

type UserRole = 'admin' | 'employee' | 'manager';


export function setupAxiosClient(role: UserRole): void {
    console.log(import.meta.env.VITE_BACKEND_URL)
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
    axios.defaults.headers.common['Authorization'] = role
}
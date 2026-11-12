import axios from 'axios';


const dashboardApi = axios.create({
  baseURL: 'https://sairna.abdulrahman-hares.com/api/v1/dashboard', // 👈 احرص ألا يكون هناك /docs/
});

// إرفاق الـ Token تلقائياً بكل طلب
dashboardApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('dashboard_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth ---
export const adminLogin = async (credentials) => {
  const { data } = await dashboardApi.post('/auth/login', credentials);
  if (data?.token) {
    localStorage.setItem('dashboard_token', data.token);
  }
  return data;
};

export const getAdminProfile = async () => {
  const { data } = await dashboardApi.get('/auth/me');
  return data;
};

// --- Overview / Statistics ---
export const getDashboardOverview = async () => {
  const { data } = await dashboardApi.get('/overview');
  return data;
};

// --- Cities ---
export const getDashboardCities = async () => {
  const { data } = await dashboardApi.get('/cities');
  return data;
};

// --- Companies ---
export const getDashboardCompanies = async () => {
  const { data } = await dashboardApi.get('/companies');
  return data;
};

export const createCompany = async (companyData) => {
  const { data } = await dashboardApi.post('/companies', companyData);
  return data;
};

export const updateCompany = async ({ id, ...companyData }) => {
  const { data } = await dashboardApi.patch(`/companies/${id}`, companyData);
  return data;
};

// --- Trips ---
export const getDashboardTrips = async () => {
  const { data } = await dashboardApi.get('/trips');
  return data;
};

export const createTrip = async (tripData) => {
  const { data } = await dashboardApi.post('/trips', tripData);
  return data;
};

export const updateTrip = async ({ id, ...tripData }) => {
  const { data } = await dashboardApi.patch(`/trips/${id}`, tripData);
  return data;
};

export const deleteTrip = async (id) => {
  const { data } = await dashboardApi.delete(`/trips/${id}`);
  return data;
};

// --- Bookings (NEW) ---
export const getDashboardBookings = async () => {
  const { data } = await dashboardApi.get('/bookings');
  return data;
};

export const getBookingDetails = async (id) => {
  const { data } = await dashboardApi.get(`/bookings/${id}`);
  return data;
};

export const cancelBooking = async (id) => {
  const { data } = await dashboardApi.post(`/bookings/${id}/cancel`);
  return data;
};

// --- Users (NEW) ---
export const getDashboardUsers = async () => {
  const { data } = await dashboardApi.get('/users');
  return data;
};

export const getUserDetails = async (id) => {
  const { data } = await dashboardApi.get(`/users/${id}`);
  return data;
};

export default dashboardApi;
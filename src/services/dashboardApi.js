import axios from 'axios';

const dashboardApi = axios.create({
  baseURL: 'https://sairna.abdulrahman-hares.com/api/v1/dashboard',
  headers: {
    'Content-Type': 'application/json',
  },
});

// إرفاق الـ Token تلقائياً مع كل طلب
dashboardApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dashboard_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth ---
export const adminLogin = async (credentials) => {
  const cleanCredentials = {
    email: credentials.email?.trim(),
    password: credentials.password?.trim(),
  };

  const { data } = await dashboardApi.post('/auth/login', cleanCredentials);

  // التقاط التوكن مهما كان هيكل استجابة السيرفر
  const token =
    data?.token ||
    data?.accessToken ||
    data?.access_token ||
    data?.data?.token ||
    data?.data?.accessToken;

  if (token) {
    localStorage.setItem('dashboard_token', token);
  }

  return data;
};

export const adminLogout = () => {
  localStorage.removeItem('dashboard_token');
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

export const createCity = async (cityData) => {
  const { data } = await dashboardApi.post('/cities', cityData);
  return data;
};

export const updateCity = async ({ id, ...cityData }) => {
  const { data } = await dashboardApi.patch(`/cities/${id}`, cityData);
  return data;
};

export const deleteCity = async (id) => {
  const { data } = await dashboardApi.delete(`/cities/${id}`);
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

export const deleteCompany = async (id) => {
  const { data } = await dashboardApi.delete(`/companies/${id}`);
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

// --- Bookings ---
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

// --- Users ---
export const getDashboardUsers = async () => {
  const { data } = await dashboardApi.get('/users');
  return data;
};

export const getUserDetails = async (id) => {
  const { data } = await dashboardApi.get(`/users/${id}`);
  return data;
};
// --- Auth / Profile ---
export const getAdminProfile= async () => {
  const { data } = await dashboardApi.get('/auth/me');
  return data;
};

export default dashboardApi;
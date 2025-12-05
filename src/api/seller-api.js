import axiosInstance from './axios-instance';

export const sellerApi = {
  getDashboardStats: async () => axiosInstance.get('/v1/seller/dashboard/stats'),
};

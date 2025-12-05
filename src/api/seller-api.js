import axiosInstance from './axios-instance';

export const sellerApi = {
  getDashboardStats: async () => axiosInstance.get('/v1/seller/dashboard/stats'),

  getDailyRevenue: async (year, month) =>
    axiosInstance.get('/v1/seller/dashboard/daily-revenue', {
      params: { year, month },
    }),

  getTopProducts: async (topN) =>
    axiosInstance.get('/v1/seller/dashboard/top-products', {
      params: { topN: topN || 5 },
    }),

  getRecentOrders: async (page, size) =>
    axiosInstance.get('/v1/seller/dashboard/recent-orders', {
      params: { page: page || 0, size: size || 5 },
    }),
};

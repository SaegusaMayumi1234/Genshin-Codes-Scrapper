import axios from 'axios';
import ApiError from './apiError';

const axiosInstance = axios.create();

export default {
  async getSiteData(url: string): Promise<any> {
    try {
      const response = await axiosInstance({
        url,
        method: 'GET',
      });

      return response.data;
    } catch (error: any) {
      throw new ApiError(error.response.status);
    }
  },
};

import axios from 'axios';
import ApiError from './apiError';

const axiosInstance = axios.create({
  
});

export default {
  async getSiteData(url: string): Promise<any> {
    try {
      const response = await axiosInstance({
        url,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.3'
        }
      });

      return response.data;
    } catch (error: any) {
      throw new ApiError(error.response.status);
    }
  },
};

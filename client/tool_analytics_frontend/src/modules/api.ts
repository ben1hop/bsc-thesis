import { ChartData } from 'chart.js';
import { api, getApiBaseUrl } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

export async function request(
  dataset: string,
  params?: Record<string, any>
): Promise<AxiosResponse<ChartData | any>> {
  return api.get(getApiBaseUrl() + dataset, {
    params: {
      ...params,
    },
  });
}

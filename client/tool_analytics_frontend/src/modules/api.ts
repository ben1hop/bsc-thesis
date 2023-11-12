import { ChartData } from "chart.js";
import { api, getApiBaseUrl } from 'src/boot/axios';
import { AxiosResponse } from 'axios';

export async function request(
  dataset: string
): Promise<AxiosResponse<ChartData>> {
  return api.get(getApiBaseUrl() + dataset);
}
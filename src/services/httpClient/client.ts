import axios, { type AxiosInstance } from 'axios';
import type { RequestConfig, HttpResponse } from './types';
import { httpConfig } from './config';
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from './interceptors';

export class HTTPClient {
  private static instance: HTTPClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create(httpConfig);

    this.setupInterceptors();
  }

  public static getInstance(): HTTPClient {
    if (!HTTPClient.instance) {
      HTTPClient.instance = new HTTPClient();
    }
    return HTTPClient.instance;
  }

  private setupInterceptors(): void {
    setupRequestInterceptor(this.axiosInstance);
    setupResponseInterceptor(this.axiosInstance);
  }

  public async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const response: HttpResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response: HttpResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response: HttpResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    config?: RequestConfig
  ): Promise<T> {
    const response: HttpResponse<T> = await this.axiosInstance.delete(
      url,
      config
    );
    return response.data;
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response: HttpResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public setDefaultHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  public removeDefaultHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }
}

export const httpClient = HTTPClient.getInstance();

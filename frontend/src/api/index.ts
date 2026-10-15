
import axios from 'axios';
import { AxiosHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from '../functions/auth-token.functions';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

const setAuthorizationHeader = (
  headers: AxiosHeaders,
  token: string,
): AxiosHeaders =>
  AxiosHeaders.from({
    ...headers.toJSON(),
    Authorization: `Bearer ${token}`,
  });

const addAuthorizationHeader = (
  request: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = getAuthToken();
  const headers = token
    ? setAuthorizationHeader(request.headers, token)
    : request.headers;

  return { ...request, headers };
};

api.interceptors.request.use(addAuthorizationHeader);
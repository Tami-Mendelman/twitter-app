import axios, { type AxiosError } from "axios";
import { trim } from "lodash/fp";

export const getAxiosErrorMessage = (error: Error): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return trim(axiosError.response?.data?.message ?? "") || error.message;
  }
  return error.message;
};

import { isAxiosError } from "axios";
import { trim } from "lodash/fp";

export const getAxiosErrorMessage = (error: Error): string =>
  isAxiosError(error)
    ? trim(error.response?.data?.message ?? "") || error.message
    : error.message;

import axios, { AxiosError } from "axios";

export const getRandomID = () => {
  const id = crypto.randomUUID().replace(/-/g, "").slice(0, 24);
  return `rngfid_${id}`;
};

export const getInstance = ({ apiURL }: { apiURL: string }) => {
  return axios.create({
    baseURL: apiURL,
  });
};

export const getErrorMessage = (error: unknown) =>
  error instanceof AxiosError
    ? error.response?.data?.error ?? error.code
    : error instanceof Error
    ? error.message
    : "Something went wrong. Please try again.";

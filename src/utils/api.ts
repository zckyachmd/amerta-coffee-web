import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_APP_API_BASEURL;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestConfig<T> extends AxiosRequestConfig {
  method: HttpMethod;
  data?: T;
  params?: Record<string, unknown>;
}

interface Issue {
  message: string;
  path: string[];
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data;
    if (response?.error) {
      const issues = response.error.issues as Issue[];
      if (issues?.length) {
        return issues
          .map(
            (issue) =>
              `Error: ${issue.message} (Field: ${issue.path.join(", ")})`
          )
          .join(", ");
      }
      return (
        response.error.toString() || "An error occurred. Please try again."
      );
    }
  }
  return "Something went wrong, please try again.";
};

const apiRequest = async <T>(
  path: string,
  method: HttpMethod,
  data?: T,
  params?: Record<string, unknown>
): Promise<T> => {
  try {
    const config: ApiRequestConfig<T> = {
      method,
      url: `${baseUrl}${path}`,
      data,
      params,
    };

    const response = await axios.request<T>(config);
    return response.data;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    throw new Error(errorMessage);
  }
};

export default apiRequest;

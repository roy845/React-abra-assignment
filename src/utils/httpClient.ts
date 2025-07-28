import axios from "axios";

export class HttpClient {
  static async get<TResponse>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<TResponse> {
    try {
      const response = await axios.get<TResponse>(url, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error in HttpClient while sending GET request:", error);
      throw error;
    }
  }
}

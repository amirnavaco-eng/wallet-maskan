import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type { ApiResponse, HomeDataResponse } from "../types";

export const homeService = {
  async getHomeData(): Promise<ApiResponse<HomeDataResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.get<ApiResponse<HomeDataResponse>>("/home");
    // return data;
    void axiosClient;
    return mockDelay({
      success: true,
      data: {
        card: {
          cardHolderName: "علی محمدی",
          cardNumber: "6274129912345678",
          accountNumber: "0123456789",
          sheba: "IR820540102680020817909002",
          expiryMonth: "08",
          expiryYear: "07",
          cvv2: "482",
          status: "active",
        },
        walletBalance: 48250000,
        lastLoginAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    });
  },
};

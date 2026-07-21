import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type { ApiResponse, CardDetailsResponse } from "../types";

export const cardService = {
  async getCardDetails(): Promise<ApiResponse<CardDetailsResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.get<ApiResponse<CardDetailsResponse>>("/card/details");
    // return data;
    void axiosClient;
    return mockDelay({
      success: true,
      data: {
        cardNumber: "6274129912345678",
        accountNumber: "0123456789",
        sheba: "IR820540102680020817909002",
      },
    });
  },

  /** Refreshes card status/balance information shown on the dashboard. */
  async refreshCardInfo(): Promise<ApiResponse<{ status: string; refreshedAt: string }>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.post("/card/refresh");
    // return data;
    return mockDelay({
      success: true,
      data: { status: "active", refreshedAt: new Date().toISOString() },
    });
  },
};

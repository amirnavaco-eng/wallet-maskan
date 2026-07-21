import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type { ApiResponse, LoanSummaryResponse } from "../types";

export const loanService = {
  async getLoanSummary(): Promise<ApiResponse<LoanSummaryResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.get<ApiResponse<LoanSummaryResponse>>("/loans/summary");
    // return data;
    void axiosClient;
    const totalAmount = 100000000;
    const usedAmount = 95000000;
    return mockDelay({
      success: true,
      data: {
        totalAmount,
        usedAmount,
        remainingAmount: totalAmount - usedAmount,
        status: "active",
        nextInstallmentDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
        nextInstallmentAmount: 4500000,
      },
    });
  },
};

import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type { ApiResponse, TransactionsResponse } from "../types";

const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

export const transactionsService = {
  async getTransactions(limit = 5): Promise<ApiResponse<TransactionsResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.get<ApiResponse<TransactionsResponse>>("/transactions", { params: { limit } });
    // return data;
    void axiosClient;
    const items = [
      {
        id: "tx-1",
        title: "خرید از فروشگاه دیجی‌کالا",
        counterparty: "دیجی‌کالا",
        amount: 1250000,
        type: "withdrawal" as const,
        occurredAt: hoursAgo(3),
      },
      {
        id: "tx-2",
        title: "واریز حقوق",
        counterparty: "شرکت آریا سامانه",
        amount: 32000000,
        type: "deposit" as const,
        occurredAt: hoursAgo(20),
      },
      {
        id: "tx-3",
        title: "پرداخت قبض برق",
        counterparty: "اداره برق",
        amount: 480000,
        type: "withdrawal" as const,
        occurredAt: hoursAgo(30),
      },
      {
        id: "tx-4",
        title: "انتقال به سارا رضایی",
        counterparty: "سارا رضایی",
        amount: 2000000,
        type: "withdrawal" as const,
        occurredAt: hoursAgo(50),
      },
      {
        id: "tx-5",
        title: "بازگشت وجه",
        counterparty: "اسنپ",
        amount: 65000,
        type: "deposit" as const,
        occurredAt: hoursAgo(72),
      },
    ].slice(0, limit);

    return mockDelay({ success: true, data: { items } });
  },
};

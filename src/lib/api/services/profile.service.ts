import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type { ApiResponse, ProfileResponse } from "../types";

export const profileService = {
  async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.get<ApiResponse<ProfileResponse>>("/profile");
    // return data;
    void axiosClient;
    return mockDelay({
      success: true,
      data: {
        fullName: "علی محمدی",
        nationalId: "0012345678",
        mobileNumber: "09121234567",
        customerId: "BM-4471290",
      },
    });
  },
};

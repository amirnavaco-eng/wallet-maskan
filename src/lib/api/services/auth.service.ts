import axiosClient from "../axiosClient";
import { mockDelay } from "../mock";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types";

export const authService = {
  /** Sends an OTP to the given mobile number. */
  async login(payload: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
    // return data;
    void axiosClient;
    return mockDelay({
      success: true,
      data: {
        otpSentTo: payload.mobileNumber,
        otpExpirySeconds: 120,
      },
    });
  },

  /** Verifies the OTP code and returns session tokens. */
  async verifyOtp(payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
    // TODO(backend): replace with real call once the endpoint is available.
    // const { data } = await axiosClient.post<ApiResponse<VerifyOtpResponse>>("/auth/verify-otp", payload);
    // return data;
    // In mock mode, any 6-digit code is accepted except this designated "wrong code" sentinel.
    const isInvalid = payload.otpCode === "000000";
    if (isInvalid) {
      return mockDelay({
        success: false,
        data: { accessToken: "", refreshToken: "", isNewSession: false },
        message: "کد تایید نامعتبر است",
      });
    }
    return mockDelay({
      success: true,
      data: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        isNewSession: true,
      },
    });
  },
};

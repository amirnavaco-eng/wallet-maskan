export interface LoginFormValues {
  mobileNumber: string;
}

export type OtpStep = "idle" | "sending" | "sent" | "error";
export type VerifyStep = "idle" | "verifying" | "success" | "invalid" | "error";

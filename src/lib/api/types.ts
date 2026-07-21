// ---------------------------------------------------------------------------
// Generic API envelope
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface LoginRequest {
  mobileNumber: string;
}

export interface LoginResponse {
  otpSentTo: string;
  otpExpirySeconds: number;
}

export interface VerifyOtpRequest {
  mobileNumber: string;
  otpCode: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  isNewSession: boolean;
}

// ---------------------------------------------------------------------------
// Home / Card
// ---------------------------------------------------------------------------

export type CardStatus = "active" | "blocked" | "expired";

export interface BankCardModel {
  cardHolderName: string;
  cardNumber: string;
  accountNumber: string;
  sheba: string;
  expiryMonth: string;
  expiryYear: string;
  cvv2: string;
  status: CardStatus;
}

export interface HomeDataResponse {
  card: BankCardModel;
  walletBalance: number;
  lastLoginAt: string;
}

export interface CardDetailsResponse {
  cardNumber: string;
  accountNumber: string;
  sheba: string;
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

export type TransactionType = "deposit" | "withdrawal";

export interface TransactionModel {
  id: string;
  title: string;
  counterparty: string;
  amount: number;
  type: TransactionType;
  occurredAt: string;
}

export interface TransactionsResponse {
  items: TransactionModel[];
}

// ---------------------------------------------------------------------------
// Loans
// ---------------------------------------------------------------------------

export type LoanStatus = "active" | "closed" | "pending";

export interface LoanSummaryResponse {
  totalAmount: number;
  usedAmount: number;
  remainingAmount: number;
  status: LoanStatus;
  nextInstallmentDate: string;
  nextInstallmentAmount: number;
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export interface ProfileResponse {
  fullName: string;
  nationalId: string;
  mobileNumber: string;
  customerId: string;
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { OtpView } from "@/features/auth/view/OtpView";
import { ROUTES } from "@/shared/constants/routes";

export const metadata: Metadata = { title: "تایید کد | بانک مسکن" };

interface OtpPageProps {
  searchParams: Promise<{ mobile?: string }>;
}

export default async function OtpPage({ searchParams }: OtpPageProps) {
  const { mobile } = await searchParams;
  if (!mobile) {
    redirect(ROUTES.login);
  }
  return <OtpView mobileNumber={mobile} />;
}

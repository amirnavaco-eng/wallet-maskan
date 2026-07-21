import type { Metadata } from "next";
import { LoansView } from "@/features/loans/view/LoansView";

export const metadata: Metadata = { title: "تسهیلات | بانک مسکن" };

export default function LoansPage() {
  return <LoansView />;
}

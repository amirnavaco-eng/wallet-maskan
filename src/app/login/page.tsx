import type { Metadata } from "next";
import { LoginView } from "@/features/auth/view/LoginView";

export const metadata: Metadata = { title: "ورود | بانک مسکن" };

export default function LoginPage() {
  return <LoginView />;
}

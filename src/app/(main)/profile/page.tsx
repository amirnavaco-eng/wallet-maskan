import type { Metadata } from "next";
import { ProfileView } from "@/features/profile/view/ProfileView";

export const metadata: Metadata = { title: "پروفایل | بانک مسکن" };

export default function ProfilePage() {
  return <ProfileView />;
}

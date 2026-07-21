import type { Metadata } from "next";
import { HomeView } from "@/features/home/view/HomeView";

export const metadata: Metadata = { title: "خانه | بانک مسکن" };

export default function HomePage() {
  return <HomeView />;
}

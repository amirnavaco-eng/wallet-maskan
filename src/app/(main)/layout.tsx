import { BottomNav } from "@/shared/components/BottomNav";

// BottomNav is now fixed at the bottom, so we add padding to prevent content overlap
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex-1 pb-24">{children}</div>
      <BottomNav />
    </div>
  );
}

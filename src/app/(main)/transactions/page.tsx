import { TransactionsView } from "@/features/transactions/view/TransactionsView";
import { transactionsService } from "@/lib/api/services";

export const metadata = {
  title: "تراکنش‌ها",
};

export default async function TransactionsPage() {
  const transactionsData = await transactionsService.getTransactions(100);

  return <TransactionsView transactions={transactionsData.data.items} />;
}

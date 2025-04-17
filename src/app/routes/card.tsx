import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMemo, useState } from "react";
import { useCardsGet } from "@/hooks/data/use-cards-get.ts";
import { LoadingSpinner } from "@/components/loading-spinner.tsx";
import { useMarketPurchasesGet } from "@/hooks/data/use-market-purchases-get.ts";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get.ts";
import { ColumnDef } from "@tanstack/react-table";
import { formatPrice, formatTimestamp } from "@/lib/utils.ts";
import { DataTable } from "@/components/data-table.tsx";
import { useMarketBalancesGet } from "@/hooks/data/use-market-balances-get.ts";
import {
  ArrowLeft,
  DollarSign,
  RefreshCcw,
  ShoppingCart,
  User,
} from "lucide-react";
import { PageLayout } from "@/components/page-layout.tsx";

interface Purchases {
  price: string;
  stock_code: string;
  card_number: number;
  previous_balance: string;
  timestamp?: string;
}

const columns: ColumnDef<Purchases>[] = [
  {
    accessorKey: "timestamp",
    header: "Identifier",
    cell: ({ row }) => formatTimestamp(row.getValue("timestamp")),
  },
  {
    accessorKey: "stock_code",
    header: "Name",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("stock_code")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.price);

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
];

const FormSchema = z.object({
  card_number: z
    .string()
    .min(4, {
      message: "Your card number should be 4 digits.",
    })
    .max(4, {
      message: "Your card number should be 4 digits.",
    }),
});

const CardPage = () => {
  const [cardNumber, setCardNumber] = useState<string | undefined>();
  const { data: market } = useMarketActiveGet();
  const { data: allCard, isLoading: isCardsLoading } = useCardsGet();
  const {
    data: allPurchases,
    isLoading: isPurchasesLoading,
    refetch: refetchPurchases,
    isFetching: isPurchasesFetching,
  } = useMarketPurchasesGet(market?.uuid);
  const { data: allBalances } = useMarketBalancesGet(market?.uuid);

  const searchCard = useMemo(
    () => allCard?.find((card) => card.card_number === Number(cardNumber)),
    [allCard, cardNumber],
  );

  const searchBalance = useMemo(
    () =>
      allBalances?.find(
        (balance) => balance.card_number === Number(cardNumber),
      ),
    [allBalances, cardNumber],
  );

  const purchases = useMemo(
    () =>
      allPurchases?.filter(
        (purchase) => purchase.card_number === Number(cardNumber),
      ) ?? [],
    [allPurchases, cardNumber],
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      card_number: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setCardNumber(data.card_number);
    form.reset();
  }

  return (
    <PageLayout
      title="View your card"
      description="Enter your card number to see your current balance and purchases"
    >
      <div className="grid lg:grid-cols-3 lg:gap-x-4 gap-y-4 lg:gap-y-0">
        <div className="lg:col-span-2">
          {cardNumber ? (
            isCardsLoading || isPurchasesLoading ? (
              <LoadingSpinner />
            ) : searchCard && searchBalance ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Name</CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{searchCard?.name}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Balance
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatPrice(searchBalance?.balance)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Purchases
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {purchases?.length}
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-3">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <CardTitle>Purchases</CardTitle>
                        <CardDescription>Your latest purchases</CardDescription>
                      </div>
                      <Button
                        onClick={() => refetchPurchases()}
                        size="icon"
                        variant="secondary"
                        disabled={isPurchasesFetching}
                      >
                        <RefreshCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable columns={columns} data={purchases} />
                  </CardContent>
                </Card>
                <div>
                  <Button
                    onClick={() => setCardNumber(undefined)}
                    className="flex-1"
                  >
                    <ArrowLeft />
                    Back
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="bg-red-600">
                <CardHeader>
                  <CardTitle>
                    Card number <strong>{cardNumber}</strong> doesn't exist.
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Please confirm you typed the card number correctly, and try
                    again.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setCardNumber(undefined)}
                    variant="outline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                </CardFooter>
              </Card>
            )
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Check your card</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="card_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CardPage;

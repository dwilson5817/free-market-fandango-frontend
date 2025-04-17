import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStocksGet } from "@/hooks/data/use-stocks-get";
import { useMarketBalancesGet } from "@/hooks/data/use-market-balances-get";
import { useMarketPricesGet } from "@/hooks/data/use-market-prices-get";
import { useMarketActiveGet } from "@/hooks/data/use-market-active-get";
import { useMarketPurchaseCreate } from "@/hooks/data/use-market-purchase-create";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card.tsx";
import { Check, ChevronsUpDown, CircleCheck, CircleX } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { useCardsGet } from "@/hooks/data/use-cards-get.ts";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const formSchema = z.object({
  card_number: z.number(),
  stock_code: z.string().min(1),
});

const defaultValues = {
  card_number: 0,
  stock_code: undefined,
};

interface BalanceCheckProps {
  cardNumber?: number;
  stockCode?: string;
}

export const BalanceCheck = ({ cardNumber, stockCode }: BalanceCheckProps) => {
  const { data: market } = useMarketActiveGet();
  const { data: balances } = useMarketBalancesGet(market?.uuid);
  const { data: prices } = useMarketPricesGet(market?.uuid);

  const currentBalance = Number(
    balances?.find((balance) => balance.card_number === cardNumber)?.balance,
  );
  const stockPrice = Number(
    prices?.find((price) => price.stock_code === stockCode)?.price,
  );

  if (!currentBalance || !stockPrice) return null;

  const isBalanceSufficient =
    currentBalance && stockPrice && currentBalance - stockPrice > 0;

  return isBalanceSufficient ? (
    <div className="text-sm text-green-700 flex items-center gap-1">
      <CircleCheck className="inline w-4" />
      <span>Balance sufficient</span>
    </div>
  ) : (
    <div className="text-sm text-red-700 flex items-center gap-1">
      <CircleX className="inline w-4" />
      <span>Balance not sufficient</span>
    </div>
  );
};

export const CreatePurchaseForm = () => {
  const { data: market } = useMarketActiveGet();

  const { data: cards } = useCardsGet();
  const { data: balances } = useMarketBalancesGet(market?.uuid);

  const { data: stocks } = useStocksGet();
  const { data: prices } = useMarketPricesGet(market?.uuid);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { watch, reset } = form;
  const cardNumber = watch("card_number");
  const stockCode = watch("stock_code");

  const { mutate } = useMarketPurchaseCreate({
    onSuccess: () => reset(defaultValues),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      params: {
        path: {
          market_uuid: market?.uuid || "",
        },
      },
      body: {
        ...values,
        price:
          prices?.find((price) => price.stock_code === values.stock_code)
            ?.price || 0,
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Creating a purchase is an irreversible action because the market
          reacts immediately to purchases so please confirm your selections
          before submitting!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormItem>
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Card</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[350px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? cards?.find(
                                  (card) => card.card_number === field.value,
                                )?.name
                              : "Select stock"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandInput placeholder="Search stocks..." />
                          <CommandList>
                            <CommandEmpty>No stock found.</CommandEmpty>
                            <CommandGroup>
                              {balances?.map((balance) => (
                                <CommandItem
                                  value={String(balance.card_number)}
                                  key={balance.card_number}
                                  onSelect={() => {
                                    form.setValue(
                                      "card_number",
                                      balance.card_number,
                                    );
                                  }}
                                >
                                  <span>{balance.card_number}</span>
                                  <span className="opacity-60">
                                    {
                                      cards?.find(
                                        (card) =>
                                          card.card_number ===
                                          balance.card_number,
                                      )?.name
                                    }
                                  </span>
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      balance.card_number === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The card to charge the purchase to.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
            <FormItem>
              <FormField
                control={form.control}
                name="stock_code"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Stock</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[350px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? stocks?.find(
                                  (stock) => stock.code === field.value,
                                )?.name
                              : "Select stock"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0">
                        <Command>
                          <CommandInput placeholder="Search stocks..." />
                          <CommandList>
                            <CommandEmpty>No stock found.</CommandEmpty>
                            <CommandGroup>
                              {stocks?.map((stock) => (
                                <CommandItem
                                  value={stock.name}
                                  key={stock.code}
                                  onSelect={() => {
                                    form.setValue("stock_code", stock.code);
                                  }}
                                >
                                  <span>{stock.name}</span>
                                  {prices?.find(
                                    (price) => price.stock_code === stock.code,
                                  ) && (
                                    <span className="opacity-60">
                                      {formatPrice(
                                        prices?.find(
                                          (price) =>
                                            price.stock_code === stock.code,
                                        )?.price ?? "",
                                      )}
                                    </span>
                                  )}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      stock.code === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The stock the customer wishes to buy.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormItem>
            <div className="flex gap-3">
              <Button type="submit">Submit</Button>
              <BalanceCheck cardNumber={cardNumber} stockCode={stockCode} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

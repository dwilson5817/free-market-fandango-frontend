import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input.tsx";
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
import { useStockCreate } from "@/hooks/data/use-stock-create";
import { Tag, TagInput } from "emblor";

const formSchema = z.object({
  code: z.string(),
  name: z
    .string()
    .min(3, "Too short")
    .max(255, "Name cannot be longer than 255"),
  initial_price: z.number(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

export function CreateStockForm() {
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useStockCreate({
    onSuccess: () => {
      setOpen(false);

      form.reset();
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      body: {
        ...values,
        tags: values.tags.flatMap(({ text }) => text),
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SheetHeader>
              <SheetTitle>Create a new stock</SheetTitle>
            </SheetHeader>

            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <form className="grid w-full items-start gap-6">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        A short code to refer to this stock
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        A longer name describing the stock
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initial_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          {...form.register("initial_price", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        The stock price when the market opens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          tags={tags}
                          setTags={(newTags) => {
                            setTags(newTags);
                            form.setValue("tags", newTags as [Tag, ...Tag[]]);
                          }}
                          activeTagIndex={activeTagIndex}
                          setActiveTagIndex={setActiveTagIndex}
                          inlineTags={false}
                          inputFieldPosition={"top"}
                        />
                      </FormControl>
                      <FormDescription>
                        Events with at least one matching tag will cause the
                        price of this stock to change, between the minimum and
                        maximum percentage change values
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </div>

            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

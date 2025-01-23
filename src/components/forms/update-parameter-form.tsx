import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PenLine } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { components } from "@/hooks/types/schema";
import { useSettingsPut } from "@/hooks/data/use-settings-put.ts";

interface ActionsDropdownProps {
  setting: components["schemas"]["Setting"];
}

const formSchema = z.object({
  value: z.number(),
});

export function UpdateParameterForm({
  setting: { key, value },
}: ActionsDropdownProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { value },
  });

  const { mutate } = useSettingsPut();

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutate({
      body: [
        {
          key,
          ...data,
        },
      ],
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <PenLine className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SheetHeader>
              <SheetTitle>Update parameter</SheetTitle>
            </SheetHeader>

            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <form className="grid w-full items-start gap-6">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="mb-8">
                      <FormLabel>{key}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          {...form.register("value", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
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

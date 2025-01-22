import { z } from "zod"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCardCreate } from '@/hooks/data/use-card-create.ts'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Plus } from 'lucide-react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'

const formSchema = z.object({
  card_number: z.number(),
  name: z
    .string()
    .min(3, 'Too short')
    .max(255, 'Name cannot be longer than 255'),
  balance: z.number(),
})

export function CreateCardForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      card_number: 0,
      name: '',
      balance: 0
    },
    resolver: zodResolver(formSchema),
  })
  const { isSubmitting } = form.formState

  const { mutate } = useCardCreate({
    onSuccess: () => {
      setOpen(false)

      form.reset()
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      body: values,
    })
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
              <SheetTitle>Create a new card</SheetTitle>
            </SheetHeader>

            <div className="relative hidden flex-col items-start gap-8 md:flex">
              <form className="grid w-full items-start gap-6">
                <FormField
                  control={form.control}
                  name="card_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          {...form.register('card_number', {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        The number on the front of the card
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
                        The name of the person who owns this card
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening balance</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          {...form.register('balance', {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        The balance this card will have when the market opens
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </div>

            <SheetFooter>
              <Button disabled={isSubmitting} type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
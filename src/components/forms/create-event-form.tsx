import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input.tsx'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Tag, TagInput } from 'emblor'
import { useEventCreate } from '@/hooks/data/use-event-create.ts'
import { Textarea } from '@/components/ui/textarea.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'

const formSchema = z
  .object({
    title: z.string().min(1).default(''),
    body: z.string().min(1).default(''),
    breaking: z.boolean().default(false),
    video_url: z.union([z.literal(''), z.string().trim().url()]).default(''),
    change_min: z.number(),
    change_max: z.number(),
    tags: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      )
      .default([]),
  })
  .refine((data) => !data.breaking || !!data.video_url, {
    message: 'Required when breaking is selected',
    path: ['video_url'],
  })

export function CreateEventForm() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: '',
      body: '',
      breaking: false,
      video_url: '',
      change_min: 0,
      change_max: 0,
      tags: [],
    },
    resolver: zodResolver(formSchema),
  })
  const { isSubmitting } = form.formState

  const { mutate } = useEventCreate({
    onSuccess: () => {
      setOpen(false)

      form.reset()
    }
  })

  const { setValue, watch } = form
  const isBreaking = watch('breaking')

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)
  const [tags, setTags] = useState<Tag[]>([])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      body: {
        ...values,
        tags: values.tags.flatMap(({ text }) => text),
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-scroll">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <SheetHeader>
              <SheetTitle>Create a new event</SheetTitle>
            </SheetHeader>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A short summary of the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    A longer description of the event, shown after the title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breaking"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Breaking</FormLabel>
                    <FormDescription>
                      Breaking news event have a video associated with them,
                      which will be shown on screen when the event runs
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {isBreaking && (
              <FormField
                control={form.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem className="pl-3 pb-2 border-l-2">
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormDescription>
                      URL of the video to be played when this event runs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="change_min"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. %</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        {...form.register('change_min', {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormDescription>
                      The minimum amount a stock's price will change when this
                      event runs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="change_max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max. %</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        {...form.register('change_max', {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                    <FormDescription>
                      The maximum amount a stock's price will change when this
                      event runs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                        setTags(newTags)
                        setValue('tags', newTags as [Tag, ...Tag[]])
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                      inlineTags={false}
                      inputFieldPosition={'top'}
                    />
                  </FormControl>
                  <FormDescription>
                    Stocks with at least one tag in common will have their
                    prices changed when this event runs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button disabled={isSubmitting} type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}

import { useAuthentication } from '@/hooks/use-authentication.ts'
import { useNavigate } from 'react-router'
import { useToast } from '@/hooks/use-toast.ts'
import { useLogin } from '@/hooks/data/use-login.ts'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import LogoIcon from '@/assets/logo-icon.svg'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { LoaderCircle } from 'lucide-react'
import { NavigationBar } from '@/components/navigation-bar.tsx'
import { Separator } from '@/components/ui/separator.tsx'

const formSchema = z.object({
  password: z.string().min(0, 'Please enter a password.'),
})

const Auth = () => {
  const { login } = useAuthentication()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { mutate: submitLogin, isPending } = useLogin({
    onSuccess: data => {
      login(data.access_token)
      navigate('/admin')
    },
    onError: error => {
      toast({
        variant: 'destructive',
        title: 'Login failed!',
        // @ts-expect-error OpenAPI types currently are wrong, this should be valid, will need to modify OpenAPI spec
        description: error.message,
      })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    submitLogin({
      body: values
    })
  }

  return (
    <>
      <NavigationBar />
      <div className="flex flex-1 w-full items-center justify-center px-4">
        <div className='w-[350px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader
                  className='text-center p-4'
                >
                  <CardTitle>
                    <div className="flex justify-center items-center gap-1">
                      <img
                        src={LogoIcon as string}
                        alt="Free Market Fandango logo"
                        className="w-9"
                      />
                      <span className="font-bold text-2xl">
                        Admin
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Login to access the admin panel
                  </CardDescription>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Administrator password.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button disabled={isPending} type="submit" className="w-full">
                    {isPending && (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Login
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Auth

import { useToast } from '@/hooks/use-toast.ts'

interface UseApiResultToastParams {
  description: string
}

export const useApiResult = () => {
  const toast = useToast()

  const success = ({ description }: UseApiResultToastParams) => {
    toast.toast({
      title: 'Success',
      description,
    })
  }

  const error = ({ description }: UseApiResultToastParams) => {
    toast.toast({
      variant: 'destructive',
      title: 'Error',
      description,
    })
  }

  return { success, error }
}

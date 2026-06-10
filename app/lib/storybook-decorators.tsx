import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Decorator } from '@storybook/react'

export const withQueryClient: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Number.POSITIVE_INFINITY,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  )
}

export const withFormWidth: Decorator = (Story, context) => {
  const isFoundations = context.title?.includes('Foundations')

  return (
    <div className={`w-full ${isFoundations ? 'max-w-5xl' : 'max-w-xl'}`}>
      <Story />
    </div>
  )
}

export const withPanelHeight: Decorator = (Story) => (
  <div className="h-[640px] w-full max-w-md">
    <Story />
  </div>
)

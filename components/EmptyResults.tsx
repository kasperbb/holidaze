import { Alert, AlertIcon } from '@chakra-ui/react'

interface EmptyResultsProps {
  data: unknown[] | undefined
  errorMessage?: string
  children: React.ReactNode
}

export function EmptyResults({ data, errorMessage, children }: EmptyResultsProps) {
  if (!data) {
    return errorMessage ? (
      <Alert status="error">
        <AlertIcon />
        {errorMessage}
      </Alert>
    ) : null
  }

  if (data.length) {
    return null
  }

  return (
    <Alert status="warning" borderRadius="lg">
      <AlertIcon />
      {children}
    </Alert>
  )
}

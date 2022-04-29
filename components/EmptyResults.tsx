import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react'

interface EmptyResultsProps extends AlertProps {
  data: unknown[] | undefined
  errorMessage?: string
  children: React.ReactNode
}

export function EmptyResults({ data, errorMessage, children, ...rest }: EmptyResultsProps) {
  if (!data) {
    return errorMessage ? (
      <Alert status="error" {...rest}>
        <AlertIcon />
        {errorMessage}
      </Alert>
    ) : null
  }

  if (data.length) {
    return null
  }

  return (
    <Alert status="warning" borderRadius="lg" {...rest}>
      <AlertIcon />
      {children}
    </Alert>
  )
}

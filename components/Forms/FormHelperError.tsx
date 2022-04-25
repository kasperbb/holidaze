import { FormErrorMessage, FormHelperText } from '@chakra-ui/react'

import { FieldError } from 'react-hook-form'

interface FormHelperErrorProps {
  children?: React.ReactNode
  error: FieldError | FieldError[] | undefined
}

export function FormHelperError({ children, error }: FormHelperErrorProps) {
  if (Array.isArray(error)) {
    return Boolean(error) ? <FormErrorMessage>{error[0].message}</FormErrorMessage> : <FormHelperText>{children}</FormHelperText>
  }

  return Boolean(error) ? <FormErrorMessage>{error?.message}</FormErrorMessage> : <FormHelperText>{children}</FormHelperText>
}

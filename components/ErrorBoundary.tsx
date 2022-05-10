import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Container } from '@chakra-ui/react'
import { Component, ErrorInfo } from 'react'

import NextLink from 'next/link'
import { routes } from '@constants/routes'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container my={40}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="lg"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Error!
            </AlertTitle>
            <AlertDescription maxWidth="sm">There was an error with the application, try again later.</AlertDescription>
          </Alert>
          <NextLink href={routes.base} passHref>
            <Button as="a" variant="outline" mt={6}>
              Go back to the homepage
            </Button>
          </NextLink>
        </Container>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

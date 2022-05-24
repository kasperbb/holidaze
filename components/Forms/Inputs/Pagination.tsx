import { Box, Button, ButtonProps, Icon, UnorderedList } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface PaginationProps {
  totalPages: number
  currentPage: number
  setPage: Dispatch<SetStateAction<number>>
}

export function Pagination({ currentPage, totalPages, setPage }: PaginationProps) {
  return (
    <Box as="nav" py={50} w="full" role="navigation" aria-label="Pagination navigation">
      <UnorderedList display="flex">
        <PageButton aria-label="Previous page" onClick={() => setPage(prev => prev - 1)} disabled={currentPage === 1}>
          <Icon as={FiChevronLeft} boxSize={4} />
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton aria-label={`Go to page ${i + 1}`} active={i + 1 === currentPage} onClick={() => setPage(i + 1)}>
            {i + 1}
          </PageButton>
        ))}
        <PageButton aria-label="Next page" onClick={() => setPage(prev => prev + 1)} disabled={currentPage === totalPages}>
          <Icon as={FiChevronRight} boxSize={4} />
        </PageButton>
      </UnorderedList>
    </Box>
  )
}

function PageButton({ disabled, active, children, onClick, ...rest }: ButtonProps & { active?: boolean }) {
  const activeStyle = {
    bg: 'blue.600',
    color: 'white',
  }

  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      color="gray.700"
      opacity={disabled ? 0.6 : 1}
      border="1px solid"
      borderColor="gray.100"
      _hover={!disabled ? activeStyle : undefined}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={!disabled ? onClick : undefined}
      {...(active && activeStyle)}
      {...rest}
    >
      {children}
    </Button>
  )
}

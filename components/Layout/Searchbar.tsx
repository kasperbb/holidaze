import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { FiSearch } from 'react-icons/fi'
import NextLink from 'next/link'
import { StarRating } from '@components/StarRating'
import { useDebounce } from '@hooks/useDebouce'
import { useOnOutsideClick } from '@hooks/useOnOutsideClick'
import { useSearchAccommodations } from '@hooks/accommodations/useSearchAccommodations'

export function Searchbar({ ...rest }: InputProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [isOpen, setIsOpen] = useState(false)

  const { refetch, isFetching, data } = useSearchAccommodations(debouncedQuery)

  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useOnOutsideClick(() => {
    setQuery('')
    setIsOpen(false)
  }, [inputRef, popoverRef])

  useEffect(() => {
    if (debouncedQuery.length) {
      setIsOpen(true)
      refetch()
    } else {
      setIsOpen(false)
    }
  }, [debouncedQuery, refetch])

  return (
    <Popover isOpen={isOpen} isLazy lazyBehavior="keepMounted" placement="bottom-start" initialFocusRef={inputRef}>
      <PopoverTrigger>
        <InputGroup minWidth="449px">
          <InputLeftElement pointerEvents="none">{isFetching ? <Spinner width={3} height={3} /> : <FiSearch color="gray.300" />}</InputLeftElement>
          <Input borderRadius="lg" placeholder="Search" fontSize="sm" onChange={e => setQuery(e.target.value)} ref={inputRef} {...rest} />
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent width="464px">
        <PopoverBody ref={popoverRef} p={4}>
          {(!data || !data.length) && <Text>No results</Text>}

          <Flex direction="column" gap={4}>
            {data?.map(({ id, name, images, rating }) => (
              <NextLink key={id} href={`/accommodations/${id}`} passHref>
                <Link display="flex" alignItems="center" gap={4}>
                  <Box width={10} height={10} borderRadius="lg" overflow="hidden">
                    <Image src={images ? images[0] : '/placeholder.png'} alt={name} width="100%" height="100%" objectFit="cover" />
                  </Box>
                  <Box>
                    <Heading as="h4" fontSize="md" fontWeight="medium" mb={1}>
                      {name}
                    </Heading>
                    <StarRating rating={rating} size={3} />
                  </Box>
                </Link>
              </NextLink>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

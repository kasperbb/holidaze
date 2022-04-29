import { HTMLChakraProps, chakra } from '@chakra-ui/react'

export function Logo(props: HTMLChakraProps<'svg'>) {
  return (
    <chakra.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xmlSpace="preserve" width={10} {...props}>
      <path
        fill="#2650D9"
        d="M32 0C18.2 0 7 11.2 7 25s11.2 25 25 25v14s25-8.9 25-39C57 11.2 45.8 0 32 0zm-8.2 25c0-4.5 3.7-8.2 8.2-8.2 4.5 0 8.2 3.7 8.2 8.2 0 4.5-3.7 8.2-8.2 8.2-4.5 0-8.2-3.7-8.2-8.2z"
      />
    </chakra.svg>
  )
}

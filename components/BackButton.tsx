import { IconButton, IconButtonProps } from '@chakra-ui/react'

import { FiCornerUpLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'

export function BackButton({ ...rest }: IconButtonProps) {
  const { back } = useRouter()

  return <IconButton icon={<FiCornerUpLeft />} onClick={back} title="Go back" p={3} {...rest} />
}

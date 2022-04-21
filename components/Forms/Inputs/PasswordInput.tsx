import { HiEye, HiEyeOff } from 'react-icons/hi'
import { IconButton, Input, InputGroup, InputProps, InputRightElement, useDisclosure, useMergeRefs } from '@chakra-ui/react'
import { forwardRef, useRef } from 'react'

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <InputGroup>
      <Input ref={mergeRef} name="password" type={isOpen ? 'text' : 'password'} autoComplete="current-password" required {...props} />
      <InputRightElement>
        <IconButton
          variant="link"
          height="full"
          aria-label={isOpen ? 'Mask password' : 'Reveal password'}
          icon={isOpen ? <HiEyeOff /> : <HiEye />}
          onClick={onClickReveal}
        />
      </InputRightElement>
    </InputGroup>
  )
})

PasswordInput.displayName = 'PasswordField'

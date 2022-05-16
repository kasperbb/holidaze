import { ForwardedRef, forwardRef } from 'react'
import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react'

interface TooltipIconButton extends IconButtonProps {}

export const TooltipIconButton = forwardRef((props: TooltipIconButton, ref: ForwardedRef<HTMLButtonElement>) => {
  return (
    <Tooltip label={props['aria-label']} borderRadius="sm">
      <IconButton {...props} ref={ref} />
    </Tooltip>
  )
})

TooltipIconButton.displayName = 'TooltipIconButton'

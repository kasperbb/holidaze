import { IconButton, IconButtonProps, Link, Tooltip } from '@chakra-ui/react'
import { LegacyRef, forwardRef } from 'react'

interface TooltipIconButton extends IconButtonProps {}

export const TooltipIconButton = forwardRef((props: TooltipIconButton, ref: LegacyRef<HTMLAnchorElement> | undefined) => {
  return (
    <Tooltip label={props['aria-label']} borderRadius="sm">
      <Link ref={ref}>
        <IconButton {...props} />
      </Link>
    </Tooltip>
  )
})

TooltipIconButton.displayName = 'TooltipIconButton'

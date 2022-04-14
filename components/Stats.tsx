import { Box, Divider, Flex } from '@chakra-ui/react'

import { Fragment } from 'react'

const STATS = [
  { label: 'Room & Suites', value: '320+' },
  { label: 'Hotels', value: '22' },
  { label: 'B&Bs', value: '45' },
  { label: 'Guesthouses', value: '79' },
]

export function Stats() {
  return (
    <Flex as="dl" direction={['column', 'row']} justify="center" gap={5} my={24} alignItems="center">
      {STATS.map(({ label, value }, index) => (
        <Fragment key={label}>
          <Stat label={label} value={value} />
          {index !== STATS.length - 1 && <Divider orientation="vertical" height={10} />}
        </Fragment>
      ))}
    </Flex>
  )
}

interface StatProps {
  label: string
  value: string | number
}
export function Stat({ label, value }: StatProps) {
  return (
    <Flex direction="column" alignItems="center" px={5}>
      <Box as="dd" fontSize="64px" fontWeight="800" lineHeight={0.75}>
        {value}
      </Box>
      <Box as="dt">{label}</Box>
    </Flex>
  )
}

import { PropsWithChildren } from 'react'

import { Theme } from '@/styles'

type Props = {
  color?: keyof Theme['colors']
  weight?: keyof Theme['fontWeights']
  size?: keyof Theme['fontSizes']
  family?: keyof Theme['fontFamily']
  className?: string
  onClick?: () => void
}

export type TypographyProps = PropsWithChildren<Props>

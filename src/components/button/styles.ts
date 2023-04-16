import UIButton from '@material-ui/core/Button'
import styled, { css } from 'styled-components'

import { ButtonTheme } from './theme'

type ButtonProps = {
  buttonTheme: ButtonTheme
}

export const Button = styled(UIButton)<ButtonProps>`
  text-transform: inherit !important;
  font-weight: bold !important;
  width: 100%;

  ${({ buttonTheme }) =>
    buttonTheme.background &&
    css`
      button {
        color: ${buttonTheme.color};
        background: ${buttonTheme.background};

        &:hover {
          background: ${buttonTheme.backgroundHover};
        }
      }
    `}
`

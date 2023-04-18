import { InputBaseComponentProps, InputProps } from '@material-ui/core'

export type TextFieldProps = {
  label: string
  value: string
  placeholder?: string
  icon?: JSX.Element
  iconPosition?: 'start' | 'end'
  disabled?: boolean
  touched?: boolean
  loading?: boolean
  materialInputProps?: Partial<InputProps>
  inputElementProps?: InputBaseComponentProps
  labelType?: 'outside' | 'inside' | 'without'

  onChange: (value: string) => void
}

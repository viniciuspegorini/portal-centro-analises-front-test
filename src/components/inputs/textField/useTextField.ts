import { useCallback, useEffect, useState } from 'react'

import { TextFieldProps } from './types'

export const useTextField = (props: TextFieldProps) => {
  const { error = '', touched, loading, disabled, onChange, validator } = props

  const [inputError, setInputError] = useState<string>(error)
  const [isFocused, setIsFocused] = useState(false)
  const [inputTouched, setInputTouched] = useState(touched)
  const [isLoading, setLoading] = useState(loading)
  const [isDisabled, setDisabled] = useState(disabled)

  const handleCheckErrors = useCallback(
    () => validator && inputTouched && setInputError(validator()),
    [inputTouched, setInputError, validator]
  )

  const handleOnChange = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    ({ target: { value } }) => {
      setInputTouched(true)
      handleCheckErrors()
      onChange(value)
    },
    [handleCheckErrors, onChange]
  )

  const handleOnFocus = () => {
    setIsFocused(true)
  }

  const handleOnBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    if (loading !== undefined) {
      if (isLoading !== loading) setLoading(loading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (touched !== undefined) {
      if (inputTouched !== touched) setInputTouched(touched)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched])

  useEffect(() => {
    if (disabled !== undefined) {
      if (isDisabled !== disabled) setDisabled(disabled)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  return {
    inputError,
    isFocused,
    inputTouched,
    isLoading,
    isDisabled,
    handleOnChange,
    handleOnFocus,
    handleOnBlur
  }
}

import { fireEvent, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'

type FillInput = {
  sut: RenderResult
  inputId: string
  value: string
}

export const fillInput = ({ sut, inputId, value }: FillInput): void => {
  const input = sut.getByTestId(inputId)
  fireEvent.input(input, { target: { value } })
}

export const fillForm = (sut: RenderResult): void => {
  fillInput({ sut, inputId: 'email', value: 'any@email.com' })
  fillInput({ sut, inputId: 'password', value: 'any_password' })
}

export const clickSubmitButton = (sut: RenderResult, forceEnableButton?: boolean): void => {
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  if (forceEnableButton) submitButton.disabled = false
  fireEvent.click(submitButton)
}

export const submitForm = (sut: RenderResult): void => {
  fillForm(sut)
  clickSubmitButton(sut)
}

export const submitFormAndWait = async (sut: RenderResult): Promise<void> => {
  submitForm(sut)
  await waitFor(() => sut.getByTestId('form'))
}

type ExpectFieldStatus = {
  sut: RenderResult
  fieldName: string
  titleContent: string
  textContent: '🔴' | '🟢'
}

export const expectFieldStatus = ({ sut, fieldName, titleContent, textContent }: ExpectFieldStatus): void => {
  const status = sut.getByTestId(`${fieldName}Status`)
  expect(status.title).toBe(titleContent)
  expect(status.textContent).toBe(textContent)
}

export const expectElementToNotExist = (sut: RenderResult, elementId: string): void => {
  const element = sut.queryByTestId(elementId)
  expect(element).toBeNull()
}

export const expectElementToExist = (sut: RenderResult, elementId: string): HTMLElement => {
  const element = sut.queryByTestId(elementId)
  expect(element).toBeTruthy()
  return element
}

type ExpectButtonDisabledProperty = {
  sut: RenderResult
  buttonId: string
  isDisabled: boolean
}

export const expectButtonDisabledProperty = ({ sut, buttonId, isDisabled }: ExpectButtonDisabledProperty): void => {
  const button = sut.getByTestId(buttonId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

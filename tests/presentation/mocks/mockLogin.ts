import { fireEvent } from '@testing-library/react'
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

export const submitForm = (sut: RenderResult): void => {
  fillForm(sut)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
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

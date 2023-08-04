import React from 'react'
import { type RenderResult, render } from '@testing-library/react'
import Calendar from '@/presentation/components/calendar/calendar'

type Sut = {
  sut: RenderResult
}

const makeSut = (date: Date): Sut => {
  const sut = render(<Calendar date={date} />)
  return {
    sut
  }
}

describe('Calendar Component', () => {
  test('Should render with correct values', () => {
    const { sut } = makeSut(new Date('2023-07-03T05:52:28.514Z'))
    expect(sut.getByTestId('day').textContent).toBe('03')
    expect(sut.getByTestId('month').textContent).toBe('jul')
    expect(sut.getByTestId('year').textContent).toBe('2023')
  })

  test('Should render with other correct values', () => {
    const { sut } = makeSut(new Date('2022-02-28T05:52:28.514Z'))
    expect(sut.getByTestId('day').textContent).toBe('28')
    expect(sut.getByTestId('month').textContent).toBe('fev')
    expect(sut.getByTestId('year').textContent).toBe('2022')
  })
})

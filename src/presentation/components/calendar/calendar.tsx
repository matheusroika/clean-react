import React from 'react'
import styles from './calendarStyles.scss'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'

type Props = {
  date: Date
  className?: string
}

const Calendar: React.FC<Props> = ({ date, className }) => {
  const [formattedDay, formattedMonth, formattedYear] = format(date, 'dd-LLL-y', { locale: ptBR }).split('-')

  return (
    <time className={[styles.calendar, className].join(' ')}>
      <span data-testid='day' className={styles.day}>{formattedDay}</span>
      <span data-testid='month' className={styles.month}>{formattedMonth}</span>
      <span data-testid='year' className={styles.year}>{formattedYear}</span>
    </time>
  )
}

export default Calendar

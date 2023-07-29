export interface Answer {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}

export interface Survey {
  id: string
  question: string
  answers: Answer[]
  totalResponses: number
  date: Date
  answered: boolean
}

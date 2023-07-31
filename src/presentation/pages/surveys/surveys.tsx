import React from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import EmptySurveyItem from './components/emptySurveyItem/emptySurveyItem'

const Surveys: React.FC = () => {
  return (
    <div className={styles.surveys}>
      <Header />
      <main>
        <h1>Enquetes</h1>
        <ul data-testid="surveyList">
          <EmptySurveyItem />
          <EmptySurveyItem />
          <EmptySurveyItem />
          <EmptySurveyItem />
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default Surveys

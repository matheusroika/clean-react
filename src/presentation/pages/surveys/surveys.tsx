import React from 'react'
import styles from './surveysStyles.scss'
import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'

const Surveys: React.FC = () => {
  return (
    <div className={styles.surveys}>
      <Header />
      <main>
        <h1>Enquetes</h1>
        <ul>
          <li>
            <div>
              <div className={[styles.icon, styles.notAnswered].join(' ')}>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAQAAAB3TUQ1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnBx0RDghaer4zAAAAnklEQVQoz43QsQkCQRSE4X8XrcHc0OxasBAjMRO5DmxDrEN7ODCyBgMzI0HQec/gBO/gVt9EC+9jYBYAH2mvu/eilxqbAejg7g6ALX0wagDaNwA6F6B60OZezBdm8A2R+FQKNdo650hh0jVPfpwTtL3pM/wvzHYJTSGnVZnaDcCOAyftuputLn/WqeO2ZTbWI8DAqhADW4QYWKVnib0B2pb1YBTGpj8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjlUMjA6MTQ6MDgtMDM6MDColWdjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTI5VDIwOjE0OjA4LTAzOjAw2cjf3wAAAABJRU5ErkJggg==" />
              </div>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>07</span>
                <span className={styles.year}>2023</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver resultado</footer>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default Surveys

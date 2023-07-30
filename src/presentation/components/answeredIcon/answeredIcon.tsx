import React from 'react'
import styles from './answeredIconStyles.scss'

const IconName = {
  thumbsUp: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAQAAAB3TUQ1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnBx0RDhkwyp7BAAAAnklEQVQoz42RsQkCQRBF3x7aioGRV4ORTdiDHVwNZgfmNqBFiIamJhqZmAnCMfMNDkWWW5kXLczjD/MXBlAjWacZ/1EjSZIvQ5rkdUizl8YBTbJjUfOVfrA2T5FkOwB7qIBdfZEkgJSgfxW23YIiVITwe1BkG1rtniaxxH11oS/gU9QwPv+OAcwKLZ7zq0+FYtbZz/jUDnmqPW2jEcAbWGHY3H/kdsoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjlUMjA6MTQ6MjUtMDM6MDCLZwHeAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTI5VDIwOjE0OjI1LTAzOjAw+jq5YgAAAABJRU5ErkJggg==',
  thumbsDown: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAQAAAB3TUQ1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfnBx0RDghaer4zAAAAnklEQVQoz43QsQkCQRSE4X8XrcHc0OxasBAjMRO5DmxDrEN7ODCyBgMzI0HQec/gBO/gVt9EC+9jYBYAH2mvu/eilxqbAejg7g6ALX0wagDaNwA6F6B60OZezBdm8A2R+FQKNdo650hh0jVPfpwTtL3pM/wvzHYJTSGnVZnaDcCOAyftuputLn/WqeO2ZTbWI8DAqhADW4QYWKVnib0B2pb1YBTGpj8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDctMjlUMjA6MTQ6MDgtMDM6MDColWdjAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTA3LTI5VDIwOjE0OjA4LTAzOjAw2cjf3wAAAABJRU5ErkJggg=='
}

type Props = {
  iconName: 'thumbsUp' | 'thumbsDown'
  className?: string
}

const AnsweredIcon: React.FC<Props> = ({ iconName, className }) => {
  const iconColorStyle = iconName === 'thumbsUp' ? styles.answered : styles.notAnswered

  return (
    <div className={[styles.icon, iconColorStyle, className].join(' ')}>
      <img src={IconName[iconName]} />
    </div>
  )
}

export default AnsweredIcon

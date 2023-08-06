import React from 'react'
import styles from './formStatusStyles.scss'
import Spinner from '../loader/loader'

type Props = {
  isLoading: boolean
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const FormStatus: React.FC<Props> = ({ isLoading, message, setMessage }: Props) => {
  return (isLoading || message) && (
    <div data-testid="modalWrapper" className={styles.modalWrapper}>
      { isLoading && <Spinner data-testid="loader" className={styles.loader} /> }
      { message && <>
        <button data-testid="closeButton" className={styles.closeButton} onClick={() => { setMessage('') }}>
          <img src="data:image/webp;base64,UklGRqQFAABXRUJQVlA4WAoAAAAQAAAADQEADQEAQUxQSMQEAAABd6CgbRum7f6YjPdAR0RgFSLtGRtxoBvZtmrbGf+LXKYUvvVT+L5CwETohiCTE2DppSCyZMuSzSuIW+9uWGusbUf0HxLbRo6kqwdx2HBtb+qdS38m8zJ95gk7897XD+kyz//xHBvzSzyiy1zifdbnvf/i2y48/1f8ucEvEW24RGxwNbpwNTb4JaINl4h17tmFe67zS0QbLhHr3BoNuDXWGBh+BsYKI0PPyFhhaNgZGnPGhpyxscDYkDM2ZswMNTNjysxQMzMmTA0zU2PC3BAzN4YsGF4WjCErhpYVY8CSYWXJGLBmSFkzblg0nCwaN6waSlaNeB/WDSPLxj3WDSHrRry/Y/jYMK78FDvzBq75OHbmzZ1bKGxsGfFob1Wyk7d7bsN+zW1IaLkJCSV3IaXjFuRU3IKkhhuQVXADsvr1k1avn7x27SSWayezWzep1brJbdZMcrFmsnv1kl6rlopWnVSUaqWiUycllTqpadRIUaFGqvr0UVanj7o2bRSWaaOySxelVbqobdJEcZEmqnv0UF6jBkOLDgwlSlB0qFi6o0LH2h13KMPiJfcnw+o1Tzbly/c89Vav3/RCVBtA9bJcm8C1SamMINuyVWawbWDrQui283UpbFIWQydlOXxSFcQnRUmMUhJFKSVZnFIRxikVaaSSHkcr6Xm8khxILMmJzJIaSS2pmdySGEouianskhZLL2m5/JIUrIFkJWsgOdE6SE62FpIQrokkpOsi+/G6yH6+NrIb8MU2wvN/x858Ejvz5QNcc4miscnuyRtjOx2owidFGKUGo5TglAqcUoFU8rFKOl7JxivJmCUXs6Tilkzckohd8rBLGn7Jwi9ZNJAkGkgOLSSFFpJAF0mgiezTRrZpI7s08hwfp/jkFGc5xRUd42nzFC8ix3hJPcUG4xjbrVNsPs+xFT/FG5NjvE07xZvWY7yFP8UBjWMc3jnFwa5jHPo7xYHQYxwWPsRB8grDSYlhpMYwUmT4qDJ8lBk6TvFt6E07fVP++d2AW+W4Tt7P93wXEuJ1ISFdE1LC9SAlWwuSojUgK1kDsoI1ICuXn7xYevJS2ckMJSczk5vcSGpyE5nJDiQmO4+WijhSKtJIqQgjpSKLk5ooSmqSGKkKIqQqh4+6GDrqUtioDCGjMoOL2ggqahOYqA7goXz9GgzLl2BYvQPF4h041m5oUHJLGiqU3JCGDjWP8voSNc955S2KXgGqaxS9Htb26NodlBbp2itVNmnbORZWadtH13Vpk7oybVLWpk+q6vRJUZ9GqSnUKCWNOqWiUqdUdCqV/FKtkt6qV7Jr9Upyr2bJLdYsqc26JbNatyR2a5e8cu2S1q5fsur1S1a/DSSp4AaS0nAPyai4hyR03EX2S+4i2y33ke2a28h2z8f4V4aP/43lsckevz/DXSyP7HRg6+S3YB2f7HCVdYSywVvAMkZZ556sopRl3gJgEacscitrSGWNW1nCKkuMZAWtrDCSBbyywFjmiGXOWKaYZcpMZqhlxkxmqGXGVMbIZcJUhthlzIKM0MuQBRnglwFrcksDuWVNbmkgPP/XjnDXRrjsyJUuwvN/7Qh3bYTLjlzpIjz/145w10a47AiPv+oiPP/bjvAyfeYJkwEAAFZQOCC6AAAAsBIAnQEqDgEOAT6RSKFNJaQjIiAoALASCWlu4XdhG0AJ7APfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtWAA/v9hwsR2///EOf1t/3KbARWQAAAAAAAAAAAA" alt="Fechar" />
        </button>
        <span data-testid="message" className={styles.message}>{message}</span>
      </> }
    </div>
  )
}

export default FormStatus

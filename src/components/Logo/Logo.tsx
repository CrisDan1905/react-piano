import styles from './Logo.module.css'

export const Logo = (): React.ReactElement => {
  return (
    <h1 className={styles.logo}>
      <span role='img' aria-label='metal hand emoji'>
        🤘
      </span>
      <span role='img' aria-label='musical keyboard hand emoji'>
        🎹
      </span>
      <span role='img' aria-label='musical notes hand emoji'>
        🎶
      </span>
    </h1>
  )
}

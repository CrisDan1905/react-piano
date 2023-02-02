import styles from './Footer.module.css'

export const Footer = (): React.ReactElement => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <a href='http://newline.co'>Newline.co</a>
      <br />
      {currentYear}
    </footer>
  )
}

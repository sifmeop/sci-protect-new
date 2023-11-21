import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { Main } from './main/Main'

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  )
}

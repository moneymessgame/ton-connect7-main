// import { Exchange } from "../Exchange"
// import { Params } from "../Params"
import { Params } from '../Params';
import { User } from "../User"
import styles from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={styles.header}>
      <User />
      <div className={styles.right}>
        {/* <Exchange />*/}
        <Params /> 
      </div>
    </header>
  )
}

import styles from "./Switch.module.scss"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = ({ ...props }: SwitchProps) => {
  return (
    <div className={styles.check}>
      <input {...props} type="checkbox" />
      <label htmlFor={props.id} />
    </div>
  )
}

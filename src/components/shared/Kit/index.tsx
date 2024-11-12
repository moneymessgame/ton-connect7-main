"use client"

import clsx from "clsx"
import { HTMLAttributes, ReactNode } from "react"
import styles from "./Kit.module.scss"

interface ElementProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const BaseElement = ({ children, className, ...props }: ElementProps) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  )
}

const Content = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(styles.content, className)} />
)

const Title = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(styles.title, className)} />
)

export { Content, Title }

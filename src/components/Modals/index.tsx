"use client"

import clsx from "clsx"
import { ReactNode } from "react"
import ReactDOM from "react-dom"
import { Icon } from "../Icon"
import styles from "./Modal.module.scss"

interface ModalProps {
  onClose: () => void
  children: ReactNode
  className?: string
  title?: string
  full?: boolean
}

export const Modal = ({
  onClose,
  children,
  className,
  title,
  full
}: ModalProps) => {
  const handleClose = () => {
    onClose()
  }

  const CloseButton = () => {
    return (
      <button className={styles.close} onClick={handleClose} type="button">
        <Icon icon="ph:x" />
      </button>
    )
  }

  const modalContent = (
    <div className={clsx(styles.overlay, { [styles.overlayFull]: full })}>
      <div className={clsx(styles.modal, className, { [styles.full]: full })}>
        <CloseButton />
        {title && <div className={styles.title}>{title}</div>}
        {children}
      </div>
      <div className={styles.overlayClose} onClick={handleClose}></div>
    </div>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")!
  )
}

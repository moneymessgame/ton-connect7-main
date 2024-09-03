"use client"

import { useSettingsStore } from "@/stores/settings"
import { useState } from "react"
import { Heading } from "../Heading"
import { Icon } from "../Icon"
import { Modal } from "../Modals"
import { Switch } from "../Switch"
import styles from "./Params.module.scss"

interface SwitcherProps {
  icon: string
  title: string
  desc?: string
  checked: boolean
  onChange: () => void
}

const Switcher = ({ icon, title, desc, checked, onChange }: SwitcherProps) => {
  return (
    <li className={styles.item}>
      <div className={styles.illu}>
				<Icon icon={icon} />
      </div>
      <div className={styles.txt}>
        <strong>{title}</strong>
        {desc && <small>{desc}</small>}
      </div>
      <Switch id={icon} checked={checked} onChange={onChange} />
    </li>
  )
}

export const Params = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    vibration,
    tapAnimation,
    numberAnimaton,
    toggleVibration,
    toggleTapAnimation,
    toggleNumberAnimation
  } = useSettingsStore()

  const settings: SwitcherProps[] = [
    {
      icon: "material-symbols-light:vibration-outline-rounded",
      title: "Vibration",
      desc: "Enable or disable vibration.",
      checked: vibration,
      onChange: toggleVibration
    },
    {
      icon: "ph:hand-tap-light",
      title: "Tap Animation",
      desc: "Enable or disable tap animation.",
      checked: tapAnimation,
      onChange: toggleTapAnimation
    },
    {
      icon: "tabler:numbers",
      title: "Coin Animation",
      desc: "Enable or disable number animation.",
      checked: numberAnimaton,
      onChange: toggleNumberAnimation
    }
  ]

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        <Icon icon="material-symbols:settings" />
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} className={styles.modal}>
          <Heading title="Settings" txt="Change your settings" />
          <ul className={styles.list}>
            {settings.map((setting) => (
              <Switcher key={setting.title} {...setting} />
            ))}
          </ul>
        </Modal>
      )}
    </>
  )
}

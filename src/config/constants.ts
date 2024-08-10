import { env } from "@/env"

export const REVALIDATE_TIME =
  env.NEXT_PUBLIC_NODE_ENV === "development" ? 0 : 60 * 60 * 24

export const HOST = process.env.NEXT_PUBLIC_BASE_URL

export const GSAP_DURATION = 1
export const GSAP_STAGGER = 0.15
export const GSAP_EASE = "none"
export const GSAP_ST_START = "top 90%"

export const DURATION_FEEDBACK = 2000
export const ENERGY_BASE = 500
export const ENERGY_CHARGE = 1
export const ENERGY_CHARGE_DELAY = 1000
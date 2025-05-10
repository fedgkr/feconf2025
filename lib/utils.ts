import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function adjustColor(color: string, amount: number): string {
  return (
    "#" +
    color.replace(/^#/, "").replace(/../g, (color) => {
      let num = Number.parseInt(color, 16) + amount
      num = Math.max(0, Math.min(255, num))
      const str = num.toString(16).padStart(2, "0")
      return str
    })
  )
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const initial = (): Theme =>
  (localStorage.getItem('theme') as Theme | null) ??
  (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(initial)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

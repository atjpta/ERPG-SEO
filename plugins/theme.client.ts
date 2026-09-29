import { themeChange } from 'theme-change'

const THEME_STORAGE_KEY = 'theme'

// Client-only: theme-change persists/restores the theme via localStorage,
// but on a visitor's very first visit there's nothing saved yet — without
// this, the page would silently stay on the "light" DaisyUI theme regardless
// of the visitor's OS preference. So on first visit only, resolve the OS
// preference once and seed both `data-theme` and localStorage with it; every
// visit after that (saved value present) is left alone and only changes when
// the visitor toggles the theme switcher.
function seedInitialTheme() {
  if (localStorage.getItem(THEME_STORAGE_KEY)) return

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = prefersDark ? 'dark' : 'light'

  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

export default defineNuxtPlugin(() => {
  seedInitialTheme()
  themeChange(false)
})

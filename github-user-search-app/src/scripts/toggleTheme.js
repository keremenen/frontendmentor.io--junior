const page = document.documentElement
const toggleThemeButton = document.querySelector('.header__theme-switcher')
const themeLabel = document.querySelector('.header__theme-label')

const setupTheme = (theme) => {
  if (theme === 'dark-theme') {
    page.classList.remove('light-theme')
    page.classList.add('dark-theme')
    themeLabel.innerText = 'LIGHT'
  } else {
    page.classList.remove('dark-theme')
    page.classList.add('light-theme')
    themeLabel.innerText = 'DARK'
  }
}

const initTheme = () => {
  page.classList.remove('dark-theme', 'light-theme')

  const currentDeviceTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark-theme'
    : 'light-theme'

  const currentLocalStorageTheme = localStorage.getItem('theme')

  if (currentLocalStorageTheme) {
    currentLocalStorageTheme === 'dark-theme'
      ? setupTheme('dark-theme')
      : setupTheme('light-theme')
    return
  }

  console.log(`device theme: ${currentDeviceTheme}`)
  console.log(`localSorage theme: ${currentLocalStorageTheme}`)

  currentDeviceTheme === 'dark-theme'
    ? setupTheme('dark-theme')
    : setupTheme('light-theme')
}

const handleToggleTheme = () => {
  // Set currentTheme variable to currently set theme
  const currentTheme = page.classList.contains('dark-theme')
    ? 'dark-theme'
    : 'light-theme'

  if (currentTheme === 'dark-theme') {
    //Change theme to light
    setupTheme('light-theme')
    localStorage.setItem('theme', 'light-theme')
  } else {
    //Change theme to light
    setupTheme('dark-theme')
    localStorage.setItem('theme', 'dark-theme')
  }
}

initTheme()
toggleThemeButton.addEventListener('click', handleToggleTheme)

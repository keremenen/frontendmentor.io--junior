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
  //Get current browser theme. If your browser doesn't have a theme option, it will get your device's theme.
  const currentDeviceTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 'dark-theme'
    : 'light-theme'

  //Get localStorage theme info
  const currentLocalStorageTheme = localStorage.getItem('theme')

  // If localStorage theme key exists, then select the appropriate theme and skip the selection based on browser or devices settings.
  if (currentLocalStorageTheme) {
    currentLocalStorageTheme === 'dark-theme'
      ? setupTheme('dark-theme')
      : setupTheme('light-theme')
    return
  }

  // If localStorage theme key does not exists, then setup appropriate theme based on browser or device settings.
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

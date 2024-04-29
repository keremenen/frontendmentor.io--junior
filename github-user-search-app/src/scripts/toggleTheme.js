const page = document.documentElement
const toggleThemeButton = document.querySelector('.header__theme-switcher')

const handleToggleTheme = () => {
  // Set currentTheme variable to currently set theme
  const currentTheme = page.classList.contains('dark-theme')
    ? 'dark-theme'
    : 'light-theme'

  if (currentTheme === 'dark-theme') {
    //Change theme to light
    page.classList.remove('dark-theme')
    page.classList.add('light-theme')
  } else {
    //Change theme to light
    page.classList.remove('light-theme')
    page.classList.add('dark-theme')
  }
}

toggleThemeButton.addEventListener('click', handleToggleTheme)

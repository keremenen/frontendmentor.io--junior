const html = document.documentElement

window.addEventListener('load', () => {
  setTimeout(() => {
    html.classList.add('transition-enabled')
  }, 300)
})

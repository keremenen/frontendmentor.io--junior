const form = document.querySelector('.search-form')
const input = document.querySelector('.search-form__input')

const userFullName = document.querySelector('.user-header__user-name')
const userLogin = document.querySelector('.user-header__user-username')
const userAvatar = document.querySelector('#user-avatar')

const userJoinedTime = document.querySelector('.user-header__user-joined-time')
const userBio = document.querySelector('.user-bio')

const userRepos = document.querySelector('#user-repos')
const userFollowers = document.querySelector('#user-followers')
const userFollowing = document.querySelector('#user-following')
const userLocation = document.querySelector('#user-location')

const userWebsite = document.querySelector('#user-website')
const userTwitter = document.querySelector('#user-twitter')
const userCompany = document.querySelector('#user-company')

const handleFormSubmit = async (e) => {
  e.preventDefault()
  const inputValue = input.value
  form.classList.remove('search-form__error')
  const userData = await fetchUserInfo(inputValue)

  userData && updateDOM(userData)
}

const fetchUserInfo = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`)

    if (!response.ok) {
      form.classList.add('search-form__error')
      console.log('username not found')
      return
    }
    const userData = await response.json()
    return userData
  } catch (error) {
    console.log('Cant connect to GitHUB API')
    return
  }
}

const parseDate = (date) => {
  //Parse date to array format eg: ['2023', '04, '18']
  const parsedDate = date.split('T')[0].split('-')

  const [year, month, day] = parsedDate

  // Convert month number to shortened english text version eg: 04 > 'May'
  const tempDate = new Date(year, month - 1, day)
  const shortMonth = tempDate.toLocaleString('en', { month: 'short' })

  return [day, shortMonth, year]
}

const checkEmptyUserLinks = () => {
  const userLinks = document.querySelectorAll('.user-links__single')
  userLinks.forEach((link) =>
    link.classList.remove('user-links__not-available')
  )

  userLinks.forEach((link) => {
    if (link.innerText === 'Not Available') {
      link.classList.add('user-links__not-available')
    }
  })
}

const addUserLinks = (userInfo) => {
  const userWebsiteHref = document.querySelector('#user-link__website')
  const userTwitterHref = document.querySelector('#user-link__twitter')
  userInfo.blog && (userWebsiteHref.href = userInfo.blog)
  userInfo.twitter_username &&
    (userTwitterHref.href = userInfo.twitter_username)
}

const updateDOM = (userInfo) => {
  const [day, month, year] = parseDate(userInfo.created_at)

  userLogin.innerText = `@${userInfo.login}`
  userJoinedTime.innerText = `Joined ${day} ${month} ${year}`
  userRepos.innerText = userInfo.public_repos
  userFollowers.innerText = userInfo.followers
  userFollowing.innerText = userInfo.following

  // If user has not set name use his login insead
  userInfo.name
    ? (userFullName.innerText = userInfo.name)
    : (userFullName.innerText = userInfo.login)

  userInfo.avatar_url
    ? (userAvatar.src = userInfo.avatar_url)
    : (userAvatar.src = '../assets/user-profile-image-placeholder.png')

  // If user has not set bio, use placeholder text instead
  userInfo.bio
    ? (userBio.innerText = userInfo.bio)
    : (userBio.innerText = 'This user has no bio.')

  // If user has not set location, use 'Not Available' value instead
  userInfo.location
    ? (userLocation.innerText = userInfo.location)
    : (userLocation.innerText = 'Not Available')

  // If user has not set website, use 'Not Available' value instead
  userInfo.blog
    ? (userWebsite.innerText = userInfo.blog)
    : (userWebsite.innerText = 'Not Available')

  // If user has not set twitter, use 'Not Available' value instead
  userInfo.twitter_username
    ? (userTwitter.innerText = userInfo.twitter_username)
    : (userTwitter.innerText = 'Not Available')

  // If user has not set company, use 'Not Available' value instead
  userInfo.company
    ? (userCompany.innerText = userInfo.company)
    : (userCompany.innerText = 'Not Available')

  addUserLinks(userInfo)
  checkEmptyUserLinks()
}

form.addEventListener('submit', handleFormSubmit)

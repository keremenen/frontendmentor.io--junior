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

const userData = {
  login: 'keremenen',
  avatar_url: 'https://avatars.githubusercontent.com/u/131199812?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/keremenen',
  html_url: 'https://github.com/keremenen',
  followers_url: 'https://api.github.com/users/keremenen/followers',
  following_url:
    'https://api.github.com/users/keremenen/following{/other_user}',
  gists_url: 'https://api.github.com/users/keremenen/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/keremenen/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/keremenen/subscriptions',
  organizations_url: 'https://api.github.com/users/keremenen/orgs',
  repos_url: 'https://api.github.com/users/keremenen/repos',
  events_url: 'https://api.github.com/users/keremenen/events{/privacy}',
  received_events_url: 'https://api.github.com/users/keremenen/received_events',
  type: 'User',
  site_admin: false,
  name: 'Przemysław Kitowski',
  company: null,
  blog: '',
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 12,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2023-04-18T19:00:27Z',
  updated_at: '2024-04-29T16:32:02Z',
}

const handleFormSubmit = async (e) => {
  e.preventDefault()
  const inputValue = input.value
  // const userData = await fetchUserInfo(inputValue)

  updateDOM(userData)
}

const fetchUserInfo = async (user) => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}`)
    const userData = await response.json()

    if (!response.ok) {
      console.log('error')
    }

    updateDOM(userData)
  } catch (error) {
    console.log(error)
  }
  return userData
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

  userLinks.forEach((link) => {
    if (link.innerText === 'Not Available') {
      link.classList.add('user-links__not-available')
    }
  })
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

  checkEmptyUserLinks()
}

form.addEventListener('submit', handleFormSubmit)

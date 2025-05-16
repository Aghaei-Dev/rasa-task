import battery from '~/assets/imgs/battery.png'
import invite from '~/assets/imgs/invite.png'
import tick from '~/assets/imgs/tick.png'
import wallet from '~/assets/imgs/wallet.png'
import youtube from '~/assets/imgs/youtube.png'

export const menuItems = [
  { id: 1, title: 'خانه', to: '/' },
  { id: 2, title: 'پست ها', to: '/posts' },
  { id: 3, title: 'پست جدید', to: '/new-post' },
  { id: 4, title: 'آمار بازدید', to: '/stats' },
]
export const sliderItems = [
  { id: 1, img: battery, alt: 'battery' },
  { id: 2, img: invite, alt: 'invite' },
  { id: 3, img: tick, alt: 'tick' },
  { id: 4, img: wallet, alt: 'wallet' },
  { id: 5, img: youtube, alt: 'youtube' },
]
export const eachPage = [5, 10, 20, 50, 100]

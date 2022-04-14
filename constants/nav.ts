import { FiCompass, FiCornerUpLeft, FiHome, FiSettings, FiStar, FiTrendingUp } from 'react-icons/fi'

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Contact', href: '/contact' },
  { label: 'Support', href: '/support' },
]

export const FOOTER_NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Contact', href: '/contact' },
  { label: 'Support', href: '/support' },
  { label: 'Admin', href: '/admin/accommodations', protected: true },
]

export const ADMIN_NAV_ITEMS = [
  { name: 'Home', icon: FiHome, href: '/admin' },
  { name: 'Accommodations', icon: FiTrendingUp, href: '/admin/accommodations' },
  { name: 'Explore', icon: FiCompass, href: '/admin/explore' },
  { name: 'Favourites', icon: FiStar, href: '/admin/favourites' },
  { name: 'Settings', icon: FiSettings, href: '/admin/settings' },
  { name: 'Go back', icon: FiCornerUpLeft, href: '/' },
]

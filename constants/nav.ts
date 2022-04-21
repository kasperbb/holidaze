import { FiBookOpen, FiCornerUpLeft, FiHome, FiMessageSquare } from 'react-icons/fi'

import { MdBed } from 'react-icons/md'

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
  { name: 'Accommodations', icon: MdBed, href: '/admin/accommodations' },
  { name: 'Bookings', icon: FiBookOpen, href: '/admin/bookings' },
  { name: 'Messages', icon: FiMessageSquare, href: '/admin/messages' },
  { name: 'Go back', icon: FiCornerUpLeft, href: '/' },
]

import { FiBookOpen, FiCornerUpLeft, FiHome, FiMessageSquare } from 'react-icons/fi'

import { MdBed } from 'react-icons/md'
import { routes } from './routes'

export const NAV_ITEMS = [
  { label: 'Home', href: routes.base },
  { label: 'Accommodations', href: routes.accommodations.base },
  { label: 'Contact', href: routes.contact.base },
]

export const FOOTER_NAV_ITEMS = [
  { label: 'Home', href: routes.base },
  { label: 'Accommodations', href: routes.accommodations.base },
  { label: 'Contact', href: routes.contact.base },
  { label: 'Admin', href: routes.admin.base, protected: true },
]

export const ADMIN_NAV_ITEMS = [
  { name: 'Home', icon: FiHome, href: routes.admin.base },
  { name: 'Accommodations', icon: MdBed, href: routes.admin.accommodations.base },
  { name: 'Bookings', icon: FiBookOpen, href: routes.admin.bookings.base },
  { name: 'Messages', icon: FiMessageSquare, href: routes.admin.messages.base },
  { name: 'Back to frontpage', icon: FiCornerUpLeft, href: routes.base },
]

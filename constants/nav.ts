import { FiBookOpen, FiCornerUpLeft, FiMessageSquare, FiTrendingUp } from 'react-icons/fi'

import { IconType } from 'react-icons'
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

export interface AdminNavItem {
  name: string
  icon: IconType
  href: string
  protected?: boolean
  fallback?: Pick<AdminNavItem, 'name' | 'icon' | 'href'>
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { name: 'Dashboard', icon: FiTrendingUp, href: routes.admin.base },
  {
    name: 'Accommodations',
    icon: MdBed,
    href: routes.admin.accommodations.base,
    protected: true,
    fallback: {
      name: 'My Accommodations',
      icon: MdBed,
      href: routes.admin.accommodations.my,
    },
  },
  {
    name: 'Bookings',
    icon: FiBookOpen,
    href: routes.admin.bookings.base,
    protected: true,
    fallback: {
      name: 'My Bookings',
      icon: FiBookOpen,
      href: routes.admin.bookings.my,
    },
  },
  { name: 'Messages', icon: FiMessageSquare, href: routes.admin.messages.base, protected: true },
  { name: 'Back to frontpage', icon: FiCornerUpLeft, href: routes.base },
]

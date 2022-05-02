export const routes = {
  base: '/',
  auth: {
    signIn: '/auth/sign-in',
    register: '/auth/register',
  },
  admin: {
    base: '/admin',
    accommodations: {
      base: '/admin/accommodations',
      add: '/admin/accommodations/add',
      edit: '/admin/accommodations/edit',
    },
    bookings: {
      base: '/admin/bookings',
    },
    messages: {
      base: '/admin/messages',
    },
  },
  accommodations: {
    base: '/accommodations',
  },
  contact: {
    base: '/contact',
  },
}

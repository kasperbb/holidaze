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
      my: '/admin/accommodations/my',
      add: '/admin/accommodations/add',
      edit: '/admin/accommodations/edit',
    },
    bookings: {
      base: '/admin/bookings',
      my: '/admin/bookings/my',
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

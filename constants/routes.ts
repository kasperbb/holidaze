export const routes = {
  base: '/',
  auth: {
    signIn: '/auth/sign-in',
    register: '/auth/register',
  },
  admin: {
    accommodations: {
      base: '/admin/accommodations',
      add: '/admin/accommodations/add',
      edit: '/admin/accommodations/edit',
    },
    base: '/admin/accommodations',
  },
  accommodations: {
    base: '/accommodations',
  },
}

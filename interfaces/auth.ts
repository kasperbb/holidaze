export namespace Auth {
  export interface User {
    email: string
    password: string
  }
}

export namespace Public {
  export interface User {
    id: string
    email: string
    role: 'admin' | 'authenticated'
  }
}

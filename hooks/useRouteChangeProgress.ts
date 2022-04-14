import Progress from 'nprogress'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function useRouteChangeProgress() {
  const router = useRouter()

  useEffect(() => {
    Progress.configure({ showSpinner: false })

    const routeChangeStart = () => Progress.start()
    const routeChangeComplete = () => Progress.done()

    router.events.on('routeChangeStart', routeChangeStart)
    router.events.on('routeChangeComplete', routeChangeComplete)
    router.events.on('routeChangeError', routeChangeComplete)

    return () => {
      router.events.off('routeChangeStart', routeChangeStart)
      router.events.off('routeChangeComplete', routeChangeComplete)
      router.events.off('routeChangeError', routeChangeComplete)
    }
  }, [router.events])
}

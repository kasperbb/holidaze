import { MutableRefObject, useEffect } from 'react'

export function useKeyPress(targetKey: string, fn: Function, ref?: MutableRefObject<HTMLDivElement | null>) {
  function downHandler({ key }: KeyboardEvent) {
    if (key === targetKey && document.activeElement === ref?.current) {
      fn()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

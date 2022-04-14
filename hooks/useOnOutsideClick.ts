import { RefObject, useEffect } from 'react'

/**
 * Run a function when you click outside of the specified ref object(s).
 *
 * @param {function} func
 * @param {RefObject<HTMLElement>[]} refs
 */
export function useOnOutsideClick<F extends Function, T extends RefObject<HTMLElement>[]>(func: F, refs: T) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (Array.isArray(refs)) {
        for (let i = 0; i < refs.length; i++) {
          const { current } = refs[i]
          if (current && current.contains(event.target as Node)) {
            return
          }
        }

        return func()
      }

      throw new Error('useOnOutsideClick only accepts an array of ref objects')
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [func, refs])
}

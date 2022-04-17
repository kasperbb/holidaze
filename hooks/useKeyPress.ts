import { useEffect } from "react";

export function useKeyPress(targetKey: string, fn: Function) {
    function downHandler({ key }: KeyboardEvent) {
      if (key === targetKey) {
        fn()
      }
    }
    
    useEffect(() => {
      window.addEventListener("keydown", downHandler)
      
      return () => {
        window.removeEventListener("keydown", downHandler)
      };
    }, [])
  }
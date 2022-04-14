import 'react-image-lightbox/style.css'

import React, { Dispatch, SetStateAction } from 'react'

import ReactImageLightbox from 'react-image-lightbox'

interface LightboxProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
}

export function Lightbox({ isOpen, onClose, images, activeIndex = 0, setActiveIndex }: LightboxProps) {
  return (
    <>
      {isOpen && (
        <ReactImageLightbox
          mainSrc={images[activeIndex]}
          nextSrc={images[(activeIndex + 1) % images.length]}
          prevSrc={images[(activeIndex + images.length - 1) % images.length]}
          onCloseRequest={onClose}
          onMovePrevRequest={() => setActiveIndex(prev => (prev + images.length - 1) % images.length)}
          onMoveNextRequest={() => setActiveIndex(prev => (prev + 1) % images.length)}
        />
      )}
    </>
  )
}

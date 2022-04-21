import 'react-image-lightbox/style.css'

import React, { Dispatch, SetStateAction } from 'react'

import { Accommodation } from '@interfaces/accommodation'
import ReactImageLightbox from 'react-image-lightbox'

interface LightboxProps extends Pick<Accommodation, 'images'> {
  isOpen: boolean
  onClose: () => void
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
}

export function Lightbox({ isOpen, onClose, images, activeIndex = 0, setActiveIndex }: LightboxProps) {
  return (
    <>
      {isOpen && (
        <ReactImageLightbox
          mainSrc={images[activeIndex].url}
          nextSrc={images[(activeIndex + 1) % images.length].url}
          prevSrc={images[(activeIndex + images.length - 1) % images.length].url}
          onCloseRequest={onClose}
          onMovePrevRequest={() => setActiveIndex(prev => (prev + images.length - 1) % images.length)}
          onMoveNextRequest={() => setActiveIndex(prev => (prev + 1) % images.length)}
        />
      )}
    </>
  )
}

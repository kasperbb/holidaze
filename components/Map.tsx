import ReactMapGL, { FullscreenControl, Marker, MarkerProps, NavigationControl, Popup, PopupProps } from 'react-map-gl'

import { CSSProperties } from 'react'
import maplibregl from 'maplibre-gl'
import { useToken } from '@chakra-ui/react'

interface MapProps {
  lat?: number
  long?: number
  zoom?: number
  style?: CSSProperties | undefined
  popupList?: PopupProps[]
  markerList?: MarkerProps[]
}

export function Map({ lat = 60.3914191, long = 5.3248788, zoom = 13, style, popupList, markerList }: MapProps) {
  return (
    <ReactMapGL
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets/style.json?key=aWayibDnh8VTw3ovokeu"
      attributionControl={false}
      initialViewState={{
        latitude: lat,
        longitude: long,
        zoom: zoom,
      }}
      style={{ height: 330, borderRadius: useToken('radii', '2xl'), boxShadow: useToken('shadows', 'primary'), border: '10px solid white', ...style }}
    >
      {popupList &&
        popupList.map(popup => (
          <Popup key={popup.latitude + popup.longitude} {...popup}>
            {popup.children}
          </Popup>
        ))}

      {markerList &&
        markerList.map(marker => (
          <Marker key={marker.latitude + marker.longitude} {...marker}>
            {marker.children}
          </Marker>
        ))}

      <NavigationControl />
      <FullscreenControl />
    </ReactMapGL>
  )
}

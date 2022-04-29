import { CSSProperties, forwardRef } from 'react'
import ReactMapGL, { FullscreenControl, MapRef, Marker, MarkerProps, NavigationControl, Popup, PopupProps } from 'react-map-gl'

import maplibregl from 'maplibre-gl'
import { useToken } from '@chakra-ui/react'

interface MapProps {
  lat?: number
  long?: number
  zoom?: number
  style?: CSSProperties | undefined
  popupList?: PopupProps[]
  markerList?: MarkerProps[]
  onClick?: ((e: mapboxgl.MapLayerMouseEvent) => void) | undefined
  hasBorder?: boolean
}

export const Map = forwardRef<MapRef, MapProps>(({ lat = 60.3914191, long = 5.3248788, zoom = 13, style, popupList, markerList, hasBorder, ...rest }, ref) => {
  const xlBroderRadius = useToken('radii', '2xl')
  const mdBorderRadius = useToken('radii', 'md')

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
      style={{
        height: 330,
        borderRadius: hasBorder ? xlBroderRadius : mdBorderRadius,
        boxShadow: useToken('shadows', 'primary'),
        border: hasBorder ? '10px solid white' : 'none',
        ...style,
      }}
      ref={ref}
      {...rest}
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
})

Map.displayName = 'Map'

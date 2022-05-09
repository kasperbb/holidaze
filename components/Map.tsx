import { Alert, AlertDescription, AlertIcon, AlertTitle, HStack, chakra, useToken } from '@chakra-ui/react'
import { CSSProperties, forwardRef, useState } from 'react'
import ReactMapGL, { FullscreenControl, MapRef, Marker, MarkerProps, NavigationControl, Popup, PopupProps } from 'react-map-gl'

import maplibregl from 'maplibre-gl'

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
  const [error, setError] = useState<string | null>(null)
  const xlBroderRadius = useToken('radii', '2xl')
  const mdBorderRadius = useToken('radii', 'md')
  const shadow = useToken('shadows', 'primary')

  return (
    <>
      {error ? (
        <>
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <HStack mt={4}>
            <chakra.dt minWidth={10}>Latitude:</chakra.dt>
            <chakra.dd fontWeight="semibold">{lat}</chakra.dd>
          </HStack>
          <HStack>
            <chakra.dt minWidth={10}>Longitude:</chakra.dt>
            <chakra.dd fontWeight="semibold">{long}</chakra.dd>
          </HStack>
        </>
      ) : (
        <ReactMapGL
          onError={({ error }) => setError(error.message)}
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
            boxShadow: shadow,
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
      )}
    </>
  )
})

Map.displayName = 'Map'

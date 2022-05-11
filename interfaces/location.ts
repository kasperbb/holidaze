export namespace Location {
  export interface Response {
    type: string
    query: string[]
    features: Feature[] | undefined
    attribution: string
  }

  interface Feature {
    id: string
    type: string
    place_type: string[]
    relevance: number
    properties: {
      wikidata: string
    }
    text: string
    place_name: string
    bbox: number[]
    center: LongLat
    geometry: Geometry
    context: {
      id: string
      wikidata: string
      text: string
    }[]
  }

  interface Geometry {
    type: string
    coordinates: number[]
  }

  export type LongLat = [longitude: number, latitude: number]
}

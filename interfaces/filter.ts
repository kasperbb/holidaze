import { AccommodationFilter } from './accommodation'

export namespace Filter {
  export enum ActionType {
    SET_SEARCH = 'SET_SEARCH',
    SET_FROM = 'SET_FROM',
    SET_TO = 'SET_TO',
    SET_PRICE_RANGE = 'SET_PRICE_RANGE',
    SET_RATING = 'SET_RATING',
  }

  export interface State extends Omit<AccommodationFilter, 'from' | 'to'> {
    dateRange: [from: Date | undefined, to: Date | undefined] | undefined[]
  }

  export interface Action {
    type: ActionType
    payload: any
  }
}

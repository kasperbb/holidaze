export namespace Filter {
  export enum ActionType {
    SET_SEARCH = 'SET_SEARCH',
    SET_FROM = 'SET_FROM',
    SET_TO = 'SET_TO',
    SET_PRICE_RANGE = 'SET_PRICE_RANGE',
    SET_RATING = 'SET_RATING',
  }

  export interface State {
    search: string
    from: Date
    to: Date
    priceRange: [from: number, to: number]
    rating: number
  }
  
  export interface Action {
    type: ActionType;
    payload: any;
  }
}
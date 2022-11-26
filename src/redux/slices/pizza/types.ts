export type Item = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: number[]
    size: number[]
    rating: number
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface IPizzaState {
    items: Item[]
    status: Status
}


export type SearchPizzaParams = {
    order: string
    sortBy: string
    category: string
    search: string
    currentPage: string
}
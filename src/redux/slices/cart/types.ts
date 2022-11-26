export type CartItem = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}

export interface IState  {
    totalPrice: number
    items: CartItem[]
}

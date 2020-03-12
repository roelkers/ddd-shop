import Product from "../order/product";
import Domain from "../domain";

class Stock extends Domain {

    private product: Product
    private quantity: number;

    constructor(product: Product, quantity: number) {
        super()
        if (quantity < 0) throw new Error('quantity must be > 0')
        this.product = product;
        this.quantity = quantity
    }

    refill(quantity: number) {
        if (quantity < 0) throw new Error('quantity must be > 0')
        this.quantity += quantity
    }

    takeStock(quantity: number) {
        if (quantity > this.quantity) throw new Error('quantity insufficient')
        this.quantity -= quantity
    }

}
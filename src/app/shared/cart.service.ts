import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public productList = new BehaviorSubject<any>([])
  public cartItems = [];
  constructor() { }

  getproduct() {
    return this.productList.asObservable();
  }

  addProduct(product: any) {

    this.cartItems.push(product);
    this.productList.next(this.cartItems);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItems.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartElement() {
    this.cartItems = [];
    this.productList.next(this.cartItems);
  }

  removeCartItem(product: number) {
    this.cartItems.map((a: any, index: any) => {
      if (product == a.id) {
        this.cartItems.splice(index, 1);
      }
      this.productList.next(this.cartItems);
    });

  }
}

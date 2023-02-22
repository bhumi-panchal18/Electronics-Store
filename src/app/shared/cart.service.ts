import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, mapTo, Observable, Subject } from 'rxjs';
import { applianceModel, CartModel } from '../Modal/applianceModel';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../Modal/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public productList = new BehaviorSubject<any>([])

  public cartItems = [];
  constructor(private http: HttpClient) { }

  getproduct() {
    return this.productList.asObservable();
  }
  apiUrl1: string='http://localhost:3000/user'
  apiUrl: string = 'http://localhost:3000/cart';
  getCartProducts(id:string) {
    return this.http.get<CartModel>(`${this.apiUrl1}/${id}/cart`);
  }
  
  addAppliance(userid,cartItem){
    return this.http.post(`${this.apiUrl}/${userid}/cart`,cartItem);
  }

  emptyCartItem(id:string){
    return this.http.delete(`${this.apiUrl1}/${id}/cart`);
  }

  removeCartItemByID(id: any) {
    return this.http.delete(this.apiUrl+'/'+id);
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

  removeCartItem(product: any) {
    return this.http.delete<UserModel>(this.apiUrl + '/' + product.cart);
  }
    
}

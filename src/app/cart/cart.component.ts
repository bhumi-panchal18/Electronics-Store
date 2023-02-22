import { Component, OnInit, ViewChild } from '@angular/core';
import { applianceModel, CartModel } from '../Modal/applianceModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, Subscription, takeUntil, ReplaySubject } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from '../shared/cart.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ApiService]
})


export class CartComponent implements OnInit {
  state: Observable<object>;
  destroy: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ["id", "imgPath", "name", "types", "quantity", "amount"];
  public products;

  constructor(private http: HttpClient, 
    private route: Router, 
    private api: ApiService, 
    private cart: CartService,
    private userService:UserService) {
  }


  ngOnInit(): void {
    let user = JSON.parse(sessionStorage.getItem('userrole'));
    this.cart.getCartProducts(user.id).subscribe(res => {
      this.products = res
    });
  }

  goToProducts() {
    this.route.navigate(['store']);
  }

  emptyCart() {
    let user = JSON.parse(sessionStorage.getItem('userrole'));
    
    this.cart.emptyCartItem(user.id).subscribe();
  }

  deleteCartItem(id: any) {
    this.cart.removeCartItemByID(id).subscribe();
    this.table.renderRows();
  }
  getTotalCost() {
    return this.products.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  onChange($event, price) {
    price *= $event.target.value
    return price
  }
}
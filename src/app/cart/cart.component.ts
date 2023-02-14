import { Component, OnInit, ViewChild } from '@angular/core';
import { applianceModel, cartModel } from '../Modal/applianceModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, Subscription, takeUntil, ReplaySubject } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CartService } from '../shared/cart.service';

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
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatPaginator;

  displayedColumns: string[] = ["id", "name", "types", "price", "quant", "imgPath", "action"];
  cartData: applianceModel[] = [];
  constructor(private http: HttpClient, private route: Router, private activatedRoute: ActivatedRoute, private api: ApiService, private cart: CartService) { }

  public products!: any[];
  ngOnInit(): void {
    this.cart.getproduct().subscribe(res => {
      console.log(this.products);
      this.products = res;
    });
  }

  goToProducts() {
    this.route.navigate(['store']);
  }

  emptyCart() {
    this.cart.removeCartElement();
  }

  deleteCartItem(item: any) {
    this.cart.removeCartItem(item.id);
    this.table.renderRows();
  }

}
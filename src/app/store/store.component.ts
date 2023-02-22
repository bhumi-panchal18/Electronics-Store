import { Component, OnInit, ViewChild } from '@angular/core';
import { applianceModel } from '../Modal/applianceModel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogContentExampleDialog } from '../app.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class StoreComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatPaginator;
  appliancesData!: applianceModel[];
  finalApplianceData: any;


  constructor(public dialog: MatDialog, private api: ApiService, private route: Router, private cart: CartService, private _snackBar: MatSnackBar) {
  }
  displayColumns: string[] = ["id", "imgPath", "name", "types", "price", "quant", "desc", "techspec"];
  columnsToDisplayWithExpand = [...this.displayColumns, 'expand'];
  expandedElement: applianceModel | null;
  types1: Type[] = [
    { value: '0', viewValue: 'All' },
    { value: '1', viewValue: 'Laptop & Accessories' },
    { value: '2', viewValue: 'TV & Home Entertainment' },
    { value: '3', viewValue: 'Audio' },
    { value: '4', viewValue: 'Camera' },
    { value: '5', viewValue: 'Computer Peripherals' },
    { value: '6', viewValue: 'Musical Instruments' },
    { value: '7', viewValue: 'Mobile' }
  ];
  ngOnInit(): void {

    this.loadAppliance();
  }

  openPopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(response => {
      this.loadAppliance();
    })
  }



  loadAppliance() {
    this.api.getAllAppliances().subscribe(response => {
      this.appliancesData = response;
      this.finalApplianceData = new MatTableDataSource<applianceModel>(this.appliancesData);
      this.finalApplianceData.paginator = this.paginator;
      this.finalApplianceData.sort = this.sort;
      this.finalApplianceData.filterPredicate = function (record, filter) {
        return record.types.toLocaleLowerCase() === filter.toLocaleLowerCase();
      }
    }
    );
  }

  editAppliance(id: number) {
    this.openPopup(id);
  }

  removeAppliance(id: number) {
    // this.api.removeAppliancebyid(id).subscribe(response => {
    //   this.loadAppliance();
    // });
  }

  defaultValue = "All";

  filterChange(event: any) {
    const filterValue = event.value;
    this.finalApplianceData.filter = filterValue.trim().toLowerCase();
    if (filterValue == 'All') {
      this.loadAppliance();
    }
  }
  horizontalPosition1: MatSnackBarHorizontalPosition = 'end';
  verticalPosition1: MatSnackBarVerticalPosition = 'top';
  addToCart(item: any) {
    if (item.quant >=1) {
      let user = JSON.parse(sessionStorage.getItem('userrole'));
      let amount = JSON.parse(item.price)
      var obj1 = { "userId": user.id, "itemId": item.id, "quantity": this.quantity, "amount": this.price * this.quantity * amount };
      var obj = Object.assign(obj1, item);
      delete obj.id
      delete obj.quant
      delete obj.price
      this.cart.addAppliance(user, obj).subscribe();
      const remaining_qty = (item.quant - obj.quantity)
      delete item.quant
      var item1 = { "quant": remaining_qty }
      var remainqty = Object.assign(item1, item);
      this.api.updateAppliancebyqty(item.id, remainqty).subscribe(res => {
        this.loadAppliance();
      })
      this._snackBar.open("Successfully bought the product!", 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition1,
        verticalPosition: this.verticalPosition1
      })
    } else {
      this._snackBar.open("Product Out of Stock!", 'Close', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition1,
        verticalPosition: this.verticalPosition1
      })
  }

  }
  quantity: number = 1
  price: number = 1

  quantityChange(event) {
      this.quantity = 1
      this.quantity = event.target.value;
     }
}


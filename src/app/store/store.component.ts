import { Component, OnInit, ViewChild } from '@angular/core';
import { applianceModel } from '../Modal/applianceModel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']

})
export class StoreComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatPaginator;
  appliancesData!: applianceModel[];
  finalApplianceData: any;
  constructor(public dialog: MatDialog, private api: ApiService, private route: Router, private cart: CartService) { }
  displayColumns: string[] = ["id", "name", "types", "price", "quant", "desc", "techspec", "imgPath", "action"];
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
    this.api.removeAppliancebyid(id).subscribe(response => {
      this.loadAppliance();
    });
  }

  defaultValue = "All";

  filterChange(event: any) {
    const filterValue = event.value;
    this.finalApplianceData.filter = filterValue.trim().toLowerCase();
    if (filterValue == 'All') {
      this.loadAppliance();
    }
  }

  addToCart(item: any) {
    if (item.quant != 0) {
      this.cart.addProduct(item);
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { Appliance, Appliances } from './store.model';

import {MatDialog} from '@angular/material/dialog';
import { ApplianceDetailComponent } from './appliance-detail/appliance-detail.component';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  appliances = Appliances;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAppliance(){
    const dialogRef = this.dialog.open(ApplianceDetailComponent,{
      data: this.appliances
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

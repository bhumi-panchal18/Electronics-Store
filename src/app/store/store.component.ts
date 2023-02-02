import { Component, OnInit } from '@angular/core';
import { Appliances } from './store.model';

import {MatDialog} from '@angular/material/dialog';
import { ApplianceDetailComponent } from './appliance-detail/appliance-detail.component';
import { applianceData } from '../Modal/applianceModel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']

})
export class StoreComponent implements OnInit {
  applianceData: applianceData[];
  appliances = Appliances;
  constructor(public dialog: MatDialog, private api:ApiService) { }
  displayColumns : string[] = ["id","name","types","desc","price","techspec","quant","imgPath","action"];


  ngOnInit(): void {
    this.loadAppliance();
  }
  openAppliance(){
    const dialogRef = this.dialog.open(ApplianceDetailComponent,{
      data: this.appliances
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
 
  openPopup(id:any){
    const _popup = this.dialog.open(PopupComponent,{
      width: '500px',
      data:{
        id:id
      }
    })

    _popup.afterClosed().subscribe(response => {
      this.loadAppliance();
    })
  }


  loadAppliance(){
    this.api.getAllAppliances().subscribe(response=>{
      this.applianceData=response;
    }
    );
  }

  editAppliance(id:number){
    this.openPopup(id);
  }

  removeAppliance(id: any){
    this.api.removeAppliancebyid(id).subscribe(response =>{
      this.loadAppliance();
    });
  }
}

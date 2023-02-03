import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplianceDetailComponent } from './appliance-detail/appliance-detail.component';
import { applianceModel } from '../Modal/applianceModel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import { MatTab } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']

})
export class StoreComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  appliancesData!: applianceModel[];
  finalApplianceData: any;
  constructor(public dialog: MatDialog, private api: ApiService) { }
  displayColumns: string[] = ["id", "name", "types", "desc", "price", "techspec", "quant", "imgPath", "action"];

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
    }
    );
  }

  editAppliance(id: number) {
    this.openPopup(id);
  }

  removeAppliance(id: any) {
    this.api.removeAppliancebyid(id).subscribe(response => {
      this.loadAppliance();
    });
  }

}

import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';

import {MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  editApplianceData: any;
  constructor(private builder: FormBuilder, private api: ApiService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) { }
  typesList: string[] = ['Mobile', 'Laptop & Accessories', 'TV & Home Entertainment', 'Audio', 'Camera', 'Computer Peripherials', 'Musical Instruments']
    
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
  types: Type[] = [
    { value: '0', viewValue: 'Mobile' },
    { value: '1', viewValue: 'Laptop & Accessories' },
    { value: '2', viewValue: 'TV & Home Entertainment' },
    { value: '3', viewValue: 'Audio' },
    { value: '4', viewValue: 'Camera' },
    { value: '5', viewValue: 'Computer Peripherals' },
    { value: '6', viewValue: 'Musical Instruments' }
  ];
  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.getAppliancebyid(this.data.id).subscribe(response => {
        this.editApplianceData = response;
        this.applianceForm.setValue({
          id: this.editApplianceData.id,
          name: this.editApplianceData.name,
          types: this.editApplianceData.types,
          desc: this.editApplianceData.desc,
          price: this.editApplianceData.price,
          techspec: this.editApplianceData.techspec,
          quant: this.editApplianceData.quant,
          imgPath: this.editApplianceData.imgPath
        });
      });
    }
  }

  applianceForm = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', Validators.required),
    types: this.builder.control('', Validators.required),
    desc: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    techspec: this.builder.control('', Validators.required),
    quant: this.builder.control('', Validators.required),
    imgPath: this.builder.control('', Validators.required),
  })

  saveAppliance() {
    if (this.applianceForm.valid) {
      const editId = this.applianceForm.getRawValue().id;
      if (editId != '' && editId != null) {
        this.api.updateAppliancebyid(editId, this.applianceForm.getRawValue()).subscribe(response => {
          this.closepopup();
          this._snackBar.open("Updated Successfully!",'Close', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        });

      } else {
        this.api.createAppliance(this.applianceForm.value).subscribe(response => {
          this.closepopup();
          this._snackBar.open("Saved Successfully!",'Close', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition
          });
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}

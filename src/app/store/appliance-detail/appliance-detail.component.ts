import { Component, OnInit,Input,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appliance } from '../store.model';
interface Type{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-appliance-detail',
  templateUrl: './appliance-detail.component.html',
  styleUrls: ['./appliance-detail.component.css']
})
export class ApplianceDetailComponent implements OnInit {
  @Input() details: Appliance;
  hide = true;
  typesList: string[]=['Mobile','Laptop & Accessories','TV & Home Entertainment','Audio','Camera','Computer Peripherials','Musical Instruments']
  types: Type[] = [
    {value: '0', viewValue: 'Mobile'},
    {value: '1', viewValue: 'Laptop & Accessories'},
    {value: '2', viewValue: 'TV & Home Entertainment'},
    {value: '3', viewValue: 'Audio'},
    {value: '4', viewValue: 'Camera'},    
    {value: '5', viewValue: 'Computer Peripherals'},    
    {value: '6', viewValue: 'Musical Instruments'}
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data){

  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Route,Router } from '@angular/router';
import { Appliance } from '../store/store.model';

interface Type{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
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
  constructor() { }

  ngOnInit(){
    
  }

}

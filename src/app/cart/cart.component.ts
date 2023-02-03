import { Component, OnInit } from '@angular/core';
import { applianceModel } from '../Modal/applianceModel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  appliance:applianceModel[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}

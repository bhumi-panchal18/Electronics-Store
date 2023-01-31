import { Component, Input, OnInit } from '@angular/core';
import { Appliance } from '../store/store.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() appliance: Appliance;
  constructor() { }
  ngOnInit(): void {
  }
}

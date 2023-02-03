import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'E-shop';
  isActive = true;
  opened = true;
  constructor(private route:Router){}
  applyFilter(event: Event){
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.route.na
  }
}

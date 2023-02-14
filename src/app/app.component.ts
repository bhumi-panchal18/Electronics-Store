
import { Component, ViewChild, DoCheck } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CartService } from './shared/cart.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {
  isMenuRequired = false;
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
  public totalitem = 0;
  title = 'E-shop';
  isActive = true;
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private cart: CartService, private router: Router) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sideNav.mode = 'over';
          this.sideNav.close();
        } else {
          this.sideNav.mode = 'side';
          this.sideNav.open();
        }
      });
    this.cart.getproduct().subscribe(res => {
      this.totalitem = res.length;
    });
  }
  openLogoutDialog(){

  }
}


// @Component({
//   templateUrl: 'logout.popup.html',
// })
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
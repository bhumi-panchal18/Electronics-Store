
import { Component, ViewChild, DoCheck,AfterViewInit, Inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { CartService } from './shared/cart.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck, AfterViewInit {
  isMenuRequired = false;
  isAdminUser=false;
  ngDoCheck(): void {
    let currentUrl = this.router.url;
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }

    if(this.authService.getUserRole()==='admin'){
      this.isAdminUser=true;
    }
    else{
      this.isAdminUser=false;
    }
  }
  public totalitem = 0;
  title = 'E-shop';
  isActive = true;
  @ViewChild(MatSidenav) sideNav!: MatSidenav;
  constructor(private observer: BreakpointObserver, 
    private cart: CartService, 
    private router: Router, 
    public dialog: MatDialog,
    private authService: AuthService) { }
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
  }
  openLogoutDialog(){
    this.openPopup();
  }

  openPopup(){
    const _popup = this.dialog.open(DialogContentExampleDialog, {
      width: '500px'
    })
    // _popup.afterClosed().subscribe(response => {
    //   this.loadAppliance();
    // })
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'logout.popup.html',
})
export class DialogContentExampleDialog {}
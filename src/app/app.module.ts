import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { DialogComponent } from './dialog/dialog.component';
import { DetailComponent } from './detail/detail.component';
import { ApplianceDetailComponent } from './store/appliance-detail/appliance-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    StoreComponent,
    CartComponent,
    DialogComponent,
    DetailComponent,
    ApplianceDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

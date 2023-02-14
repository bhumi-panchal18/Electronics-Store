import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatOptionModule,
  MatTabsModule,
  MatGridListModule,
  MatListModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTreeModule,
  MatSortModule,
  MatBadgeModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSnackBarModule
];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatToolbarModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
  ]
})
export class AppMaterialModule { }

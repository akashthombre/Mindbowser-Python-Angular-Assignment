
import { NgModule } from '@angular/core';

import {
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
    MatTabsModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatTabsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatGridListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        MatSelectModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatRadioModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatGridListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDialogModule,
        MatSelectModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatRadioModule
    ]
})
export class MaterialModule { }
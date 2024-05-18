import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IcmsCalculatorComponent } from './icms-calculator.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: IcmsCalculatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
  declarations: [IcmsCalculatorComponent],
})
export class IcmsCalculatorModule {}

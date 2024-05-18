import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './presentation/pages/icms-calculator/icms-calculator.module'
      ).then((m) => m.IcmsCalculatorModule),
  },
];

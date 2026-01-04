import { Routes } from '@angular/router';
import { ProductsComponent } from './components/productsComponent/productsComponent';
import { SalesComponent } from './components/salesComponent/salesComponent';
import { ReportsComponent } from './components/reportsComponent/reportsComponent';

export const routes: Routes = [
  { path: 'Products', component: ProductsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '', redirectTo: 'Products', pathMatch: 'full' },
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AddNewPlaceComponent } from '../add-new-place/add-new-place.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'addnewplace', component: AddNewPlaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

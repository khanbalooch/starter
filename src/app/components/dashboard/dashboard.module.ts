import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // TranslateCompiler
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { SettingsComponent } from './settings/settings.component';
import { AddNewPlaceComponent } from '../add-new-place/add-new-place.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      // compiler: {
      //   provide: TranslateCompiler,
      //   useClass: TranslateMessageFormatCompiler
      // }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsQfdTfelRCEtSHPyG3-zvcxUFRA_VZnI',
      libraries: ['places']
    }),
  ],
  declarations: [
    DashboardComponent,
    SettingsComponent,
    AddNewPlaceComponent
  ]
})
export class DashboardModule { }

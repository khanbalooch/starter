import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // TranslateCompiler
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileBodyComponent } from './profile-body/profile-body.component';
import { ProfileReferencesComponent } from './profile-references/profile-references.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
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
    })
  ],
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileBodyComponent,
    ProfileReferencesComponent,
    ProfileEditComponent
  ]
})
export class ProfileModule { }

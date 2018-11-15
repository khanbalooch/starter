import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatInputModule, MatDialogModule, MatButtonModule, MatSnackBarModule }
  from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; // TranslateCompiler
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/dialogs/create/create.component';
import { FeedbackComponent } from './components/dialogs/feedback/feedback.component';
import { LoginComponent } from './components/dialogs/login/login.component';
import { MessageComponent } from './components/dialogs/message/message.component';
import { PictureUploadComponent } from './components/dialogs/picture-upload/picture-upload.component';
import { FAQComponent } from './components/faq/faq.component';
import { ImageCropperWrapComponent } from './components/image-cropper-wrap/image-cropper-wrap.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForbiddenNameValidatorDirective } from './components/dialogs/create/forbidden-name.directive';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthAdminGuardService } from './services/auth-admin-guard.service';
import { ApiUsersService } from './services/api-users.service';
import { ApiPicturesService } from './services/api-pictures.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutUsComponent,
    ChangePasswordComponent,
    ContactUsComponent,
    DashboardComponent,
    CreateComponent,
    FeedbackComponent,
    LoginComponent,
    MessageComponent,
    PictureUploadComponent,
    FAQComponent,
    ImageCropperWrapComponent,
    NotFoundComponent,
    ProfileComponent,
    ProfileEditComponent,
    SettingsComponent,
    VerifyEmailComponent,
    FooterComponent,
    ForbiddenNameValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
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
    DeviceDetectorModule.forRoot(),
    ImageCropperModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsQfdTfelRCEtSHPyG3-zvcxUFRA_VZnI',
      libraries: ['places']
    }),
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [
    AuthGuardService,
    AuthAdminGuardService,
    ApiUsersService,
    ApiPicturesService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    CreateComponent,
    PictureUploadComponent,
    FeedbackComponent,
    MessageComponent
  ]
})
export class AppModule { }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../environments/environment';

import { ApiUsersService } from 'src/app/services/api-users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private url: string;
  isAuthenticated: boolean;
  itsMe: boolean;
  model: User;
  modelLogged: User;
  modelFound = true;
  subscription: Subscription;

  constructor(
    private title: Title,
    private meta: Meta,
    private apiUsers: ApiUsersService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['username']) {
        this.router.navigate(['/']);
      }

      this.subscription = this.apiUsers.model$.subscribe((user: User) => {
        if (user) {
          this.modelLogged = user;
          this.itsMe = window.location.pathname.substring(9) === this.modelLogged.username;
        }
      });

      this.isAuthenticated = this.apiUsers.isAuthenticated();
      this.url = environment.storageUrl;

      this.apiUsers.read(params['username']).subscribe((user: User) => {
        this.model = user;

        if (this.model.picCover) {
          this.model.picCover = `${this.url}cover_${this.model.username}_${this.model.picCover}.jpg`;
        } else {
          this.model.picCover = '/content/images/cover_pic.jpg';
        }
        if (this.model.picProfile) {
          this.model.picProfile = `${this.url}profile_${this.model.username}_${this.model.picProfile}.jpg`;
        } else {
          this.model.picProfile = '/content/images/profile_pic.jpg';
        }

        this.model.dateStamp = moment(this.model.dateStamp.toString()).fromNow();

        this.translate.get('Profile of').subscribe((profile: string) => {
          this.title.setTitle(`${environment.siteName} | ${profile} ${params['username']}`);
          this.meta.addTag({ name: 'description', content: this.model.aboutMe });
          this.meta.addTag({ name: 'author', content: this.model.name ? this.model.name : params['username'] });
          this.meta.addTag({ name: 'keywords', content: 'nomadas, digital nomads, travel, work, remote, freelance' });
        });

      }, (err) => {
        if (err.status === 404) {
          this.modelFound = false;
        } else {
          throw new Error(err);
        }
      });

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

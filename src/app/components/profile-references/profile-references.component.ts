import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-references',
  templateUrl: './profile-references.component.html',
  styleUrls: ['./profile-references.component.scss']
})
export class ProfileReferencesComponent implements OnInit {
  references: any;
  referenced: any;
  myProfile: any;

  constructor() { }

  ngOnInit() {
  }

  referenceDialog() { }
}

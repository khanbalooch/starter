import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.scss']
})
export class AddNewPlaceComponent implements OnInit {

  private map: any ;
  private name: any;
  private description: any;
  @Input() lat = 51.678418;
  private lng = 7.809007;

  constructor() { }

  ngOnInit() {
  }
  onMapReady(agm) {
    this.map = agm;
    console.log('map is ready');
  }

  positionChanged(position) {
    this.lat = position.coords.lat;
    this.lng = position.coords.lng;
  }
}

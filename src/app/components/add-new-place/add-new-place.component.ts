import { Component, OnInit, Input } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-place',
  templateUrl: './add-new-place.component.html',
  styleUrls: ['./add-new-place.component.scss']
})
export class AddNewPlaceComponent implements OnInit {

  private map: any ;
  private name: any;
  private description: any;
  private lat = 51.678418;
  private lng = 7.809007;

  constructor(
    private placeService: PlaceService,
    private notificationService: NotificationService,
    private router: Router
    ) { }

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
  async addPlace() {
    try {
      const data = await this.placeService.post(
        {
          id: '1',
          name : this.name,
          description: this.description,
          lat: this.lat,
          lng: this.lng
        }
      );
      this.notificationService.notifyTrans('New Place Added Successfully');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log('An Error Occured');
    }
  }
}

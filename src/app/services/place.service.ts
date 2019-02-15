import { Injectable } from '@angular/core';
import { Place } from '../models/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor() { }

  async post(place: any) {
    localStorage.setItem(place.id.toString(), place.toString() );
  }
}

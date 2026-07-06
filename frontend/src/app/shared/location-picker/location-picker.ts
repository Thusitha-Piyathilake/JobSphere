import {
  Component,
  EventEmitter,
  Output,
  Input,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './location-picker.html',
  styleUrl: './location-picker.css'
})
export class LocationPickerComponent implements AfterViewInit {

  @Input()
  address = '';

  @Output()
  locationSelected = new EventEmitter<any>();

  private map!: L.Map;
  private marker!: L.Marker;

  constructor(
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {

    this.map = L.map('location-map').setView(
      [7.8731, 80.7718],
      8
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '© OpenStreetMap contributors'
      }
    ).addTo(this.map);
  }

  searchAddress() {

    if (!this.address.trim()) {
      return;
    }

    const url =
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.address)}`;

    this.http.get<any[]>(url)
      .subscribe(results => {

        if (results.length === 0) {
          alert('Address not found');
          return;
        }

        const latitude = Number(results[0].lat);
        const longitude = Number(results[0].lon);

        this.map.setView(
          [latitude, longitude],
          15
        );

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        const customIcon = L.icon({
          iconUrl: '/assets/leaflet/marker-icon.png',
          iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
          shadowUrl: '/assets/leaflet/marker-shadow.png',

          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        this.marker = L.marker(
          [latitude, longitude],
          {
            draggable: true,
            icon: customIcon
          }
        ).addTo(this.map);

        this.locationSelected.emit({
          latitude,
          longitude,
          address: results[0].display_name
        });

        this.marker.on(
          'dragend',
          () => {

            const position =
              this.marker.getLatLng();

            this.reverseGeocode(
              position.lat,
              position.lng
            );
          }
        );
      });
  }

  reverseGeocode(
    latitude: number,
    longitude: number
  ) {

    const url =
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    this.http.get<any>(url)
      .subscribe(response => {

        this.locationSelected.emit({
          latitude,
          longitude,
          address: response.display_name
        });
      });
  }
}
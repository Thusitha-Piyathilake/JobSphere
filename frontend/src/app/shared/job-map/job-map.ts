import {
  Component,
  Input,
  AfterViewInit
} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-job-map',
  standalone: true,
  templateUrl: './job-map.html',
  styleUrl: './job-map.css'
})
export class JobMapComponent implements AfterViewInit {

  @Input() jobLatitude!: number;
  @Input() jobLongitude!: number;

  ngAfterViewInit(): void {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const map = L.map('map').setView(
          [userLat, userLng],
          10
        );

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '© OpenStreetMap contributors'
          }
        ).addTo(map);

        const routing = (L as any).Routing;

        routing.control({
          waypoints: [
            L.latLng(
              userLat,
              userLng
            ),
            L.latLng(
              this.jobLatitude,
              this.jobLongitude
            )
          ],
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          show: true
        }).addTo(map);
      },

      (error) => {
        console.error(
          'Unable to get user location',
          error
        );
      }

    );
  }
}
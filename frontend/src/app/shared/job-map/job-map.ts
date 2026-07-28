import {
  Component,
  Input,
  AfterViewInit
} from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-routing-machine';

// =========================
// FIX LEAFLET DEFAULT ICONS
// =========================
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

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

        const map = L.map('map');

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '© OpenStreetMap contributors'
          }
        ).addTo(map);

        const routing = (L as any).Routing;

        routing.control({

          waypoints: [
            L.latLng(userLat, userLng),
            L.latLng(this.jobLatitude, this.jobLongitude)
          ],

          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,

          show: false,
          collapsible: true,

          createMarker(index: number, waypoint: any) {
            return L.marker(waypoint.latLng);
          },

          lineOptions: {
            styles: [
              {
                color: '#F97316',
                opacity: 0.9,
                weight: 6
              }
            ]
          }

        }).addTo(map);

        const bounds = L.latLngBounds([
          [userLat, userLng],
          [this.jobLatitude, this.jobLongitude]
        ]);

        map.fitBounds(bounds, {
          padding: [50, 50]
        });

        setTimeout(() => {

          const container = document.querySelector(
            '.leaflet-routing-container'
          ) as HTMLElement;

          if (container) {
            container.style.display = 'none';
          }

        }, 300);

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
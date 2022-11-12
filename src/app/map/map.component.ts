import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker, NavigationControl  } from 'maplibre-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
@Input() job:any;

  jobLatLocation: any;
  jobLongLocation: any;

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    this.getJobLocation(this.job.location.lat, this.job.location.long)
  }

  ngAfterViewInit() {
    const initialState = { lng: this.jobLongLocation, lat: this.jobLatLocation, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=8zQsDmDd3AnJyMNje7sb`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
    this.map.addControl(new NavigationControl({}), 'top-right');
    new Marker({color: "#D8D8D8"})
      .setLngLat([initialState.lng,initialState.lat])
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }


  getJobLocation(lat: any, long: any){
    this.jobLatLocation = lat;
    this.jobLongLocation = long;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { zip } from 'rxjs';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  locs: any = ''; //location data array

  pageLoading : boolean = false; //value for data loading
  jobs :any; //list from API data
  actualDayResult: string = ''; //variable for showing days from being posted on page
  //vars for day calculation
  actualDay:number = 0;
  yearsPosting: number = 0;
  monthPosting: number = 0;
  dayPosting: number = 0;
  //vars for page counting
  totalLength:any;
  page:number = 1;
  timeStamp :number = (new Date()).getTime(); // var for loading picture at the different time
  linkPicture : string = 'https://picsum.photos/200/300'; //link got from api

   //pagination settings
   config = {
    id: 'custom',
    itemsPerPage: 15,
    currentPage: 1,
    totalItems: 0
  };


  constructor( private httpClient: HttpClient, private router: Router) {
    this.jobs = [];
    this.locs = [];
    this.config.totalItems = this.jobs.length;
  }

  ngOnInit(): void {
    this.getWorkersList();

  }

  actualDayCounting(uA:string){
    this.actualDayResult = uA.split('T')[0];
    this.yearsPosting = +this.actualDayResult.split('-')[0];
    this.monthPosting = +this.actualDayResult.split('-')[1];
    this.dayPosting = +this.actualDayResult.split('-')[2];

    this.actualDay = (this.yearsPosting <=2012)? (new Date().getFullYear() - this.yearsPosting)*365 + 2 + (new Date().getMonth() //формула вичислення різниці днів з урахуванням високосних років (у вибірці всього 2 можливих варіанти років (до 2012 вискосного та після і до 16-го відповідно))
    - this.monthPosting)*30 + new Date().getDate() - this.dayPosting : (new Date().getFullYear() - this.yearsPosting)*365 + 1
    + (new Date().getMonth() - this.monthPosting)*30 + new Date().getDate() - this.dayPosting;

    return this.actualDay;
  }

  setLocationList(){
    let latit: any;
    let longtit:any;
    const zipped = zip(...this.jobs.map(( job: { location: { lat: string; long: string; }; } )=>{
      latit =  '' + job.location.lat;
      longtit = '' + job.location.long;
      return this.httpClient.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latit}&lon=${longtit}&apiKey=f63668a6d3c84036b32711090672634d`)
    }));
    zipped.subscribe((result)=>{
      this.locs = result;
    })
  }

  getCurrentLocation(id: number){
    let city = this.locs[id].features[0].properties.city;
    let country = this.locs[id].features[0].properties.country;
    let result = city + ', ' + country;
    if(city === undefined || country === undefined){
      result = 'Locus non available';
    }
    return result;
  }

  getLinkPicture(){
    if(this.timeStamp) {
      return this.linkPicture + '?' + this.timeStamp;
   }
   return this.linkPicture ? this.setLinkPicture(this.linkPicture) : 0;
  }

  public setLinkPicture(url: string) {
    this.linkPicture = url;
    this.timeStamp = (new Date()).getTime();
}

  getWorkersList(){
    this.httpClient.get('https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu').subscribe((result:any)=>
    {
      this.jobs = result;
      this.totalLength = result.length;
      if(this.jobs!==undefined){
        this.setLocationList();
    }
      this.pageLoading = true;
    })

  }
}

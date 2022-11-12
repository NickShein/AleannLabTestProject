import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detailed-job-page',
  templateUrl: './detailed-job-page.component.html',
  styleUrls: ['./detailed-job-page.component.css']
})
export class DetailedJobPageComponent implements OnInit {
  pageLoading: boolean = false;
  jobs: any;
  id: number | undefined;
  job: any;
  benefits: any = [];
  private subscription: Subscription;
  actualDayResult: string = ''; //variable for showing days from being posted on page
  //vars for day calculation
  actualDay:number = 0;
  yearsPosting: number = 0;
  monthPosting: number = 0;
  dayPosting: number = 0;
  apiKey: string = 'f63668a6d3c84036b32711090672634d';

  constructor(private httpClient: HttpClient, private activateRoute: ActivatedRoute){
    this.jobs = [];
    this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    if(this.id === undefined) {return}
    this.getWorkersList();
  }

  getWorkersList(){
    const job_info =  this.httpClient.get('https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu').subscribe((result:any)=>
    {
      this.jobs = result;
    if(this.id !== undefined){
      this.job = JSON.parse(JSON.stringify(this.jobs[this.id]));
      this.benefits.push(this.job.description.split('Responsopilities')[1].split('Compensation & Benefits:')[1].split('.'));
      this.benefits[0].pop();
      this.benefits = Array.from(this.benefits[0]);
      console.log(this.benefits);
      this.pageLoading = true;
    }
    });
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

  //function for loading random pictures from the same url at the different time
  setTimeoutImages(url: any, i: number){
    if(this.id !==undefined){
      let urlChangedValue: number;
      urlChangedValue = +url.slice(url.lastIndexOf('/')+1) + +this.id;
      urlChangedValue = urlChangedValue + i;
      url = url.substring(0, url.lastIndexOf('/')+1) + urlChangedValue;
      console.log(url);
      return url;
    }
  }
}

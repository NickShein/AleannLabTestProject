import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ResponseComponent } from './response/response.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//getting data from API module
import { HttpClientModule } from '@angular/common/http';
//pagination module
import { NgxPaginationModule } from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailedJobPageComponent } from './detailed-job-page/detailed-job-page.component';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [
  {path: '', component: ResponseComponent},
  {path: 'detailed-job/:id', component: DetailedJobPageComponent},
  {path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ResponseComponent,
    NotFoundComponent,
    DetailedJobPageComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

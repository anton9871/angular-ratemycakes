import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpService } from './http.service'; //
import {HttpClientModule} from '@angular/common/http'; //
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component'; // <-- import FormsModule.


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule //

  ],
  providers: [HttpService], //
  bootstrap: [AppComponent]
})
export class AppModule { }

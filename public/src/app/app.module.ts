import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpService } from './http.service'; //
import {HttpClientModule} from '@angular/common/http'; //
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.


@NgModule({
  declarations: [
    AppComponent
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

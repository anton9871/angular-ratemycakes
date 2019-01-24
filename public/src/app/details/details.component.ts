import { Component, OnInit, Input } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() cakeToShow:any; 
  sum:number = 0;
  counter:number = 0;
  average:number = 0;
  constructor(private _httpService: HttpService){}

  ngOnInit() {
    this.averageRating();
    
  }
  averageRating(){
    for (var i of this.cakeToShow.comment) {
      this.sum += i['rating'];

      this.counter ++;
    }
    this.average = this.sum / this.counter;
    console.log(this.cakeToShow);
    // console.log(this.sum);
    // console.log(this.counter);
    // console.log(this.average);
    // console.log(this.cakeToShow);
  }
}
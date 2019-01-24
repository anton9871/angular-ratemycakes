import { Component, OnInit } from '@angular/core';
import {HttpService} from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newCake:any; //this is for creating a new cake
  allCakes:any; //this will allow us to retrieve all the cakes and pass it to the front end
  showCakes:boolean = false;
  
  updateCakeForm:boolean = false;
  updateCake:any;

  review:any;

  showDetails:boolean;

  selectedCake:any;

  counter:number;
  sum:number;
  average:number;

  constructor(private _httpService: HttpService){}

  ngOnInit(){
    this.getAllCakes();
    this.newCake = {baker_name: "", img_url: "" };
    this.updateCake = {baker_name: "", img_url: "" };
    // this.review = {comment_content: "", rating: "" };

  }

  getAllCakes(){
    this._httpService.getCakes().subscribe( cakes => {
      console.log('got all the cakes!: ', cakes)
      this.allCakes = cakes;
      this.showCakes = true;
    })
  }

  addNewCake(){
    this._httpService.addSingleCake(this.newCake).subscribe( data => {
      console.log('added a cake!', data);
      this.newCake = {baker_name: "", img_url: "" }; //this will set the form back to blank instead of keeping the values there
      this.getAllCakes();
    })
  }

  deleteOneCake(id){
    this._httpService.deleteSingleCake(id).subscribe( data => {
      console.log('deleted a cake!');
      this.getAllCakes();
    })
  }

  showUpdateForm(cake_object){
    this.updateCakeForm = true; //this will show the form
    this.updateCake = cake_object ; //this will pre-populate the form with the existing information
  }

  updateOneCake(cake_object){
    this._httpService.updateSingleCake(cake_object).subscribe( data => {
      console.log('updated a cake!');
      console.log(cake_object);
      this.updateCakeForm = false;
      this.getAllCakes();
    })
  }

  addReview(formData, id){
    var formObject = {
      rating: formData.value['review.rating'],
      comment_content: formData.value['review.comment_content'],
      cakeid: formData.value['cakeid']
      }
    this._httpService.addSingleReview(formObject, id).subscribe( data => {
      console.log('added a review!:');
      formData.reset();
    })
  }
  cakeToShow(cake){


    this.selectedCake = cake;
    console.log(cake);
      // avg_rating: this.average}; // store the cake in the variable so that it is bound and we can pass it to the child
    // console.log(cake.comment);
    

    this.showDetails = !this.showDetails;
  }
  
}

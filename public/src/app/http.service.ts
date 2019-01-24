import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addSingleCake(data){
    return this._http.post('/cake', data);
  }

  getCakes(){
    return this._http.get('/cakes')
  }

  deleteSingleCake(id){
    return this._http.delete('/cake/'+id)
  }

  updateSingleCake(cake_object){
    return this._http.put('/cake', cake_object );
  }

  addSingleReview(form_object, id){
    return this._http.post('/cake/rating/'+id, form_object)
  }
}

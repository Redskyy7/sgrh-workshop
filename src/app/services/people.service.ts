import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPeople } from '../models/ipeople';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private url:string = 'http://sistema-sgrh/Person/';
  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<any>{
    return this.httpClient.get(this.url+'GetAll')
  }

  remove(id:string)
  {
    console.log(this.httpClient.delete(this.url+`Deactivate/?personId=${id}`))
    return this.httpClient.delete(this.url+`Deactivate/?personId=${id}`)
  }
}

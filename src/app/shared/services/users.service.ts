import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";


import { User } from '../models/user.model';

interface CreateResponse {
  name: string
}

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {}

    getUserByEmail(email: string):Observable<User> {
    return this.http.get<User>(`http://localhost:3000/users?email=${email}`)
    .pipe(map(user => {
       // @ts-ignore
       return user[0];
     }))

    }

   createNewUser(user: User){
    return this.http
      .post<CreateResponse>(`http://localhost:3000/users`, user)
  }
}


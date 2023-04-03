import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { appEvent } from '../models/event.model';


@Injectable()
export class EventsService {
  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<appEvent[]> {
    return this.http.get<appEvent[]>('http://localhost:3000/events').pipe(map((appEvent: any) => appEvent ? appEvent :undefined));
  }

}

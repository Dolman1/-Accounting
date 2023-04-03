import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {
  }

  getBill(): Observable<Bill> {
    return this.http.get<Bill>('http://localhost:3000/bill').pipe(map((bill: any) => bill ? bill :undefined));
    }

updateBill(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>('bill', bill);
    }


 getCurrency(): Observable<any> {
    return this.http.get('http://data.fixer.io/api/latest?access_key=729c1643084a8890f28a2395364e4298&symbols=usd,rub,eur&format=1').pipe(map((bill: any) => bill ? bill :undefined));
    }
}

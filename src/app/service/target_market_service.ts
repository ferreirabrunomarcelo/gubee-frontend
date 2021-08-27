import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TargetMarket } from '../model/target_market';

@Injectable({
    providedIn: 'root'
})

export class TargetMarketService {

   apiUrl = 'http://localhost:8080/api/v1/targetMarkets';

   private messageSource = new BehaviorSubject('1');
   currentMessage = this.messageSource.asObservable();

   constructor(private httpClient: HttpClient) {}


   public getAllTargetMarkets() : Observable<TargetMarket[]> {
       return this.httpClient.get<TargetMarket[]>(this.apiUrl);
   }
}
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stack } from '../model/stack';

@Injectable({
    providedIn: 'root'
})

export class StackService {

   apiUrl = 'http://localhost:8080/api/v1/stacks';

   private messageSource = new BehaviorSubject('9');
   currentMessage = this.messageSource.asObservable();

   constructor(private httpClient: HttpClient) {}

   public getAllStacks() : Observable<Stack[]> {
       return this.httpClient.get<Stack[]>(this.apiUrl);
   }
}
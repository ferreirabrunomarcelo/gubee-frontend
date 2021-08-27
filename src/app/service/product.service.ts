import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

   apiUrl = 'http://localhost:8080/api/v1/products';

   apiUrlFilterStack = '/stack?ids=';

   apiUrlFilterTargetMarket = '/targetMarket?ids=';
   
   constructor(private httpClient: HttpClient) {}

   public getAllProducts() : Observable<Product[]> {
       return this.httpClient.get<Product[]>(this.apiUrl);
   }

   public getProductsByStack(id: string) : Observable<Product[]> {
       // var auxId = id.toString().replace('[', '');
        return this.httpClient.get<Product[]>(this.apiUrl + this.apiUrlFilterStack + id);

   }

   public getProductsByTargetMarket(id: string) : Observable<Product[]> {
       return this.httpClient.get<Product[]>(this.apiUrl + this.apiUrlFilterTargetMarket + id);
   }
}
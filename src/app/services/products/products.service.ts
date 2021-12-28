import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyProduct, Product } from '../../../models/Product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  getDaily(): Observable<DailyProduct> {
    return this.http.get<DailyProduct[]>('/api/daily').pipe(map(([daily]) => daily))
  }
}

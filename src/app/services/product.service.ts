import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Product[];

  constructor() {
    this.products = [
      
      {id:1, name: "Computer", price: 6500},
      {id:2, name: "Printer", price: 1200},
      {id:3, name: "Smart phone", price: 1400}
    ];
   }

   public getAllProduct(): Observable<Product[]> {
    let rnd = Math.random();
    if(rnd<0.1) return throwError(()=> new Error("Internet connexion error Test"))
    else
    return of(this.products);
   }

   public deleteProduct(id: number): Observable<Boolean>{
    this.products.filter(p=>p.id!=id)!;
    return of(true);
   } 
}

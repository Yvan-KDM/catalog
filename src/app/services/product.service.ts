import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { PageProduct, Product } from '../model/product.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Product[]; 
 
  constructor() {
    this.products = [
      
      {id:UUID.UUID(), name: "Computer", price: 6500, promotion: true},
      {id:UUID.UUID(), name: "Printer", price: 1200, promotion: false},
      {id:UUID.UUID(), name: "Smart phone", price: 1400, promotion: true}
    ];

    for (let i = 0; i < 10 ; i++) {
      this.products.push({id:UUID.UUID(), name: "Computer", price: 6500, promotion: true});
      this.products.push({id:UUID.UUID(), name: "Printer", price: 1200, promotion: false});
      this.products.push({id:UUID.UUID(), name: "Smart phone", price: 1400, promotion: true});
    }
   }

   public getAllProduct(): Observable<Product[]> {
    let rnd = Math.random();
    if(rnd<0.1) return throwError(()=> new Error("Internet connexion error Test"))
    else
    return of([...this.products]);
   }

   public getPageProduct(page: number, size: number): Observable<PageProduct> {
    let index = page*size;
    /* "~~" est utilisé pour la division entière */
    let totalPages = ~~(this.products.length/size);
    if(this.products.length % size != 0 )
    totalPages ++; 

    let pageProducts = this.products.slice(index, index + size);

    return of({page: page, size: size, totalPages: totalPages,  products: pageProducts});
   }

   public deleteProduct(id: string): Observable<boolean>{
    this.products.filter(p=>p.id!=id)!;
    return of(true);
   } 

   public setPromotion(id: string): Observable<boolean>{
    let currentProduct = this.products.find(p=>p.id == id);
    if(currentProduct != undefined){
      currentProduct.promotion =! currentProduct.promotion;
      return of(true);
    } else {
     return throwError(()=> new Error("Product not found"))
    }  
   } 

   public searchProducts(keyword: string): Observable<Product[]> {

    let products = this.products.filter(p=>p.name.includes(keyword));
    return of(products);
   }
}

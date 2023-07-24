import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! : Array<any>;

  constructor() {
    this.products = [
      {id:1, name: "Computer", price: 6500},
      {id:2, name: "Printer", price: 1200},
      {id:3, name: "Smart phone", price: 1400}
    ];
   }

   public getAllProduct(){
    return this.products;
   }
}

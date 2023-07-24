import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products! : Array<any>;
   
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.products = this.productService.getAllProduct();
  }

  handleDeleteProduct(product:any){
    let index = this.products.indexOf(product);
    this.products.splice(index,1)
  }
}

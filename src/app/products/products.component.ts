import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products! : Product[];
   errorMessage!: string;
   
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getAllProduct()
    .subscribe({
        next: (data)=>{
          this.products = data;
        },
        error: (err)=>{
         this.errorMessage = err;
        }
      }
    )
  }

  handleDeleteProduct(product:any){
    let index = this.products.indexOf(product);
    this.products.splice(index,1)
  }
}

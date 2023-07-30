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
    this.handleGetAllProducts();
  }

  handleGetAllProducts(){
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

  handleDeleteProduct(p:Product){
    let conf = confirm("Are you sure");
    if (conf == false) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data)=>{
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }

  handleStePromotion(p:Product){
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next:(data)=>{
        p.promotion != promo;
      },
      error: (err)=>{
        this.errorMessage = err
      }
    })
  }
}

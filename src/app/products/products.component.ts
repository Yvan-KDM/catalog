import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   products! : Product[];
   errorMessage!: string;
   searchFormGroup!: FormGroup;
   currentPage: number = 0;
   pageSize: number = 5;
   totalPages: number = 0;

   
  constructor(private productService: ProductService, private fb : FormBuilder){}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    })
    this.handleGetPageProducts();
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

  goToPage(indexPage: number){
    this.currentPage = indexPage;
    this.handleGetPageProducts();
  }

  handleGetPageProducts(){
    this.productService.getPageProduct(this.currentPage, this.pageSize)
    .subscribe({
        next: (data)=>{
          this.products = data.products,
          this.totalPages = data.totalPages;
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

  handleSearchProducts(){
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next: (data)=>{
        this.products=data;
      }
    })
  }


}

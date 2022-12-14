import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productList : Product[] = [];
  product!: Product;
  items = [];
  constructor() { }

  getProducts(){
    debugger;
    return this.productList;
  }

  getProduct(id: string){
    this.product;
     this.productList.map(val=>{
      if(val.id == id) 
     this.product = val;
    });
    return this.product;
  }
  productEdit(data: Product){
    let present: Boolean = false;
    this.productList.map((val, index)=>{
      if(val.id == data.id) {this.productList[index] = data;present=true}
    });
    return present;

  }

  

 
}
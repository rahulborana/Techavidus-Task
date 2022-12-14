import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  productList!: Product[];
  productsData!: any[];
  items: any = [];
  @ViewChildren("subTotalWrap") subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing") subTotalItems_existing!: QueryList<
    ElementRef
  >;
  totalcost: number = 0;
  constructor(private productservice: ProductService,
    public cartService: CartServiceService) { }
  ngOnInit() {
    this.productList = this.productservice.getProducts();
    this.cartService.loadCart();
    this.items = this.cartService.getItems();
  }

  deleteRow(x: any) {
    var delBtn = confirm(" Do you want to delete ?");
    if (delBtn == true) {
      debugger
      this.productList.splice(x, 1);
      this.productList = this.productservice.getProducts();
    }
  }

  changeSubtotal(item: any, index: any) {
    const qty = item.quantity;
    const amt = item.price;
    const subTotal = amt * qty;
    const subTotal_converted = subTotal;
    this.totalcost = subTotal;
    this.subTotalItems.toArray()[
      index
    ].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
  }

  removeFromCart(item: { id: any; }) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  clearCart(items: any) {
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }

  addToCart(item: any) {
    debugger;
    if (!this.cartService.itemInCart(item)) {
      item.quantity = 1;
      this.cartService.addToCart(item); //add items in cart
      this.items = [...this.cartService.getItems()];
    }
  }
}

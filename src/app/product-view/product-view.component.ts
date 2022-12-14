import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product!: Product;
  cartProductList = [];
  @Input() productdata: any;
  @Output() productAdded = new EventEmitter();
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param)
      if (param) {
        this.product = this.productService.getProduct(param['id']);
      }
    })
  }

  addProductToCart(product: any) {
    debugger;
    this.productAdded.emit(product);
  }

}

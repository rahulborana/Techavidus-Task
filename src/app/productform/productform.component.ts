import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})

export class ProductFormComponent {
  productAdd: FormGroup;
  isEdit: Boolean = false;
  msg: String = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.productAdd = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      price: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      console.log(param)
      if (param && param['id']) {
        let product = this.productService.getProduct(param['id']);
        if (product) {
          this.productAdd.setValue(product);
          this.isEdit = true;
        }
        else this.router.navigate(['/'])
      }
    })
  }



  resetForm() {
    console.log('reset', this.productAdd)
    this.productAdd.reset();
  }

  add() {
    debugger;
    if (this.productAdd.valid) {
      this.productService.productList.push(this.productAdd.value);
      this.resetForm();
    }
    else {
      this.msg = 'Please complete form'
    }
  }

  edit() {
    this.msg = '';
    if (this.productAdd.valid) {
      if (this.productService.productEdit(this.productAdd.value)) {
        this.router.navigate(['/productlist'])
      } else {
        this.msg = 'Something went wrong'
      }
    } else {
      this.msg = 'Please complete form'
    }
  }
}

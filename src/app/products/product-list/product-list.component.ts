import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productAction from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;
  errorMessage$: Observable<string>;

  displayCode: boolean;

  products: Product[];
  componentActive = true;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private productService: ProductService,
    private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.pipe(select(fromProduct.getCurrentProduct)).pipe(
      takeWhile(() => this.componentActive)).subscribe(
        currentProduct => this.selectedProduct = currentProduct);

    this.store.dispatch(new productAction.LoadProducts());
    this.store.pipe(select(fromProduct.getProducts)).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(
      products => this.products = products
    )
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError)).pipe(
      takeWhile(() => this.componentActive)
    )

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProduct => this.displayCode = showProduct
       );
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productAction.ToggleProduct(value))
  }

  newProduct(): void {
    this.store.dispatch(new productAction.InicializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productAction.SetCurrentProduct(product));
  }

}

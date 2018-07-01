import { Injectable } from '@angular/core';

import { Observable, of, merge } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { ProductService } from '../product.service';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.action';

@Injectable()
export class ProductEffects {

  constructor(private productService: ProductService,
              private actions$: Actions) { }

  @Effect()
  LoadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionType.LoadProducts),
    mergeMap((action) => this.productService.getProducts().pipe(
        map(products => new productActions.LoadProductsSuccess(products)),
        catchError((error) => of(new productActions.LoadProductsFail(error)) )
    ))  
  )

}
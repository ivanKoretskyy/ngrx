import { Product } from "../product";

import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

//use this technike to save lazy loading
export interface State extends fromRoot.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
} 

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);



export function reducer(state = initialState, action): ProductState {
  switch (action.type) {
    
    case 'TOGGLE_PRODUCT_VIEW':
      return {
        ...state,
        showProductCode: action.payload
      };
  
    default:
      return state;
  }
}
import { Product } from "../product";

import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductAction, ProductActionType } from "./product.action";

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string
}

//use this technike to save lazy loading
export interface State extends fromRoot.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
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

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
)



export function reducer(state = initialState, action: ProductAction): ProductState {
  switch (action.type) {
    
    case ProductActionType.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionType.SetCurrentProduct:
    return {
      ...state,
      currentProduct: {...action.payload}
    };

    case ProductActionType.ClearCurrentProduct:
    return {
      ...state,
      currentProduct: null
    };

    case ProductActionType.InicializeCurrentProduct:
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    };

    case ProductActionType.LoadProductsSuccess:
    return {
      ...state,
      products : action.payload,
      error: ''
    };

    case ProductActionType.LoadProductsFail: 
    return {
      ...state,
      products: [],
      error: action.payload
    }

    default:
      return state;
  }
}
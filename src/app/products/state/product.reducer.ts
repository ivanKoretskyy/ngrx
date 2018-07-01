import { Product } from "../product";

import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductAction, ProductActionType } from "./product.action";

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string
}

//use this technike to save lazy loading
export interface State extends fromRoot.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
} 

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if(currentProductId === 0){
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null
    }
  }
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
      currentProductId: action.payload.id
    };

    case ProductActionType.ClearCurrentProduct:
    return {
      ...state,
      currentProductId: null
    };

    case ProductActionType.InicializeCurrentProduct:
    return {
      ...state,
      currentProductId: 0
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

    case ProductActionType.UpdateProductSuccess: 
      const updatedProducts = state.products.map(
        el => action.payload.id === el.id ? action.payload : el );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      }

    case ProductActionType.UpdateProductFail: 
      return {
        ...state,
        error: action.payload
      }

    default:
      return state;
  }
}
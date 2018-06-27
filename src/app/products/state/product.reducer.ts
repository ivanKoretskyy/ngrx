import { Product } from "../product";

import * as fromRoot from '../../state/app.state';

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
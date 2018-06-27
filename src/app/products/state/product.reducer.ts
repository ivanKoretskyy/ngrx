export function reducer(state, action) {
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
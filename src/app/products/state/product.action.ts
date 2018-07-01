import { Action } from "@ngrx/store";
import { Product } from "../product";

export enum ProductActionType {
    ToggleProductCode = " [Product] Toggle Product Code",
    SetCurrentProduct = "[Product] Set Current Product",
    ClearCurrentProduct = "[Product] Clear Current Product",
    InicializeCurrentProduct = "[Product] Innicialize Current Product" ,
    LoadProducts = "[Product] Load Products",
    LoadProductsSuccess = "[Product] Load Products Success",
    LoadProductsFail = "[Product] Load Products Fail",
    UpdateProduct = '[Product] Update Product',
    UpdateProductFail = '[Product] Update product Fail',
    UpdateProductSuccess = '[Product] Update product Success'
}

export class ToggleProduct implements Action {
    readonly type = ProductActionType.ToggleProductCode;
    constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionType.SetCurrentProduct;
    constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionType.ClearCurrentProduct;
}

export class InicializeCurrentProduct implements Action {
    readonly type = ProductActionType.InicializeCurrentProduct;
}

export class LoadProducts implements Action {
    readonly type = ProductActionType.LoadProducts;
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionType.LoadProductsSuccess;
    constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionType.LoadProductsFail;
    constructor(public payload: any) {}
}

export class UpdateProduct implements Action {
    readonly type = ProductActionType.UpdateProduct;
    constructor(public payload: Product) {

    }
}

export class UpdateProductSuccess implements Action {
    readonly type = ProductActionType.UpdateProductSuccess;
    constructor(public payload: Product) {

    }
}

export class UpdateProductFail implements Action {
    readonly type = ProductActionType.UpdateProductFail;
    constructor(public payload: string) {

    }
}

export type ProductAction = ToggleProduct
    | SetCurrentProduct 
    | ClearCurrentProduct 
    | InicializeCurrentProduct
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail
    | UpdateProduct
    | UpdateProductFail
    | UpdateProductSuccess;
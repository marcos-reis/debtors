export interface ICreateProductDTO {
  name: string;
  price: number;
  stock: IStock;
}

export interface IFindProducts {
  id: string;
}
export interface IStock {
  quantity: number;
}

export default interface IUpdateProductsQuantityDTO {
  product_id: string;
  quantity: number;
}

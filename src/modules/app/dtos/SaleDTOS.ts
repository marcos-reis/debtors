import Customer from "../entities/Customer";
import User from "../entities/User";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IInstallment {
  number: number;
  price: number;
}

export interface ICreateSaleDTO {
  user: User;
  customer: Customer;
  sale_items: IProduct[];
  price: number;
  installments: IInstallment[];
}

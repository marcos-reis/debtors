import { inject, injectable } from "tsyringe";

import AppError from "../../../../shared/errors/AppError";
import Sale from "../../entities/Sale";
import ICustomersRepository from "../../repositories/models/ICustomersRepository";
import IProductsRepository from "../../repositories/models/IProductsRepository";
import ISalesRepository from "../../repositories/models/ISalesRepository";
import IUsersRepository from "../../repositories/models/IUsersRepository";

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  logged_user_id: string;
  customer_id: string;
  products: IProduct[];
  installments?: number;
}
@injectable()
class CreateCustomerService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("SalesRepository")
    private salesRepository: ISalesRepository
  ) {}

  public async execute({
    customer_id,
    installments,
    products,
    logged_user_id,
  }: IRequest): Promise<Sale> {
    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!loggedUser) {
      throw new AppError("User should is authenticated");
    }

    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError("Customer not found");
    }
    const checkNegativeValues = products.some(
      (product) => product.quantity <= 0
    );

    if (checkNegativeValues) {
      throw new AppError("You can't create order with negative quantities");
    }
    const productsFounded = await this.productsRepository.findAllById(products);

    if (productsFounded.length !== products.length) {
      throw new AppError("One or many products are not found");
    }
    const isOutOfStock = products.some((productSome) => {
      const quantityInStock =
        productsFounded.find(
          (productFound) => productFound.id === productSome.id
        )?.stock?.quantity || 0;

      return quantityInStock - productSome.quantity <= 0;
    });
    if (isOutOfStock) {
      throw new AppError("not exists stock available to one or many products");
    }
    const productsMapped = productsFounded.map((productMap) => ({
      product_id: productMap.id,
      price: productMap.price,
      quantity:
        products.find((productFind) => productFind.id === productMap.id)
          .quantity || 0,
    }));

    let priceTotal = 0;
    productsMapped.map((product) => {
      priceTotal += Number(product.price);
      return priceTotal;
    });
    const installmentsMapped = [];
    for (let i = 1; i <= installments; i++) {
      installmentsMapped.push({ number: i, price: priceTotal / installments });
    }

    const sale = await this.salesRepository.create({
      user: loggedUser,
      customer,
      sale_items: productsMapped,
      price: priceTotal,
      installments: installmentsMapped,
    });

    return sale;
  }
}

export default CreateCustomerService;

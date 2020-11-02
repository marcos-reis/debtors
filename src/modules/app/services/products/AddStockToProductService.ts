import { inject, injectable } from "tsyringe";

import AppError from "../../../../shared/errors/AppError";
import IProductsRepository from "../../repositories/models/IProductsRepository";
import IStocksRepository from "../../repositories/models/IStocksRepository";
import IUsersRepository from "../../repositories/models/IUsersRepository";

interface IRequest {
  logged_user_id: string;
  product_id: string;
  quantity: number;
}
@injectable()
class AddStockToProductService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("StocksRepository")
    private stocksRepository: IStocksRepository
  ) {}

  public async execute({
    product_id,
    quantity,
    logged_user_id,
  }: IRequest): Promise<void> {
    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!loggedUser) {
      throw new AppError("User should is authenticated");
    }

    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError("Product not found");
    }
    const stockProduct = await this.stocksRepository.findById(product_id);

    if (!stockProduct) {
      this.stocksRepository.create({ product_id, quantity });
    }
    stockProduct.quantity += quantity;
    this.stocksRepository.save(stockProduct);
  }
}

export default AddStockToProductService;

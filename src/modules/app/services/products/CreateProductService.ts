import { inject, injectable } from "tsyringe";

import AppError from "../../../../shared/errors/AppError";
import Product from "../../entities/Product";
import IProductsRepository from "../../repositories/models/IProductsRepository";
import IUsersRepository from "../../repositories/models/IUsersRepository";

interface IRequest {
  logged_user_id: string;
  name: string;
  price: number;
}
@injectable()
class CreateProductService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  public async execute({
    name,
    price,
    logged_user_id,
  }: IRequest): Promise<Product> {
    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!loggedUser) {
      throw new AppError("User should is authenticated");
    }
    const stock = {
      quantity: 0,
    };

    const product = await this.productsRepository.create({
      name,
      price,
      stock,
    });
    return product;
  }
}

export default CreateProductService;

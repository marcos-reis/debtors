import { getRepository, Repository } from "typeorm";
import { ICreateProductDTO, IFindProducts } from "../../dtos/ProductDTOS";
import Product from "../../entities/Product";
import IProductsRepository from "../models/IProductsRepository";

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const findProducts = await this.ormRepository.findByIds(products);

    return findProducts;
  }

  public async create({
    name,
    price,
    stock,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      stock,
    });

    await this.ormRepository.save(product);

    return product;
  }
}

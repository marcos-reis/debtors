import { getRepository, Repository } from "typeorm";
import IUpdateProductsQuantityDTO, {
  IFindProducts,
} from "../../dtos/ProductDTOS";
import { ICreateStockDTO } from "../../dtos/StockDTOS";
import Product from "../../entities/Product";
import Stock from "../../entities/Stock";
import IStocksRepository from "../models/IStocksRepository";

export default class StocksRepository implements IStocksRepository {
  private ormRepository: Repository<Stock>;

  private productsRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Stock);
    this.productsRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepository.findOne({
      where: { product_id: id },
    });

    return stock;
  }

  public async create({
    product_id,
    quantity,
  }: ICreateStockDTO): Promise<Stock> {
    const stock = this.ormRepository.create({
      product_id,
      quantity,
    });

    await this.ormRepository.save(stock);

    return stock;
  }

  public async save(stock: Stock): Promise<Stock> {
    await this.ormRepository.save(stock);

    return stock;
  }
}

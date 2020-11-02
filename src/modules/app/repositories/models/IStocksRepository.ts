import { ICreateStockDTO } from "../../dtos/StockDTOS";
import Stock from "../../entities/Stock";

export default interface IStocksRepository {
  findById(id: string): Promise<Stock | undefined>;
  create(data: ICreateStockDTO): Promise<Stock>;
  save(stock: Stock): Promise<Stock>;
}

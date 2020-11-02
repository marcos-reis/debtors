import { ICreateSaleDTO } from "../../dtos/SaleDTOS";
import Sale from "../../entities/Sale";

export default interface ISalesRepository {
  findById(id: string): Promise<Sale | undefined>;
  create(data: ICreateSaleDTO): Promise<Sale>;
  save(Sale: Sale): Promise<Sale>;
}

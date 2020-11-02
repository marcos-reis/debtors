import { getRepository, Repository } from "typeorm";
import { ICreateSaleDTO } from "../../dtos/SaleDTOS";
import Sale from "../../entities/Sale";
import ISalesRepository from "../models/ISalesRepository";

export default class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne({
      where: id,
    });

    return sale;
  }

  public async create({
    sale_items,
    customer,
    user,
    price,
    installments,
  }: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create({
      user,
      customer,
      sale_items,
      price,
      installments,
    });

    await this.ormRepository.save(sale);

    return sale;
  }

  public async save(sale: Sale): Promise<Sale> {
    await this.ormRepository.save(sale);

    return sale;
  }
}

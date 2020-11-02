import { getRepository, Repository } from "typeorm";
import { ICreateCustomerDTO } from "../../dtos/CustomerDTOS";
import Customer from "../../entities/Customer";
import ICustomersRepository from "../models/ICustomersRepository";

export default class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { id },
    });

    return customer;
  }

  public async create({
    name,
    telephone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      telephone,
    });

    await this.ormRepository.save(customer);

    return customer;
  }
}

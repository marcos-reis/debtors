import { ICreateCustomerDTO } from "../../dtos/CustomerDTOS";
import Customer from "../../entities/Customer";

export default interface ICustomersRepository {
  findById(id: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
}

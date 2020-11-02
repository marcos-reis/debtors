import { inject, injectable } from "tsyringe";

import AppError from "../../../../shared/errors/AppError";
import Customer from "../../entities/Customer";
import ICustomersRepository from "../../repositories/models/ICustomersRepository";
import IUsersRepository from "../../repositories/models/IUsersRepository";

interface IRequest {
  logged_user_id: string;
  name: string;
  telephone: string;
}
@injectable()
class CreateCustomerService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository
  ) {}

  public async execute({
    name,
    telephone,
    logged_user_id,
  }: IRequest): Promise<Customer> {
    const loggedUser = await this.usersRepository.findById(logged_user_id);

    if (!loggedUser) {
      throw new AppError("User should is authenticated");
    }

    const customer = await this.customersRepository.create({ name, telephone });

    return customer;
  }
}

export default CreateCustomerService;

import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCustomerService from "../services/customers/CreateCustomerService";

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, telephone } = request.body;
    const { id } = request.user;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      telephone,
      logged_user_id: id,
    });
    return response.json(customer);
  }
}

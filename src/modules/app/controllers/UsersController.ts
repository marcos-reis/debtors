import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../services/users/CreateUserService";

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, telephone } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, name, password, telephone });
    delete user.password;
    return response.json(user);
  }
}

import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserService from "../services/users/AuthenticateUserService";

export default class UsersAdminController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;
    return response.json({ token, user });
  }
}

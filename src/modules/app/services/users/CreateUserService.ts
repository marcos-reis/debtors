import { inject, injectable } from "tsyringe";

import AppError from "../../../../shared/errors/AppError";
import User from "../../entities/User";
import IHashProvider from "../../../../shared/container/providers/IHashProvider";
import IUsersRepository from "../../repositories/models/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
  telephone: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    telephone,
    password,
  }: IRequest): Promise<User> {
    const findUser = await this.usersRepository.findByEmail(email);
    if (findUser) {
      throw new AppError("User already exists");
    }

    const hashPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      telephone,
    });
    return user;
  }
}

export default CreateUserService;

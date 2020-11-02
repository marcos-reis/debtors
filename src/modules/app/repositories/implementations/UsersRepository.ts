import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/UserDTOS";
import User from "../../entities/User";
import IUsersRepository from "../models/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async create({
    email,
    name,
    password,
    telephone,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      name,
      telephone,
    });

    await this.ormRepository.save(user);

    return user;
  }
}

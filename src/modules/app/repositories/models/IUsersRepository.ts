import { ICreateUserDTO } from "../../dtos/UserDTOS";
import User from "../../entities/User";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}

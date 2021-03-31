import User from '../models/User';
import Car from '../models/Car';
import UsersRepository from '../repositories/UsersRepository';

interface CreateUserDTO {
  userName: string;
  password: string;
  cars: Car[];
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ userName, password, cars }: CreateUserDTO): User {
    const findNewUserName = this.usersRepository.FindByUserName(userName);

    if (findNewUserName?.length !== 0) {
      throw Error('User Name already exists! Please, choose another one.');
    }

    return this.usersRepository.Create({ userName, password, cars });
  }
}

export default CreateUserService;

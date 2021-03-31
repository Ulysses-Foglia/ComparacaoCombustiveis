import Car from '../models/Car';
import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';

class SetUserCarService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({
    id,
    idUser,
    name,
    plate,
    tankCapacity,
    consumptions,
  }: Car): User {
    const findUser = this.usersRepository.FindById(idUser);

    if (!findUser) {
      throw Error('User not found.');
    }

    const pushCar = findUser.cars.push({
      id,
      idUser,
      name,
      plate,
      tankCapacity,
      consumptions,
    });

    if (!pushCar) {
      throw Error(`Error on setting ${findUser.userName}'s car.`);
    }

    return findUser;
  }
}

export default SetUserCarService;

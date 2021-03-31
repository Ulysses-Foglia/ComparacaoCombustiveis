import Consumption from '../models/Consumption';
import Car from '../models/Car';
import CarsRepository from '../repositories/CarsRepository';
import UsersRepository from '../repositories/UsersRepository';

interface CreateCarDTO {
  idUser: string;
  name: string;
  plate: string;
  tankCapacity: number;
  consumptions: Consumption[];
}

class CreateCarService {
  private carsRepository: CarsRepository;

  private usersRepository: UsersRepository;

  constructor(
    carsRepository: CarsRepository,
    usersRepository: UsersRepository,
  ) {
    this.carsRepository = carsRepository;
    this.usersRepository = usersRepository;
  }

  public execute({
    idUser,
    name,
    plate,
    tankCapacity,
    consumptions,
  }: CreateCarDTO): Car {
    const findUser = this.usersRepository.FindById(idUser);

    if (findUser === undefined) {
      throw Error("User doesn't exists.");
    }

    const findNewCar = this.carsRepository.FindByPlate(plate);

    if (findNewCar?.length !== 0) {
      throw Error(
        'Car Plate already exists! Please, check your created vehicles.',
      );
    }

    return this.carsRepository.Create({
      idUser,
      name,
      plate,
      tankCapacity,
      consumptions,
    });
  }
}

export default CreateCarService;

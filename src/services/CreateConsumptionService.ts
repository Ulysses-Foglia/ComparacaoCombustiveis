import Consumption from '../models/Consumption';
import ConsumptionRepository from '../repositories/ConsumptionsRepository';
import CarsRepository from '../repositories/CarsRepository';

interface CreateConsumptionDTO {
  idCar: string;
  fuel: string;
  value: number;
  price: number;
}

class CreateConsumptionService {
  private carsRepository: CarsRepository;

  private consumptionRepository: ConsumptionRepository;

  constructor(
    consumptionRepository: ConsumptionRepository,
    carsRepository: CarsRepository,
  ) {
    this.consumptionRepository = consumptionRepository;
    this.carsRepository = carsRepository;
  }

  public execute({
    idCar,
    fuel,
    value,
    price,
  }: CreateConsumptionDTO): Consumption {
    const findCar = this.carsRepository.FindById(idCar);

    if (findCar === undefined) {
      throw Error("Car doesn't exists.");
    }

    const findNewConsumptionFuel = this.consumptionRepository.FindByFuel(fuel);

    if (findNewConsumptionFuel?.length !== 0) {
      throw Error(
        `There's already an fuel of type ${fuel} registered for this vehicle.`,
      );
    }

    return this.consumptionRepository.Create({ idCar, fuel, value, price });
  }
}

export default CreateConsumptionService;

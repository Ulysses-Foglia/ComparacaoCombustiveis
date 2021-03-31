import Consumption from '../models/Consumption';
import Car from '../models/Car';

import CarsRepository from '../repositories/CarsRepository';

class SetCarConsumptionService {
  private carsRepository: CarsRepository;

  constructor(carsRepository: CarsRepository) {
    this.carsRepository = carsRepository;
  }

  public execute({
    id,
    idCar,
    fuel,
    value,
    price,
    costBenefitRatio,
  }: Consumption): Car {
    const findCar = this.carsRepository.FindById(idCar);

    if (!findCar) {
      throw Error('Car not found.');
    }

    const pushConsumption = findCar.consumptions.push({
      id,
      idCar,
      fuel,
      value,
      price,
      costBenefitRatio,
    });

    if (!pushConsumption) {
      throw Error(`Error on setting ${findCar.name}'s consumption.`);
    }

    return findCar;
  }
}

export default SetCarConsumptionService;

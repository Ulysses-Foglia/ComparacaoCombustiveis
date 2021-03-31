import { Router } from 'express';
import Error from '../models/Error';
import Consumption from '../models/Consumption';

import CreateConsumptionService from '../services/CreateConsumptionService';
import SetCarConsumptionService from '../services/SetCarConsumptionService';

import ConsumptionsRepository from '../repositories/ConsumptionsRepository';
import { carsRepository } from './cars.routes';

const consumptionsRouter = Router();
const consumptionsRepository = new ConsumptionsRepository();

consumptionsRouter.get('/', (request, response) => {
  response.json(consumptionsRepository.All());
});

consumptionsRouter.get('/:fuel', (request, response) => {
  const { fuel } = request.params;

  response.json(consumptionsRepository.FindByFuel(fuel));
});

consumptionsRouter.post('/', (request, response) => {
  const { idCar, fuel, value, price }: Consumption = request.body;

  const createConsumptionService = new CreateConsumptionService(
    consumptionsRepository,
    carsRepository,
  );
  const setCarConsumptionService = new SetCarConsumptionService(carsRepository);

  try {
    const newConsumption = createConsumptionService.execute({
      idCar,
      fuel,
      value,
      price,
    });

    setCarConsumptionService.execute(newConsumption);

    response.json(newConsumption);
  } catch (error) {
    response.status(400).json(new Error(error.message));
  }
});

consumptionsRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  response.json(consumptionsRepository.Delete(id));
});

export default consumptionsRouter;

import { Router } from 'express';
import Car from '../models/Car';
import Error from '../models/Error';

import CarsRepository from '../repositories/CarsRepository';
import { usersRepository } from './users.routes';

import CreateCarService from '../services/CreateCarService';
import SetUserCarService from '../services/SetUserCarService';

const carsRouter = Router();
export const carsRepository = new CarsRepository();

carsRouter.get('/', (request, response) => {
  response.json(carsRepository.All());
});

carsRouter.get('/:plate', (request, response) => {
  const { plate } = request.params;

  response.json(carsRepository.FindByPlate(plate));
});

carsRouter.post('/', (request, response) => {
  const { idUser, name, plate, tankCapacity, consumptions }: Car = request.body;
  const createCarService = new CreateCarService(
    carsRepository,
    usersRepository,
  );
  const setUserCarService = new SetUserCarService(usersRepository);

  try {
    const newCar = createCarService.execute({
      idUser,
      name,
      plate,
      tankCapacity,
      consumptions,
    });

    setUserCarService.execute(newCar);

    response.json(newCar);
  } catch (error) {
    response.status(400).json(new Error(error.message));
  }
});

carsRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  response.json(carsRepository.Delete(id));
});

export default carsRouter;

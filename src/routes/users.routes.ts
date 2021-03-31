import { Router } from 'express';
import User from '../models/User';
import Error from '../models/Error';

import CreateUserService from '../services/CreateUserService';
import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();
export const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
  return response.json(usersRepository.All());
});

usersRouter.get('/:userName', (request, response) => {
  const { userName } = request.params;

  return response.json(usersRepository.FindByUserName(userName));
});

usersRouter.post('/', (request, response) => {
  const { userName, password, cars }: User = request.body;
  const createUserService = new CreateUserService(usersRepository);

  try {
    response.json(createUserService.execute({ userName, password, cars }));
  } catch (error) {
    response.status(400).json(new Error(error.message));
  }
});

usersRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  return response.json(usersRepository.Delete(id));
});

export default usersRouter;
